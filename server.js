/**
 * 小小4J長大了 — ECPay 綠界金流後端
 *
 * 使用方式:
 *   node server.js
 *   瀏覽器開啟 http://localhost:3000
 *
 * 環境變數 (可選，預設使用測試環境):
 *   ECPAY_MERCHANT_ID   - 商店代號 (預設: 3002607 測試商店)
 *   ECPAY_HASH_KEY      - HashKey (預設: pwFHCqoQZGmho4w6)
 *   ECPAY_HASH_IV       - HashIV (預設: EkRm7iFT261dpevs)
 *   ECPAY_ENV            - production | sandbox (預設: sandbox)
 *   PORT                 - 伺服器埠號 (預設: 3000)
 *   BASE_URL             - 外部可存取的 URL (預設: http://localhost:3000)
 */

const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// === 載入 .env 檔案 (不需 dotenv 套件) ===
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.substring(0, eqIdx).trim();
      const val = trimmed.substring(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  });
  console.log('✅ 已載入 .env 設定檔');
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === ECPay 設定 ===
const ECPAY_CONFIG = {
  MerchantID: process.env.ECPAY_MERCHANT_ID || '3002607',
  HashKey: process.env.ECPAY_HASH_KEY || 'pwFHCqoQZGmho4w6',
  HashIV: process.env.ECPAY_HASH_IV || 'EkRm7iFT261dpevs',
  isProduction: process.env.ECPAY_ENV === 'production',
  PaymentURL: (process.env.ECPAY_ENV === 'production')
    ? 'https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5'
    : 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
};

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// 訂單暫存 (正式環境應改用 DB)
const orders = new Map();

// === 角色商品定義 ===
const PRODUCTS = {
  kaoru: { name: '小薰路線解鎖', price: 199 },
  amy: { name: 'Amy路線解鎖', price: 199 },
  rebecca: { name: 'Rebecca路線解鎖', price: 299 },
};

// === 靜態檔案 ===
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    // 禁止快取 JS/CSS 以利開發
    if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// === ECPay CheckMacValue 產生 ===
function generateCheckMacValue(params) {
  // 1. 按照參數名稱排序 (A-Z, case insensitive)
  const sortedKeys = Object.keys(params).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  // 2. 組合字串: HashKey=xxx&key1=val1&key2=val2&...&HashIV=xxx
  let raw = `HashKey=${ECPAY_CONFIG.HashKey}`;
  sortedKeys.forEach(key => {
    raw += `&${key}=${params[key]}`;
  });
  raw += `&HashIV=${ECPAY_CONFIG.HashIV}`;

  // 3. URL encode (小寫)
  let encoded = encodeURIComponent(raw).toLowerCase();

  // 4. ECPay 特殊字元替換 (依照官方文件)
  encoded = encoded
    .replace(/%2d/g, '-')
    .replace(/%5f/g, '_')
    .replace(/%2e/g, '.')
    .replace(/%21/g, '!')
    .replace(/%2a/g, '*')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%20/g, '+');

  // 5. SHA256 hash (大寫)
  return crypto.createHash('sha256').update(encoded).digest('hex').toUpperCase();
}

// === 建立 ECPay 訂單 API ===
app.post('/api/ecpay/create-order', (req, res) => {
  const { charKey } = req.body;

  if (!PRODUCTS[charKey]) {
    return res.status(400).json({ error: '無效的角色' });
  }

  const product = PRODUCTS[charKey];

  // 產生唯一訂單編號 (20 碼以內)
  const tradeNo = `4J${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
  const now = new Date();
  const tradeDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  // ECPay 參數
  const params = {
    MerchantID: ECPAY_CONFIG.MerchantID,
    MerchantTradeNo: tradeNo,
    MerchantTradeDate: tradeDate,
    PaymentType: 'aio',
    TotalAmount: String(product.price),
    TradeDesc: encodeURIComponent('小小4J長大了 角色路線解鎖'),
    ItemName: product.name,
    ReturnURL: `${BASE_URL}/api/ecpay/notify`,        // 伺服器端通知
    OrderResultURL: `${BASE_URL}/api/ecpay/result`,    // 付款完成導回頁面
    ChoosePayment: 'Credit',
    EncryptType: '1',
    NeedExtraPaidInfo: 'N',
  };

  // 產生檢查碼
  params.CheckMacValue = generateCheckMacValue(params);

  // 暫存訂單
  orders.set(tradeNo, {
    charKey,
    price: product.price,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });

  console.log(`[訂單建立] ${tradeNo} — ${product.name} NT$${product.price}`);

  // 回傳自動提交的表單 HTML
  const formInputs = Object.entries(params)
    .map(([k, v]) => `<input type="hidden" name="${k}" value="${v}">`)
    .join('\n      ');

  const formHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>導向綠界付款...</title>
  <style>
    body { background: #0a0a12; color: #fff; font-family: sans-serif;
           display: flex; align-items: center; justify-content: center;
           height: 100vh; margin: 0; }
    .loading { text-align: center; }
    .spinner { width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.2);
               border-top-color: #ff6b9d; border-radius: 50%;
               animation: spin 0.8s linear infinite; margin: 0 auto 1em; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="loading">
    <div class="spinner"></div>
    <p>正在導向綠界付款頁面...</p>
    <p style="color:#999;font-size:0.8em">訂單編號: ${tradeNo}</p>
  </div>
  <form id="ecpay-form" method="POST" action="${ECPAY_CONFIG.PaymentURL}">
      ${formInputs}
  </form>
  <script>
    setTimeout(function() {
      document.getElementById('ecpay-form').submit();
    }, 800);
  </script>
</body>
</html>`;

  res.json({
    tradeNo,
    formHTML,
    paymentURL: ECPAY_CONFIG.PaymentURL,
    params,
  });
});

// === ECPay 伺服器端付款通知 (Server-to-Server) ===
app.post('/api/ecpay/notify', (req, res) => {
  console.log('[ECPay 通知] 收到付款通知:', JSON.stringify(req.body));

  const { CheckMacValue, ...notifyParams } = req.body;

  // 驗證 CheckMacValue
  const expectedMac = generateCheckMacValue(notifyParams);
  if (CheckMacValue !== expectedMac) {
    console.error('[ECPay 通知] CheckMacValue 驗證失敗');
    console.error(`  收到: ${CheckMacValue}`);
    console.error(`  預期: ${expectedMac}`);
    return res.send('0|ErrorMessage=CheckMacValue Error');
  }

  const tradeNo = req.body.MerchantTradeNo;
  const rtnCode = req.body.RtnCode;  // '1' = 付款成功

  if (rtnCode === '1') {
    const order = orders.get(tradeNo);
    if (order) {
      order.status = 'paid';
      order.paidAt = new Date().toISOString();
      console.log(`[ECPay 通知] ✅ 付款成功: ${tradeNo} — ${order.charKey}`);
    } else {
      console.warn(`[ECPay 通知] 訂單不存在: ${tradeNo}`);
    }
  } else {
    console.log(`[ECPay 通知] 付款未成功: RtnCode=${rtnCode}`);
  }

  // 回傳 1|OK 表示已收到
  res.send('1|OK');
});

// === ECPay 付款結果頁面 (使用者導回) ===
app.post('/api/ecpay/result', (req, res) => {
  console.log('[ECPay 結果] 使用者導回:', JSON.stringify(req.body));

  const tradeNo = req.body.MerchantTradeNo;
  const rtnCode = req.body.RtnCode;
  const rtnMsg = req.body.RtnMsg || '';
  const order = orders.get(tradeNo);

  const success = rtnCode === '1';
  const charKey = order ? order.charKey : '';
  const charName = PRODUCTS[charKey] ? PRODUCTS[charKey].name.replace('路線解鎖', '') : '';

  res.send(`
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>付款結果 — 小小4J長大了</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a0a12; color: #fff; font-family: 'Noto Sans TC', sans-serif;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; padding: 1em;
    }
    .result-card {
      background: #16162a; border-radius: 1.5em; padding: 2.5em;
      max-width: 420px; width: 100%; text-align: center;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
      border: 1px solid ${success ? 'rgba(100,255,100,0.3)' : 'rgba(255,100,100,0.3)'};
    }
    .icon { font-size: 3em; margin-bottom: 0.3em; }
    h2 { font-size: 1.5em; margin-bottom: 0.5em;
         color: ${success ? '#66ff88' : '#ff6666'}; }
    .info { color: #aaa; font-size: 0.9em; margin: 0.3em 0; }
    .info strong { color: #ffd700; }
    .btn {
      display: inline-block; margin-top: 1.5em; padding: 0.8em 2.5em;
      font-size: 1.1em; background: linear-gradient(135deg, #ff6b9d, #c44dff);
      color: #fff; border: none; border-radius: 2em; cursor: pointer;
      text-decoration: none; transition: transform 0.2s;
    }
    .btn:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="result-card">
    <div class="icon">${success ? '🎉' : '❌'}</div>
    <h2>${success ? '付款成功！' : '付款未完成'}</h2>
    ${success ? `
      <p class="info"><strong>${charName}</strong> 路線已解鎖！</p>
      <p class="info">訂單編號: ${tradeNo}</p>
      <p class="info">金額: NT$ ${order ? order.price : ''}</p>
    ` : `
      <p class="info">狀態: ${rtnMsg}</p>
      <p class="info">訂單編號: ${tradeNo}</p>
    `}
    <a class="btn" href="/" onclick="notifyGame('${charKey}', ${success}); return false;">
      ${success ? '回到遊戲' : '返回'}
    </a>
  </div>
  <script>
    function notifyGame(charKey, success) {
      if (success && charKey) {
        // 將解鎖狀態寫入 localStorage
        try {
          const UNLOCK_KEY = 'little4j_unlocks';
          const unlocks = JSON.parse(localStorage.getItem(UNLOCK_KEY) || '{}');
          unlocks[charKey] = true;
          unlocks.yuki = true;
          localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocks));
          console.log('解鎖成功:', charKey);
        } catch(e) {
          console.error('解鎖寫入失敗:', e);
        }
      }
      window.location.href = '/';
    }
  </script>
</body>
</html>
  `);
});

// === 查詢訂單狀態 API ===
app.get('/api/ecpay/order-status/:tradeNo', (req, res) => {
  const order = orders.get(req.params.tradeNo);
  if (!order) {
    return res.status(404).json({ error: '訂單不存在' });
  }
  res.json({
    tradeNo: req.params.tradeNo,
    charKey: order.charKey,
    status: order.status,
    price: order.price,
  });
});

// === 啟動伺服器 ===
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  🎮 小小4J長大了 — 遊戲伺服器              ║');
  console.log('╠══════════════════════════════════════════════╣');
  console.log(`║  🌐 網址:  http://localhost:${PORT}             ║`);
  console.log(`║  💳 ECPay: ${ECPAY_CONFIG.isProduction ? '🔴 正式環境' : '🟡 測試環境 (Sandbox)'}       ║`);
  console.log(`║  📦 商店ID: ${ECPAY_CONFIG.MerchantID}                       ║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
  console.log('角色路線價格:');
  Object.entries(PRODUCTS).forEach(([k, v]) => {
    console.log(`  ${v.name}: NT$ ${v.price}`);
  });
  console.log('');
});
