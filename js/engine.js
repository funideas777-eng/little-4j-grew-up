/* === Game Engine === */
const GameEngine = {
  state: null,
  vnQueue: [],
  vnIndex: 0,
  waitingForClick: false,
  currentRoute: null,
  playerName: '4J',
  _dateTarget: null,
  _shopItem: null,
  replayMode: false,

  // Gate answer verification (obfuscated: answer = 30)
  _gateCheck(v) {
    const x = [5, 3, 2]; // factors
    const t = x[0] * x[2] + x[0] * x[1] + x[2] * x[1] - x[1]; // 10+15+6-3 = 28... no
    // Simple: (6*5) = 30
    const a = String.fromCharCode(51, 48); // '3','0' → '30'
    return v.trim() === a;
  },

  init() {
    UI.init();
    // VN click handler
    document.getElementById('vn-dialogue').addEventListener('click', (e) => {
      if (e.target.closest('.vn-choice-btn')) return;
      this.onVNClick();
    });
  },

  // === Gate Verification ===
  verifyGate() {
    const nameInput = document.getElementById('gate-name');
    const answerInput = document.getElementById('gate-answer');
    const errorEl = document.getElementById('gate-error');
    const name = nameInput.value.trim();
    const answer = answerInput.value.trim();

    if (!name) { errorEl.textContent = '請輸入你的名字'; return; }
    if (!answer) { errorEl.textContent = '請回答驗證問題'; return; }
    if (!this._gateCheck(answer)) { errorEl.textContent = '答案錯誤，請重新輸入'; answerInput.value = ''; return; }

    this.playerName = name;
    errorEl.textContent = '';
    UI.showScreen('title');
  },

  // === New Game ===
  newGame() {
    this.state = SaveSystem.getDefault();
    this.state.playerName = this.playerName;
    UI.showScreen('hub');
    UI.updateHub(this.state);
  },

  // === Load / Save ===
  loadGame() {
    const s = SaveSystem.load();
    if (s) {
      this.state = s;
      this.playerName = s.playerName || '4J';
      UI.showScreen('hub');
      UI.updateHub(this.state);
    }
  },

  saveGame() {
    if (this.state && SaveSystem.save(this.state)) {
      UI.showResultPopup('存檔成功', [{ text: `第 ${this.state.day} 天已儲存`, type: 'result-gain' }]);
    }
  },

  returnToTitle() {
    this.replayMode = false;
    UI.showScreen('title');
    if (SaveSystem.hasSave()) {
      document.getElementById('btn-continue').style.display = '';
    }
    // Show replay button if any endings completed
    const save = SaveSystem.load();
    const replayBtn = document.getElementById('btn-replay-title');
    if (save && save.completedEndings && save.completedEndings.length > 0) {
      replayBtn.style.display = '';
    } else {
      replayBtn.style.display = 'none';
    }
  },

  closePopup() {
    UI.closePopup();
  },

  // === Daily Actions ===
  doAction(actionKey) {
    const s = this.state;
    const results = [];
    let eventTriggered = false;

    // Hospital check: stamina < 20
    if (actionKey !== 'rest' && s.stamina < 20) {
      s.day += 5;
      s.money -= 10000;
      s.stamina = 100;
      UI.showResultPopup('住院通知', [
        { text: '體力過低，身體撐不住了！', type: 'result-loss' },
        { text: '強制住院休養 5 天', type: 'result-loss' },
        { text: '醫藥費 -10,000', type: 'result-loss' },
        { text: '體力恢復至 100', type: 'result-gain' },
      ]);
      UI.updateHub(s);
      SaveSystem.save(s);
      return;
    }

    switch (actionKey) {
      case 'rest':
        s.stamina = Math.min(100, s.stamina + 50);
        s.day++;
        results.push({ text: '休息了一天', type: '' });
        results.push({ text: '體力 +50', type: 'result-gain' });
        UI.updateHub(s);
        SaveSystem.save(s);
        UI.showResultPopup(`第 ${s.day} 天`, results);
        return;

      case 'study':
        if (s.stamina < 30) { UI.showResultPopup('體力不足', [{ text: '需要至少 30 體力', type: 'result-loss' }]); return; }
        if (s.money < 5000) { UI.showResultPopup('金錢不足', [{ text: '需要至少 NT$5,000', type: 'result-loss' }]); return; }
        s.stamina -= 30; s.money -= 5000;
        s.insight = Math.min(100, s.insight + 5);
        results.push({ text: '體力 -30', type: 'result-loss' });
        results.push({ text: '金錢 -5,000', type: 'result-loss' });
        results.push({ text: '見識 +5', type: 'result-gain' });
        if (s.insight >= 60 && s.monthlyIncome < 80000) {
          results.push({ text: '💡 見識達到 60！離扶輪社資格更近了', type: 'result-event' });
        }
        break;

      case 'work':
        if (s.stamina < 40) { UI.showResultPopup('體力不足', [{ text: '需要至少 40 體力', type: 'result-loss' }]); return; }
        s.stamina -= 40;
        const earn = 8000 + Math.floor(Math.random() * 7001);
        s.money += earn;
        results.push({ text: '體力 -40', type: 'result-loss' });
        results.push({ text: `金錢 +${earn.toLocaleString()}`, type: 'result-gain' });
        eventTriggered = this.checkEventTrigger('work', results);
        break;

      case 'cars':
        if (s.stamina < 10) { UI.showResultPopup('體力不足', [{ text: '需要至少 10 體力', type: 'result-loss' }]); return; }
        if (s.money < 2000) { UI.showResultPopup('金錢不足', [{ text: '需要至少 NT$2,000', type: 'result-loss' }]); return; }
        s.stamina -= 10; s.money -= 2000;
        s.charm = Math.min(100, s.charm + 8);
        results.push({ text: '體力 -10', type: 'result-loss' });
        results.push({ text: '金錢 -2,000', type: 'result-loss' });
        results.push({ text: '魅力 +8', type: 'result-gain' });
        eventTriggered = this.checkEventTrigger('cars', results);
        break;

      case 'travel':
        const cost = 10000 + Math.floor(Math.random() * 70001);
        if (s.money < cost) { UI.showResultPopup('金錢不足', [{ text: `需要約 NT$${cost.toLocaleString()}`, type: 'result-loss' }]); return; }
        s.money -= cost;
        s.stamina = Math.min(100, s.stamina + 25);
        s.insight = Math.min(100, s.insight + 10);
        results.push({ text: `金錢 -${cost.toLocaleString()}`, type: 'result-loss' });
        results.push({ text: '體力 +25', type: 'result-gain' });
        results.push({ text: '見識 +10', type: 'result-gain' });
        eventTriggered = this.checkEventTrigger('travel', results);
        break;

      case 'rotary':
        if (s.stamina < 15 || s.money < 30000) { UI.showResultPopup('資源不足', [{ text: '需體力 15 + NT$30,000', type: 'result-loss' }]); return; }
        s.stamina -= 15; s.money -= 30000;
        s.status = Math.min(100, s.status + 15);
        results.push({ text: '體力 -15', type: 'result-loss' });
        results.push({ text: '金錢 -30,000', type: 'result-loss' });
        results.push({ text: '地位 +15', type: 'result-gain' });
        eventTriggered = this.checkEventTrigger('rotary', results);
        break;
    }

    // Day advance
    s.day++;
    // Monthly income (every 30 days)
    if (s.day % 30 === 0) {
      s.money += s.monthlyIncome;
      results.push({ text: `💰 月薪入帳 +${s.monthlyIncome.toLocaleString()}`, type: 'result-gain' });
      // Upgrade income based on stats
      if (s.insight >= 80 && s.monthlyIncome < 80000) { s.monthlyIncome = 80000; results.push({ text: '🎉 升遷！月薪提升至 80,000', type: 'result-event' }); }
      else if (s.insight >= 50 && s.monthlyIncome < 45000) { s.monthlyIncome = 45000; results.push({ text: '🎉 加薪！月薪提升至 45,000', type: 'result-event' }); }
    }
    // Stamina recovery (partial daily)
    if (s.stamina < 100 && actionKey !== 'travel') {
      s.stamina = Math.min(100, s.stamina + 15);
    }

    UI.updateHub(s);
    SaveSystem.save(s);

    if (!eventTriggered) {
      UI.showResultPopup(`第 ${s.day} 天`, results);
    }
  },

  checkEventTrigger(actionKey, results) {
    const trigger = StoryData.actionTriggers[actionKey];
    if (!trigger) return false;

    const charKey = trigger.char;
    const s = this.state;
    const chProgress = s.chapterProgress[charKey];
    const thresholds = StoryData.chapterThresholds[charKey];

    // Already completed all chapters
    const totalChapters = StoryData.routes[charKey].length;
    if (chProgress >= totalChapters) return false;

    // First chapter (meeting) is free for all; subsequent chapters require unlock
    if (chProgress > 0 && !SaveSystem.isUnlocked(charKey)) return false;

    // First encounter or subsequent chapter
    const nextChapter = chProgress;
    const requiredAffection = thresholds[nextChapter];

    // Check if affection meets threshold
    if (nextChapter > 0 && s.affection[charKey] < requiredAffection) return false;

    // Random chance (first encounter is random, subsequent are guaranteed if threshold met)
    if (nextChapter === 0 && !s.metChars[charKey]) {
      if (Math.random() > trigger.chance) return false;
      s.metChars[charKey] = true;
    }

    // Trigger the chapter!
    const charName = StoryData.characters[charKey].name;
    results.push({ text: `💗 ${charName} 的故事觸發了！`, type: 'result-event' });
    UI.showResultPopup(`遇見 ${charName}`, results);

    // Start VN after popup close - override close handler
    const origClose = this.closePopup.bind(this);
    this.closePopup = () => {
      origClose();
      this.closePopup = origClose;
      this.startChapter(charKey, nextChapter);
    };

    return true;
  },

  // === Visual Novel Mode ===
  async startChapter(charKey, chapterIndex) {
    this.currentRoute = charKey;
    const chapter = StoryData.routes[charKey][chapterIndex];
    this.vnQueue = chapter.scenes;
    this.vnIndex = 0;

    // Show loading and preload chapter images
    const overlay = document.getElementById('loading-overlay');
    const bar = document.getElementById('loading-bar');
    const text = document.getElementById('loading-text');
    const images = chapter.scenes.filter(s => s.image).map(s => s.image);
    if (images.length > 0) {
      overlay.classList.remove('hidden');
      bar.style.width = '0%';
      text.textContent = `載入劇情圖片...`;
      let loaded = 0;
      await Promise.all(images.map(url => new Promise(resolve => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          bar.style.width = `${(loaded / images.length) * 100}%`;
          text.textContent = `載入劇情圖片 (${loaded}/${images.length})`;
          resolve();
        };
        img.src = url;
      })));
      overlay.classList.add('hidden');
    }

    UI.showScreen('vn');
    UI.hideCG();
    this.processNextScene();
  },

  async processNextScene() {
    if (this.vnIndex >= this.vnQueue.length) {
      this.endChapter();
      return;
    }

    const scene = this.vnQueue[this.vnIndex];

    switch (scene.type) {
      case 'cg':
        UI.showCG(scene.image);
        this.vnIndex++;
        this.processNextScene();
        break;

      case 'dialogue':
        UI.setDialogueName(scene.speaker);
        UI.showHint(true);
        await UI.typewriteText(scene.text);
        this.waitingForClick = true;
        break;

      case 'choice':
        UI.setDialogueName('');
        UI.showHint(false);
        document.getElementById('vn-text').textContent = '請選擇...';
        const choiceIdx = await UI.showChoices(scene.choices, this.state);
        const chosen = scene.choices[choiceIdx];
        if (chosen.effect && !this.replayMode) {
          if (chosen.effect.affection && this.currentRoute) {
            this.state.affection[this.currentRoute] = Math.min(100,
              Math.max(0, this.state.affection[this.currentRoute] + chosen.effect.affection));
          }
        }
        this.vnIndex++;
        this.processNextScene();
        break;

      case 'ending':
        if (!this.replayMode) {
          // Mark chapter complete
          this.state.chapterProgress[this.currentRoute] = StoryData.routes[this.currentRoute].length;
          if (!this.state.completedEndings.includes(this.currentRoute)) {
            this.state.completedEndings.push(this.currentRoute);
          }
          SaveSystem.save(this.state);
        }
        UI.showEnding(scene.image, scene.title, scene.text);
        break;
    }
  },

  onVNClick() {
    if (UI.typewriterTimer) {
      UI.skipTypewriter();
      return;
    }
    if (this.waitingForClick) {
      this.waitingForClick = false;
      this.vnIndex++;
      this.processNextScene();
    }
  },

  endChapter() {
    if (this.replayMode) {
      this.replayMode = false;
      UI.hideCG();
      UI.showScreen('hub');
      if (this.state) UI.updateHub(this.state);
      return;
    }
    const charKey = this.currentRoute;
    if (this.state.chapterProgress[charKey] < StoryData.routes[charKey].length) {
      this.state.chapterProgress[charKey]++;
    }
    SaveSystem.save(this.state);
    UI.hideCG();
    UI.showScreen('hub');
    UI.updateHub(this.state);
  },

  // === Date System ===
  openDateMenu() {
    const s = this.state;
    const container = document.getElementById('date-char-select');
    const typeArea = document.getElementById('date-type-select');
    const resultArea = document.getElementById('date-result-area');
    container.innerHTML = '';
    typeArea.style.display = 'none';
    resultArea.style.display = 'none';
    document.getElementById('date-popup-title').textContent = '選擇約會對象';
    this._dateTarget = null;

    const chars = ['kaoru', 'amy', 'yuki', 'rebecca'];
    chars.forEach(key => {
      if (!s.metChars[key]) return;
      const c = StoryData.characters[key];
      const btn = document.createElement('button');
      btn.className = `char-select-btn ${key}`;
      if (!SaveSystem.isUnlocked(key)) {
        btn.innerHTML = `${c.name}<br><small>🔒 需解鎖</small>`;
        btn.style.opacity = '0.5';
        btn.onclick = () => { this.closeDateMenu(); this.openUnlockPopup(); };
      } else {
        btn.innerHTML = `${c.name}<br><small>好感 ${s.affection[key]}/100</small>`;
        btn.onclick = () => this.selectDateTarget(key);
      }
      container.appendChild(btn);
    });

    document.getElementById('popup-date').style.display = '';
  },

  selectDateTarget(charKey) {
    this._dateTarget = charKey;
    const c = StoryData.characters[charKey];
    document.getElementById('date-popup-title').textContent = `和 ${c.name} 約會`;
    document.getElementById('date-char-select').style.display = 'none';
    const typeArea = document.getElementById('date-type-select');
    typeArea.innerHTML = '';
    typeArea.style.display = '';

    StoryData.dateTypes.forEach(dt => {
      const btn = document.createElement('button');
      btn.className = 'date-type-btn';
      btn.innerHTML = `<span>${dt.icon} ${dt.name}</span>
        <span><span class="dt-cost">體力-${dt.stamina} 💰-${dt.money.toLocaleString()}</span>
        <span class="dt-gain">好感+${dt.affection}</span></span>`;
      btn.onclick = () => this.goOnDate(charKey, dt);
      typeArea.appendChild(btn);
    });
  },

  goOnDate(charKey, dateType) {
    const s = this.state;
    if (s.stamina < dateType.stamina) { this._showDateResult('體力不足！', ''); return; }
    if (s.money < dateType.money) { this._showDateResult('金錢不足！', ''); return; }

    s.stamina -= dateType.stamina;
    s.money -= dateType.money;
    s.affection[charKey] = Math.min(100, s.affection[charKey] + dateType.affection);
    if (dateType.bonus.insight) s.insight = Math.min(100, s.insight + dateType.bonus.insight);
    s.day++;
    if (s.stamina < 100) s.stamina = Math.min(100, s.stamina + 15);

    // Random dialogue
    const dialogues = StoryData.dateDialogues[charKey][dateType.key];
    const dialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    const c = StoryData.characters[charKey];

    // Check if next chapter is now available
    const chProgress = s.chapterProgress[charKey];
    const thresholds = StoryData.chapterThresholds[charKey];
    let hint = '';
    const totalCh = StoryData.routes[charKey].length;
    if (chProgress < totalCh && chProgress > 0 && s.affection[charKey] >= thresholds[chProgress]) {
      hint = `\n\n💡 好感度已達標！透過「${StoryData.actionTriggers[this._getActionForChar(charKey)]? this._getActionName(charKey) : '對應行動'}」可觸發下一章劇情！`;
    }

    this._showDateResult(
      `${c.name} 的${dateType.name}`,
      `<div class="date-dialogue"><div class="dd-speaker" style="color:${c.color}">${c.name}</div><div class="dd-text">${dialogue}</div></div>
       <div class="result-line result-gain">好感 +${dateType.affection} (目前: ${s.affection[charKey]})</div>
       ${dateType.bonus.insight ? `<div class="result-line result-gain">見識 +${dateType.bonus.insight}</div>` : ''}
       <div class="result-line result-loss">體力 -${dateType.stamina} 金錢 -${dateType.money.toLocaleString()}</div>
       ${hint ? `<div class="result-line result-event">${hint}</div>` : ''}`
    );

    SaveSystem.save(s);
    UI.updateHub(s);
  },

  _getActionName(charKey) {
    const map = { kaoru: '打工', amy: '看車', yuki: '旅遊', rebecca: '扶輪社' };
    return map[charKey] || '行動';
  },

  _getActionForChar(charKey) {
    const map = { kaoru: 'work', amy: 'cars', yuki: 'travel', rebecca: 'rotary' };
    return map[charKey];
  },

  _showDateResult(title, html) {
    document.getElementById('date-type-select').style.display = 'none';
    document.getElementById('date-char-select').style.display = 'none';
    document.getElementById('date-popup-title').textContent = title;
    const area = document.getElementById('date-result-area');
    area.innerHTML = html;
    area.style.display = '';
  },

  closeDateMenu() {
    document.getElementById('popup-date').style.display = 'none';
    document.getElementById('date-char-select').style.display = '';
  },

  // === Shop System ===
  openShop() {
    const container = document.getElementById('shop-items');
    const giftSelect = document.getElementById('shop-gift-select');
    container.innerHTML = '';
    giftSelect.style.display = 'none';
    giftSelect.innerHTML = '';
    this._shopItem = null;

    StoryData.shopItems.forEach(item => {
      const div = document.createElement('button');
      div.className = 'shop-item';
      div.innerHTML = `<span>${item.icon} ${item.name} <small style="color:#aaa">${item.desc}</small></span>
        <span class="shop-price">$${item.price.toLocaleString()}</span>`;
      div.onclick = () => this.buyItem(item);
      container.appendChild(div);
    });

    document.getElementById('popup-shop').style.display = '';
  },

  buyItem(item) {
    const s = this.state;
    if (s.money < item.price) {
      UI.showResultPopup('金錢不足', [{ text: `需要 NT$${item.price.toLocaleString()}`, type: 'result-loss' }]);
      return;
    }

    if (item.target === 'self') {
      s.money -= item.price;
      const results = [{ text: `金錢 -${item.price.toLocaleString()}`, type: 'result-loss' }];
      if (item.effect.charm) { s.charm = Math.min(100, s.charm + item.effect.charm); results.push({ text: `魅力 +${item.effect.charm}`, type: 'result-gain' }); }
      if (item.effect.insight) { s.insight = Math.min(100, s.insight + item.effect.insight); results.push({ text: `見識 +${item.effect.insight}`, type: 'result-gain' }); }
      SaveSystem.save(s);
      UI.updateHub(s);
      this.closeShop();
      UI.showResultPopup(`購買 ${item.name}`, results);
    } else {
      // Gift - need to select recipient
      this._shopItem = item;
      document.getElementById('shop-items').style.display = 'none';
      const giftSelect = document.getElementById('shop-gift-select');
      giftSelect.innerHTML = '<p style="color:#ffd700;margin-bottom:0.5em">送給誰？</p>';
      giftSelect.style.display = '';

      const chars = ['kaoru', 'amy', 'yuki', 'rebecca'];
      chars.forEach(key => {
        if (!s.metChars[key]) return;
        const c = StoryData.characters[key];
        const btn = document.createElement('button');
        btn.className = `char-select-btn ${key}`;
        if (!SaveSystem.isUnlocked(key)) {
          btn.innerHTML = `${c.name}<br><small>🔒 需解鎖</small>`;
          btn.style.opacity = '0.5';
          btn.onclick = () => { this.closeShop(); this.openUnlockPopup(); };
        } else {
          btn.innerHTML = `${c.name}<br><small>好感 ${s.affection[key]}/100</small>`;
          btn.onclick = () => this.giveGift(key);
        }
        giftSelect.appendChild(btn);
      });

      if (!Object.values(s.metChars).some(v => v)) {
        giftSelect.innerHTML += '<p style="color:#ff6b6b">還沒認識任何角色</p>';
      }
    }
  },

  giveGift(charKey) {
    const s = this.state;
    const item = this._shopItem;
    if (!item) return;

    s.money -= item.price;
    const c = StoryData.characters[charKey];
    const results = [{ text: `金錢 -${item.price.toLocaleString()}`, type: 'result-loss' }];

    s.affection[charKey] = Math.min(100, s.affection[charKey] + item.effect.affection);
    results.push({ text: `${c.name} 好感 +${item.effect.affection} (目前: ${s.affection[charKey]})`, type: 'result-gain' });
    if (item.effect.charm) { s.charm = Math.min(100, s.charm + item.effect.charm); results.push({ text: `魅力 +${item.effect.charm}`, type: 'result-gain' }); }

    SaveSystem.save(s);
    UI.updateHub(s);
    this.closeShop();
    UI.showResultPopup(`送 ${c.name} ${item.name}`, results);
  },

  closeShop() {
    document.getElementById('popup-shop').style.display = 'none';
    document.getElementById('shop-items').style.display = '';
    document.getElementById('shop-gift-select').style.display = 'none';
  },

  // === Unlock System ===
  openUnlockPopup() {
    const grid = document.getElementById('unlock-char-grid');
    const payArea = document.getElementById('unlock-payment-area');
    grid.innerHTML = '';
    payArea.style.display = 'none';
    payArea.innerHTML = '';

    const chars = ['yuki', 'kaoru', 'amy', 'rebecca'];
    chars.forEach(key => {
      const c = StoryData.characters[key];
      const unlocked = SaveSystem.isUnlocked(key);
      const isFree = c.unlockType === 'free';

      const card = document.createElement('button');
      card.className = `unlock-card ${isFree ? 'free' : 'paid'} ${unlocked && !isFree ? 'unlocked' : ''}`;
      card.innerHTML = `
        <div class="unlock-name" style="color:${c.color}">${c.name}</div>
        <div class="unlock-full">${c.fullName}</div>
        <div class="unlock-route-desc">${c.desc}</div>
        <div class="unlock-price">${isFree ? '免費' : unlocked ? '✅ 已解鎖' : `NT$ ${c.price}`}</div>
        <span class="unlock-badge">${isFree ? 'FREE' : unlocked ? '已購買' : '付費解鎖'}</span>
      `;
      if (!unlocked && !isFree) {
        card.onclick = () => this.showPaymentArea(key);
      }
      card.style.cursor = (!unlocked && !isFree) ? 'pointer' : 'default';
      grid.appendChild(card);
    });

    document.getElementById('popup-unlock').style.display = '';
  },

  showPaymentArea(charKey) {
    const c = StoryData.characters[charKey];
    const payArea = document.getElementById('unlock-payment-area');
    payArea.style.display = '';
    payArea.innerHTML = `
      <div class="ecpay-area">
        <h4>💳 購買 ${c.name} 路線</h4>
        <div class="ecpay-char-info">
          <strong style="color:${c.color}">${c.fullName}</strong><br>
          ${c.desc}<br><br>
          金額: <strong style="color:#ffd700">NT$ ${c.price}</strong>
        </div>
        <button class="ecpay-btn" id="ecpay-pay-btn" onclick="game.processECPay('${charKey}')">
          綠界 ECPay 付款
        </button>
        <div id="ecpay-status" class="ecpay-processing" style="display:none"></div>
      </div>
    `;
    // Scroll to payment area
    payArea.scrollIntoView({ behavior: 'smooth' });
  },

  async processECPay(charKey) {
    const c = StoryData.characters[charKey];
    const btn = document.getElementById('ecpay-pay-btn');
    const status = document.getElementById('ecpay-status');
    btn.disabled = true;
    btn.textContent = '處理中...';
    status.style.display = '';
    status.textContent = '⏳ 建立訂單中...';

    try {
      // 呼叫後端建立 ECPay 訂單
      const resp = await fetch('/api/ecpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ charKey }),
      });

      if (!resp.ok) {
        let errMsg = '建立訂單失敗';
        try { const err = await resp.json(); errMsg = err.error || errMsg; } catch(e) {}
        throw new Error(errMsg);
      }

      const data = await resp.json();
      status.textContent = '💳 導向綠界付款頁面...';

      // 開啟付款表單 (在新視窗或當前視窗)
      // 方式: 寫入一個隱藏的 iframe 或直接在當前頁面開啟
      const payWindow = window.open('', '_blank');
      if (payWindow) {
        payWindow.document.write(data.formHTML);
        payWindow.document.close();
        status.textContent = '📋 已開啟付款視窗，完成付款後請回到此頁面';
        btn.textContent = '已開啟付款視窗';

        // 輪詢訂單狀態
        this._pollOrderStatus(data.tradeNo, charKey);
      } else {
        // 彈窗被阻擋，改用當前頁面
        status.innerHTML = '⚠️ 彈窗被阻擋，點擊下方按鈕前往付款';
        const directBtn = document.createElement('button');
        directBtn.className = 'ecpay-btn';
        directBtn.style.marginTop = '0.5em';
        directBtn.textContent = '前往綠界付款';
        directBtn.onclick = () => {
          // 直接在當前頁面寫入表單
          document.open();
          document.write(data.formHTML);
          document.close();
        };
        status.appendChild(directBtn);
      }
    } catch (err) {
      status.textContent = `❌ 錯誤: ${err.message}`;
      btn.disabled = false;
      btn.textContent = '綠界 ECPay 付款';
      console.error('ECPay 訂單建立失敗:', err);

      // 如果後端不可用，使用本地模擬模式
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('建立訂單失敗') || err.message.includes('Unsupported')) {
        status.textContent = '⚠️ 付款伺服器未啟動，使用模擬付款模式';
        btn.disabled = false;
        btn.textContent = '模擬付款 (測試用)';
        btn.onclick = () => this._mockPayment(charKey);
      }
    }
  },

  // 輪詢訂單狀態 (付款完成後自動解鎖)
  _pollOrderStatus(tradeNo, charKey) {
    let attempts = 0;
    const maxAttempts = 120; // 最多等 10 分鐘 (每 5 秒查一次)
    const poll = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(poll);
        return;
      }
      try {
        const resp = await fetch(`/api/ecpay/order-status/${tradeNo}`);
        if (!resp.ok) return;
        const order = await resp.json();
        if (order.status === 'paid') {
          clearInterval(poll);
          SaveSystem.setUnlock(charKey);
          const c = StoryData.characters[charKey];
          this.closeUnlockPopup();
          UI.showResultPopup('🎉 解鎖成功', [
            { text: `${c.name} (${c.fullName}) 路線已解鎖！`, type: 'result-gain' },
            { text: `付款金額: NT$ ${c.price}`, type: '' },
            { text: '現在可以觸發她的故事了', type: 'result-event' },
          ]);
          if (this.state) UI.updateHub(this.state);
        }
      } catch (e) { /* 靜默忽略網路錯誤 */ }
    }, 5000);
  },

  // 模擬付款 (後端不可用時的 fallback)
  _mockPayment(charKey) {
    const c = StoryData.characters[charKey];
    const status = document.getElementById('ecpay-status');
    status.textContent = '💳 模擬付款中...';
    setTimeout(() => {
      status.textContent = '✅ 模擬付款成功！';
      SaveSystem.setUnlock(charKey);
      setTimeout(() => {
        this.closeUnlockPopup();
        UI.showResultPopup('🎉 解鎖成功 (模擬)', [
          { text: `${c.name} (${c.fullName}) 路線已解鎖！`, type: 'result-gain' },
          { text: `付款金額: NT$ ${c.price}`, type: '' },
          { text: '⚠️ 此為模擬付款，啟動 node server.js 可使用真實綠界', type: 'result-event' },
        ]);
        if (this.state) UI.updateHub(this.state);
      }, 800);
    }, 1500);
  },

  closeUnlockPopup() {
    document.getElementById('popup-unlock').style.display = 'none';
  },

  // === Replay System ===
  openReplayMenu() {
    const charSelect = document.getElementById('replay-char-select');
    const chapterList = document.getElementById('replay-chapter-list');
    charSelect.innerHTML = '';
    charSelect.style.display = '';
    chapterList.style.display = 'none';
    chapterList.innerHTML = '';

    // Get completed endings from save
    const save = this.state || SaveSystem.load();
    if (!save || !save.completedEndings || save.completedEndings.length === 0) {
      charSelect.innerHTML = '<p style="color:#999;padding:1em">還沒有完成任何角色的結局<br><small>完成角色結局後可在此重看故事</small></p>';
      document.getElementById('popup-replay').style.display = '';
      return;
    }

    save.completedEndings.forEach(key => {
      const c = StoryData.characters[key];
      if (!c) return;
      const btn = document.createElement('button');
      btn.className = `char-select-btn ${key}`;
      btn.innerHTML = `${c.name}<br><small>${c.fullName}</small>`;
      btn.onclick = () => this.showReplayChapters(key, save);
      charSelect.appendChild(btn);
    });

    document.getElementById('popup-replay').style.display = '';
  },

  showReplayChapters(charKey, save) {
    const charSelect = document.getElementById('replay-char-select');
    const chapterList = document.getElementById('replay-chapter-list');
    charSelect.style.display = 'none';
    chapterList.style.display = '';
    chapterList.className = 'replay-chapter-list';
    chapterList.innerHTML = '';

    const chapters = StoryData.routes[charKey];
    const maxPlayable = save.chapterProgress[charKey] || 0;
    const c = StoryData.characters[charKey];

    const header = document.createElement('p');
    header.style.cssText = `color:${c.color};font-weight:bold;margin-bottom:0.5em;font-size:1.1rem;`;
    header.textContent = `${c.name} 的故事`;
    chapterList.appendChild(header);

    chapters.forEach((ch, idx) => {
      const btn = document.createElement('button');
      const playable = idx < maxPlayable;
      btn.className = `replay-chapter-btn ${playable ? '' : 'locked'}`;
      btn.innerHTML = `<span><span class="ch-num">第${idx + 1}章</span> ${ch.title}</span>
        <span class="ch-play">${playable ? '▶ 重看' : '🔒'}</span>`;
      if (playable) {
        btn.onclick = () => this.replayChapter(charKey, idx);
      }
      chapterList.appendChild(btn);
    });

    // Back to char select
    const backBtn = document.createElement('button');
    backBtn.className = 'btn-sub';
    backBtn.textContent = '← 選擇角色';
    backBtn.style.marginTop = '0.5em';
    backBtn.onclick = () => {
      charSelect.style.display = '';
      chapterList.style.display = 'none';
    };
    chapterList.appendChild(backBtn);
  },

  replayChapter(charKey, chapterIndex) {
    this.replayMode = true;
    this.closeReplayMenu();
    // Ensure we have a state for UI updates
    if (!this.state) {
      this.state = SaveSystem.load() || SaveSystem.getDefault();
    }
    this.startChapter(charKey, chapterIndex);
  },

  closeReplayMenu() {
    document.getElementById('popup-replay').style.display = 'none';
    document.getElementById('replay-char-select').style.display = '';
    document.getElementById('replay-chapter-list').style.display = 'none';
  },
};

// === Global game reference ===
const game = GameEngine;

// === Image Preloader ===
const Preloader = {
  preloadChapter(charKey, chapterIndex) {
    const chapter = StoryData.routes[charKey]?.[chapterIndex];
    if (!chapter) return Promise.resolve();
    const images = chapter.scenes.filter(s => s.image).map(s => s.image);
    return this.preloadImages(images);
  },

  preloadImages(urls) {
    if (!urls.length) return Promise.resolve();
    return Promise.all(urls.map(url => new Promise(resolve => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve; // don't block on missing images
      img.src = url;
    })));
  },

  async preloadUI() {
    const overlay = document.getElementById('loading-overlay');
    const bar = document.getElementById('loading-bar');
    const text = document.getElementById('loading-text');
    const uiImages = [
      'assets/images/ui/ui_title_screen.png',
      'assets/images/ui/ui_main_hub.png',
      'assets/images/ui/ui_status_panel.png',
      'assets/images/ui/ui_dialogue_box.png',
      'assets/images/ui/ui_map_taipei.png',
    ];
    let loaded = 0;
    const total = uiImages.length;
    text.textContent = `載入UI資源 (0/${total})`;
    await Promise.all(uiImages.map(url => new Promise(resolve => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        bar.style.width = `${(loaded / total) * 100}%`;
        text.textContent = `載入UI資源 (${loaded}/${total})`;
        resolve();
      };
      img.src = url;
    })));
    overlay.classList.add('hidden');
  }
};

// === Init on load ===
window.addEventListener('DOMContentLoaded', async () => {
  await Preloader.preloadUI();
  game.init();
});
