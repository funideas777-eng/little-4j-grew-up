# 小小4J長大了 - 完整遊戲開發設計文件

## 一、遊戲概述

| 項目 | 內容 |
|------|------|
| 遊戲名稱 | 小小4J長大了 |
| 類型 | 成人養成模擬 (H-Game / Raising Simulation) |
| 視角 | 第一人稱 + 視覺小說對話 |
| 平台 | Web (HTML5 / JavaScript) |
| 風格 | 日系動漫風格，半寫實美術 |

---

## 二、主角設定

| 屬性 | 數值 / 說明 |
|------|------------|
| 姓名 | 4J |
| 背景 | 台灣大學畢業生，家有廚具工廠，畢業後被父親要求「從零開始歷練」 |
| 體力 (Stamina) | 100 / 100（每日上限，各行動消耗） |
| 月收入 (Monthly_Income) | NT$ 22,000 ~ 150,000（隨工作等級與投資能力提升） |
| 魅力 (Charm) | 0 ~ 100（影響角色好感度觸發門檻） |
| 見識 (Insight) | 0 ~ 100（解鎖進階劇情與對話選項） |
| 地位 (Status) | 0 ~ 100（影響扶輪社等高端事件） |

---

## 三、每日行動系統

### Act_01：投資自己 (學歷/證照)
| 項目 | 內容 |
|------|------|
| 消耗 | 體力 -30，金錢 -5,000 |
| 獲得 | 見識 +5，解鎖高端工作門檻 |
| 觸發條件 | 見識 ≥ 60 時解鎖「扶輪社入會資格」 |
| 場景 | 圖書館、補習班、大學研究所 |

### Act_02：打工 (兼職)
| 項目 | 內容 |
|------|------|
| 消耗 | 體力 -20 |
| 獲得 | 金錢 +8,000 ~ 15,000 |
| 隨機觸發 | 15% 機率觸發「車展女孩」事件 |
| 場景 | 便利商店、展場、餐廳 |

### Act_03：買車/看車
| 項目 | 內容 |
|------|------|
| 消耗 | 體力 -10，金錢 -2,000 (看車) / -500,000+ (買車) |
| 獲得 | 魅力 +8 |
| 隨機觸發 | 20% 機率觸發「汽車女銷售」事件 |
| 場景 | 汽車展示間、停車場、山路試車 |

### Act_04：旅遊 (國內外)
| 項目 | 內容 |
|------|------|
| 消耗 | 金錢 -10,000 ~ 80,000 |
| 獲得 | 體力恢復至滿、見識 +10 |
| 隨機觸發 | 25% 機率觸發「空姐」事件 |
| 場景 | 機場、飛機艙內、度假村、溫泉旅館 |

### Act_05：參加扶輪社
| 項目 | 內容 |
|------|------|
| 消耗 | 體力 -15，金錢 -30,000 |
| 獲得 | 地位 +15 |
| 解鎖條件 | 見識 ≥ 60、月收入 ≥ 80,000 |
| 觸發 | 100% 觸發「有錢阿姨」事件（好感度門檻） |
| 場景 | 五星級飯店宴會廳、高爾夫球場、私人會所 |

---

## 四、可攻略角色完整設定

---

### 角色 1：小薰 (車展女孩)
| 項目 | 內容 |
|------|------|
| 全名 | 林小薰 |
| 年齡 | 22 歲 |
| 職業 | 車展 Show Girl / 兼職模特兒 |
| 個性 | 外表甜美活潑，內心渴望被認真對待，厭倦被當花瓶 |
| 觸發來源 | Act_02 打工（展場兼職時偶遇） |
| 好感度門檻 | 初遇 0 → 告白 80 → 親密 100 |

**外貌描述：** 身高 165cm，長髮微捲及腰，穿著緊身車展制服，腰際繫著廠商腰帶，甜美笑容中帶點倔強。

---

### 角色 2：Amy (汽車女銷售)
| 項目 | 內容 |
|------|------|
| 全名 | 陳思婷 (英文名 Amy) |
| 年齡 | 27 歲 |
| 職業 | 高級車品牌業務顧問 |
| 個性 | 專業幹練、外冷內熱，穿著套裝但私下狂野 |
| 觸發來源 | Act_03 買車/看車 |
| 好感度門檻 | 初遇 0 → 私下約會 50 → 告白 80 → 親密 100 |

**外貌描述：** 身高 170cm，俐落短髮或馬尾，合身黑色套裝配高跟鞋，知性眼鏡，身材高挑勻稱。

---

### 角色 3：Yuki (空姐)
| 項目 | 內容 |
|------|------|
| 全名 | 佐藤 Yuki（台日混血） |
| 年齡 | 25 歲 |
| 職業 | 國際線空服員 |
| 個性 | 溫柔優雅、帶異國神秘感，因常飛國際線而寂寞 |
| 觸發來源 | Act_04 旅遊 |
| 好感度門檻 | 初遇 0 → 交換聯繫 30 → 約會 60 → 告白 80 → 親密 100 |

**外貌描述：** 身高 168cm，黑色長直髮束成優雅包頭（工作時），私下放下長髮飄逸動人。空服員制服合身，絲襪高跟。

---

### 角色 4：Rebecca (有錢阿姨)
| 項目 | 內容 |
|------|------|
| 全名 | 王瑞貝卡 |
| 年齡 | 38 歲 |
| 職業 | 上市公司董事長夫人 / 扶輪社資深會員 |
| 個性 | 雍容華貴、控制欲強、對年輕有為的男性特別「照顧」 |
| 觸發來源 | Act_05 扶輪社 |
| 好感度門檻 | 初遇 0 → 被邀請 40 → 暗示 70 → 親密 90 |

**外貌描述：** 身高 163cm，燙捲及肩髮，總是穿著名牌洋裝配珠寶首飾，身材豐腴保養極好，散發成熟女性魅力。

---

## 五、完整劇情架構（四角色 × 各 5 階段）

---

### 🌸 角色 1：小薰 (車展女孩) 劇情線

#### 第一章：命運的展場相遇
**觸發條件：** Act_02 打工，機率 15%

**劇情概要：**
4J 在台北南港展覽館擔任臨時工搬運佈展器材，汗流浹背地扛著重物。一個轉角撞上了正在補妝的 Show Girl 小薰，粉底液灑了一地。小薰原本要發火，卻看到 4J 手忙腳亂地用自己的 T-shirt 下擺幫她擦，忍不住笑了出來。

**關鍵對話：**
- 小薰：「你是白痴嗎？用衣服擦？！...不過，還滿可愛的啦。」
- 4J 選項 A：「抱歉！我去幫你買新的！」（好感 +10）
- 4J 選項 B：「能讓這麼漂亮的人笑出來，弄髒衣服也值得。」（好感 +15，需魅力 ≥ 20）
- 4J 選項 C：「...」（社恐無言）（好感 +3）

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC01_01 | scene_kaoru_ch1_meet.png | 展場碰撞瞬間 | `Anime style, indoor exhibition hall, bright lighting. A young man in a work T-shirt bumps into a beautiful showgirl in a tight red car-show uniform. Makeup powder flying in the air. The girl looks surprised with big expressive eyes. Dynamic angle, comedic moment. High quality, detailed background with car show booths.` |
| SC01_02 | scene_kaoru_ch1_laugh.png | 小薰笑出來的瞬間 | `Anime style, close-up portrait of a beautiful 22-year-old girl with long wavy hair, wearing a red exhibition uniform, laughing genuinely with her hand near her mouth. Warm lighting, sparkle effects around her. Her eyes are crescent-shaped from smiling. Blurred exhibition hall background. High quality illustration.` |
| SC01_03 | scene_kaoru_ch1_wipe.png | 4J 用衣服幫她擦 | `Anime style, a young man awkwardly using his T-shirt hem to wipe spilled foundation from a pretty girl's hand. The girl looks amused and slightly embarrassed. Indoor exhibition setting, warm lighting. Intimate close-up composition. Detailed hands and fabric texture.` |

---

#### 第二章：休息室的秘密
**觸發條件：** 好感度 ≥ 30，再次觸發 Act_02

**劇情概要：**
車展第三天，4J 又被派到同一個場館。午休時間他偷溜到後台找小薰，卻發現她一個人躲在道具間哭。原來是攝影師對她毛手毛腳，她反抗後被威脅要在業界封殺她。4J 二話不說拉著她的手去找展場主辦方投訴，雖然笨拙但態度堅定。事情解決後，小薰第一次對他卸下心防。

**關鍵對話：**
- 小薰（哭泣）：「每次都這樣...他們只看到我的身體，沒人在乎我在想什麼...」
- 4J 選項 A：「走，跟我去找主辦方。妳不用一個人扛。」（好感 +20，觸發特殊劇情）
- 4J 選項 B：「我可以幫妳揍他。」（好感 +10，暴力路線）
- 4J 選項 C：「要不...妳就別做這行了？」（好感 -10，觸發生氣事件）

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC01_04 | scene_kaoru_ch2_cry.png | 小薰在道具間哭泣 | `Anime style, a beautiful young woman sitting alone in a dim backstage storage room, crying with tears on her cheeks. She's still wearing her showgirl uniform but her hair is messy. Dramatic lighting from a single overhead light. Emotional scene, melancholic atmosphere. Cardboard boxes and props around her. High quality.` |
| SC01_05 | scene_kaoru_ch2_hand.png | 4J 拉起她的手 | `Anime style, dramatic close-up of a young man's hand firmly grabbing a crying girl's delicate hand, pulling her up. Low angle shot. Backlit with warm light from a doorway. Emotional, determined expression on the man's face. The girl looks up with tearful but hopeful eyes. Cinematic composition.` |
| SC01_06 | scene_kaoru_ch2_resolve.png | 兩人一起去找主辦方 | `Anime style, a young man walking determinedly through a busy exhibition hallway, holding a pretty girl's hand behind him. She follows with a mix of surprise and trust on her face. Dynamic walking pose, exhibition banners and crowds in the blurred background. Warm color palette.` |

---

#### 第三章：日落的淡水告白
**觸發條件：** 好感度 ≥ 60

**劇情概要：**
小薰答應4J 的邀約，兩人騎機車到淡水老街約會。吃著阿給和魚酥，小薰說起自己其實是單親家庭長大，做 Show Girl 是為了存錢讓媽媽開一間小花店。4J 被觸動了——他想起自己也是被父親期望著要獨立的人。日落時分在漁人碼頭，海風吹起小薰的長髮，4J 鼓起勇氣告白。

**關鍵對話：**
- 4J：「小薰...我知道我現在什麼都不是，只是一個在展場搬箱子的傢伙。但我想認真對待妳。」
- 小薰（臉紅）：「你真的很笨耶...但是...我也想被這樣的笨蛋認真對待。」

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC01_07 | scene_kaoru_ch3_tamsui.png | 淡水老街約會 | `Anime style, a young couple walking through a traditional Taiwanese old street (Tamsui), eating street food. The girl has long wavy hair in casual clothes (sundress), the boy in a casual shirt. Warm sunset lighting, traditional food stalls and red lanterns in background. Romantic and lively atmosphere. High quality illustration.` |
| SC01_08 | scene_kaoru_ch3_sunset.png | 漁人碼頭日落告白 | `Anime style, breathtaking sunset scene at a waterfront pier. A young man facing a beautiful girl with long flowing hair blown by sea breeze. Golden hour lighting, orange and purple sky reflected on water. The girl's eyes are glistening with emotion. Romantic atmosphere, dramatic lens flare. Cinematic wide shot. High quality.` |
| SC01_09 | scene_kaoru_ch3_blush.png | 小薰害羞接受 | `Anime style, extreme close-up of a beautiful girl's face blushing deeply, her hands covering her cheeks. Long wavy hair flowing in the wind. Sunset backlighting creating a warm glow. Sparkling eyes with happy tears. Bokeh light effects. Dreamy romantic atmosphere. Ultra detailed portrait.` |

---

#### 第四章：雨夜的心跳加速
**觸發條件：** 好感度 ≥ 80，成為情侶後

**劇情概要：**
約會回程遇上暴雨，兩人狼狽躲進4J 的小套房。小薰的白色上衣被雨淋濕了，4J 手忙腳亂地找乾衣服給她。小薰從浴室出來穿著 4J 過大的 T-shirt，空氣中的氣氛突然改變了。她坐在床邊，兩人沉默對望，窗外的雨聲成了唯一的背景音樂。

**關鍵對話：**
- 小薰（穿著 4J 的 T-shirt，聲音很小）：「...你的衣服好大件...但好溫暖。」
- 4J 選項 A：「那以後...妳的溫暖就讓我來守護。」（觸發親密事件）
- 4J 選項 B：「妳先睡床，我睡地板。」（好感 +5，紳士路線，延後親密事件）

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC01_10 | scene_kaoru_ch4_rain.png | 雨中奔跑 | `Anime style, a young couple running through heavy rain in a city street at night. Neon lights reflecting on wet pavement. The girl in a white blouse (slightly see-through from rain) and the boy holding his jacket over her head. Dynamic running pose, rain droplets frozen in mid-air. Cinematic lighting. High energy scene.` |
| SC01_11 | scene_kaoru_ch4_tshirt.png | 小薰穿著大T-shirt | `Anime style, a beautiful girl standing shyly in a small apartment doorway after a shower, wearing an oversized men's T-shirt that falls to her mid-thigh. Her long hair is damp and slightly tousled. Warm interior lighting, rain visible through the window behind her. Shy expression, holding the shirt hem. Intimate and tender atmosphere. Soft lighting.` |
| SC01_12 | scene_kaoru_ch4_gaze.png | 兩人在床邊對望 | `Anime style, intimate scene of a young couple sitting on a bed facing each other in a small cozy apartment. Rain on the window. Warm dim lamp light. The girl in an oversized shirt, the boy in a tank top. Their faces close, eyes locked, the atmosphere charged with tension. Soft bokeh rain lights through the window. Romantic and passionate mood.` |

---

#### 第五章：我的花店與妳
**觸發條件：** 好感度 100，完成親密事件

**劇情概要：**
一年後，4J 用存下的錢和家裡工廠的人脈，幫小薰的媽媽圓了花店夢。開幕那天，小薰穿著花店圍裙，眼裡含著眼淚抱住4J。她說：「謝謝你看見真正的我。」兩人在花香中擁吻，螢幕漸漸淡出到片尾 CG。

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC01_13 | scene_kaoru_ch5_shop.png | 花店開幕日 | `Anime style, a beautiful small flower shop grand opening scene. A pretty girl in a cute floral apron standing at the entrance surrounded by colorful flowers. Ribbon cutting ceremony, warm sunlight. Joyful expression with tears of happiness. A young man standing beside her proudly. Festive atmosphere. Vibrant colors. High quality.` |
| SC01_14 | scene_kaoru_ch5_embrace.png | 花香中的擁抱 | `Anime style, emotional embrace between a young couple inside a flower shop. The girl in a floral apron hugging the boy tightly, tears of joy on her face. Surrounded by roses, lilies and sunflowers. Warm golden lighting, flower petals floating in the air. Deeply emotional and romantic scene. Cinematic composition.` |
| SC01_15 | scene_kaoru_ch5_ending_cg.png | 結局CG | `Anime style, ending CG illustration. A couple kissing tenderly among flowers in a beautiful shop. The girl's long wavy hair flowing, petals swirling around them. Dreamy soft focus background. Warm pink and golden color palette. Magical sparkle effects. Ultra high quality, poster-worthy illustration.` |

---

### 💼 角色 2：Amy (汽車女銷售) 劇情線

#### 第一章：展示間的女王
**觸發條件：** Act_03 看車，機率 20%

**劇情概要：**
4J 走進 BMW 展示間，只是想過過眼癮。穿著合身黑色套裝的 Amy 立刻上前接待。她一眼就看出 4J 「只是來看看的」，但專業地沒有怠慢，反而詳細介紹了每款車的性能。4J 被她的專業知識和幹練態度吸引了，但 Amy 的眼神始終帶著距離感——她見過太多只想搭訕的男客人。

**關鍵對話：**
- Amy（專業微笑）：「先生您好，請問您今天想了解哪款車型？」
- 4J 選項 A：「其實...我今天只是來看看的，但妳介紹得太專業了，我真的學到很多。」（好感 +10，真誠路線）
- 4J 選項 B：「比起車，我對妳更有興趣。」（好感 -15，Amy 翻白眼）
- 4J 選項 C：「我想了解一下 M3 的渦輪配置。」（好感 +15，需見識 ≥ 40，懂車路線）

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC02_01 | scene_amy_ch1_showroom.png | 展示間初遇 | `Anime style, luxury BMW car showroom with sleek modern interior. A tall professional woman (27yo) in a fitted black business suit and glasses, holding a tablet, standing next to a shiny sports car. A young man in casual clothes looking impressed. Polished marble floor reflecting lights. Clean, premium atmosphere. High quality.` |
| SC02_02 | scene_amy_ch1_explain.png | Amy 專業介紹 | `Anime style, a professional saleswoman in black suit and glasses leaning on a luxury car hood, pointing at engine specs on a tablet. Confident posture, sharp eyes behind glasses. The young male customer listening attentively. Showroom lighting with spotlights on the car. Detailed car and character rendering.` |
| SC02_03 | scene_amy_ch1_cold.png | Amy 的距離感 | `Anime style, a tall professional woman in a black suit adjusting her glasses with a cool, measured expression. Slight smirk. Standing in front of a luxury car with arms crossed. Cool blue-tinted lighting emphasizing her professional demeanor. Beautiful but unapproachable aura. High quality portrait.` |

---

#### 第二章：賽道上的真面目
**觸發條件：** 好感度 ≥ 30，魅力 ≥ 30

**劇情概要：**
Amy 邀請 4J 參加品牌舉辦的 VIP 試駕活動。在大鵬灣賽車場，西裝革履的 Amy 突然換上了賽車服——原來她是業餘賽車手！她載著 4J 在賽道上飆到 200km/h，4J 嚇得臉色發白卻又興奮不已。下車後 Amy 第一次對他露出不是營業用的笑容：「怎樣，還活著嗎？」

**關鍵對話：**
- Amy（脫下安全帽，甩動馬尾）：「下班後的我跟上班完全不同喔。還受得了嗎？」
- 4J 選項 A：「受得了！下次我來開，換妳在副駕嚇得尖叫！」（好感 +20）
- 4J 選項 B：「妳認真開車的樣子...超帥的。」（好感 +15）

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC02_04 | scene_amy_ch2_racesuit.png | Amy 換上賽車服 | `Anime style, a beautiful tall woman unzipping the top of a racing suit, revealing a tank top underneath. Short ponytail, confident grin, taking off her glasses. Race track pit lane background with sports cars. Dynamic pose, wind in her hair. Transformation from office lady to racer. Exciting atmosphere. High quality.` |
| SC02_05 | scene_amy_ch2_driving.png | 賽道狂飆 | `Anime style, inside a racing car cockpit view. A woman with determined eyes driving at high speed on a race track, hands gripping the steering wheel. Speed lines and motion blur. The male passenger gripping his seat with a mix of terror and excitement. Adrenaline-pumping scene. Dynamic camera angle. High quality.` |
| SC02_06 | scene_amy_ch2_smile.png | Amy 的真心笑容 | `Anime style, a beautiful woman leaning against a sports car in the pit lane, hair messy from racing, genuine relaxed smile. Racing suit half-unzipped. Sunset light on the race track behind her. First time showing her real personality. Warm and cool contrast lighting. Attractive and natural expression. High quality portrait.` |

---

#### 第三章：深夜加班的脆弱
**觸發條件：** 好感度 ≥ 55

**劇情概要：**
4J 深夜路過展示間，看到裡面還亮著燈。Amy 一個人坐在辦公室裡喝著罐裝咖啡，面前堆著業績報表。這個月她的業績墊底——因為她拒絕了總經理「陪客戶應酬」的要求。4J 默默買了雞排和珍奶過去陪她。第一次看到 Amy 脫下套裝外套、拿掉眼鏡的疲憊模樣。

**關鍵對話：**
- Amy（揉著太陽穴）：「你知道嗎，這個行業...女生要賣車，不是只賣車。」
- 4J：「那就用實力讓他們閉嘴。妳比任何人都專業。」
- Amy（眼眶微紅）：「...謝了，雞排還不錯。」

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC02_07 | scene_amy_ch3_overtime.png | 深夜獨自加班 | `Anime style, a tired professional woman sitting alone in a dimly lit car showroom office at night. Glasses off, rubbing her temples. Suit jacket draped over chair, wearing a white blouse with top button undone. Canned coffee and papers on desk. City lights through window. Lonely and vulnerable atmosphere. Moody lighting. High quality.` |
| SC02_08 | scene_amy_ch3_comfort.png | 4J 帶宵夜來 | `Anime style, a young man standing at an office door holding a bag of Taiwanese fried chicken and bubble tea, smiling warmly. A tired businesswoman at her desk looking up in surprise. Warm light from the hallway contrasting with the dim office. Heartwarming moment. Simple but touching scene. High quality.` |
| SC02_09 | scene_amy_ch3_vulnerable.png | Amy 卸下防備的表情 | `Anime style, intimate close-up of a beautiful woman without her glasses, hair slightly messy, looking at the viewer with vulnerable, slightly teary eyes while eating fried chicken. Soft warm lighting from a desk lamp. Genuine emotion breaking through her tough exterior. Beautiful and raw expression. High quality portrait.` |

---

#### 第四章：試車的盡頭是星空
**觸發條件：** 好感度 ≥ 80

**劇情概要：**
Amy 拿到一輛新款敞篷車的試駕鑰匙，邀 4J 晚上開到陽明山。車停在一個可以俯瞰台北夜景的秘密景點，兩人把車頂打開躺在座椅上看星星。Amy 第一次主動分享她的故事——從小被期待要當醫生，卻偷偷愛上了機械和速度。4J 說：「那我們很像，都在走自己選的路。」Amy 側過頭看著他，月光下她的眼睛閃著光。

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC02_10 | scene_amy_ch4_convertible.png | 敞篷車夜景 | `Anime style, a luxury convertible car parked on a mountain overlook at night. Taipei city lights panorama below. A man and woman reclining in the car seats looking up at a starry sky. The car roof is open. Romantic and serene atmosphere. Cool night colors with warm city light glow. Cinematic wide shot. High quality.` |
| SC02_11 | scene_amy_ch4_moonlight.png | 月光下的 Amy | `Anime style, breathtaking portrait of a beautiful woman lying back in a convertible car seat, moonlight illuminating her face. Hair spread out, glasses off, looking sideways with tender eyes. Stars visible above. Her white blouse slightly open at the collar. Ethereal moonlight glow. Deeply romantic atmosphere. Ultra high quality.` |
| SC02_12 | scene_amy_ch4_intimate.png | 親密時刻 | `Anime style, intimate scene inside a convertible under the stars on a mountain. A couple leaning close to each other, faces inches apart. City lights bokeh in the background. The woman's hand on the man's cheek. Starlight and moonlight. Passionate and tender atmosphere. Beautiful color palette of deep blue and warm gold. High quality.` |

---

#### 第五章：並肩馳騁
**觸發條件：** 好感度 100

**劇情概要：**
半年後，Amy 辭職開了自己的改裝車店，4J 用家族工廠的金屬加工技術成為她的合作夥伴。兩人站在新店開幕的招牌下，Amy 把車鑰匙項鍊掛在 4J 脖子上：「這是我們事業的鑰匙，也是我的心。」

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC02_13 | scene_amy_ch5_shop.png | 改裝車店開幕 | `Anime style, a cool custom car garage grand opening. A tall woman and young man standing proudly under a new shop sign. Modified sports cars inside. Industrial chic decor with exposed brick and neon signs. Both wearing matching work jackets. Confident poses. Exciting and triumphant atmosphere. High quality.` |
| SC02_14 | scene_amy_ch5_keychain.png | 鑰匙項鍊 | `Anime style, close-up of a beautiful woman hanging a small car key pendant necklace around a young man's neck. Her hands delicate against his chest. Both smiling warmly. Soft workshop lighting behind them. Symbolic and intimate moment. Warm color tone. High quality detailed illustration.` |
| SC02_15 | scene_amy_ch5_ending_cg.png | 結局CG | `Anime style, ending CG illustration. A couple standing back-to-back leaning on each other in front of a custom sports car, both in racing jackets. City night skyline behind them. The woman has confident smile, the man looks determined. Wind blowing their hair. Dynamic and romantic composition. Ultra high quality poster illustration.` |

---

### ✈️ 角色 3：Yuki (空姐) 劇情線

#### 第一章：三萬英尺的微笑
**觸發條件：** Act_04 旅遊（國際線），機率 25%

**劇情概要：**
4J 第一次搭商務艙出國（用盡積蓄的奢侈），Yuki 是負責他那區的空服員。4J 不會用商務艙的座椅調整按鈕，Yuki 彎下腰幫他調整時，一縷髮絲掃過他的臉頰。她的香水味混著機艙特有的氣息，4J 的心跳漏了一拍。飛行途中 Yuki 特別多來了幾次詢問他是否需要什麼，兩人聊了幾句，4J 發現她的中文帶著一點日文腔調。

**關鍵對話：**
- Yuki（微笑彎腰）：「先生，需要幫您調整座椅嗎？」
- 4J 選項 A：「謝謝...對了，妳的中文說得好好，在台灣長大的嗎？」（好感 +10，開啟對話）
- 4J 選項 B：「妳的香水好好聞...啊不是，我是說謝謝！」（好感 +8，搞笑路線）
- 4J 選項 C：「可以給我妳的 LINE 嗎？」（好感 -5，太急躁）

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC03_01 | scene_yuki_ch1_cabin.png | 商務艙初遇 | `Anime style, inside a luxury airplane business class cabin. A beautiful flight attendant with black hair in an elegant bun, wearing a fitted navy blue uniform, bending down to help a young male passenger adjust his seat. Her hair strand brushing near his face. Soft cabin lighting, warm atmosphere. Detailed airplane interior. High quality.` |
| SC03_02 | scene_yuki_ch1_smile.png | Yuki 的服務微笑 | `Anime style, portrait of a beautiful half-Japanese flight attendant (25yo) with perfect posture, holding a serving tray. Professional warm smile, dark hair in elegant bun with a small pin. Navy blue uniform with silk scarf. Airplane cabin aisle background with soft lighting. Graceful and enchanting presence. High quality.` |
| SC03_03 | scene_yuki_ch1_chat.png | 短暫聊天 | `Anime style, a flight attendant crouching beside a business class passenger's seat, chatting casually. She's resting her chin on her hand on the armrest. Warm cabin night lighting, other passengers sleeping in background. Intimate and quiet conversation moment. Soft blue ambient lighting. High quality.` |

---

#### 第二章：東京轉機的巧遇
**觸發條件：** 好感度 ≥ 25，再次觸發 Act_04

**劇情概要：**
4J 在成田機場轉機，候機室裡巧遇剛下班換了便裝的 Yuki。制服下的她穿著簡約的白色連衣裙，放下的長黑髮讓 4J 幾乎認不出來。Yuki 主動走過來打招呼，兩人一起在機場拉麵店吃了一碗拉麵。Yuki 聊到她的故事——台灣媽媽和日本爸爸離婚後，她選擇當空姐來「在天上尋找屬於自己的地方」。

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC03_04 | scene_yuki_ch2_casual.png | 便裝的 Yuki | `Anime style, a stunning Japanese-Taiwanese girl in a simple white sundress with long straight black hair flowing freely, standing in an airport terminal. Completely different aura from her uniformed self. Carrying a small suitcase. Natural beauty, gentle expression. Modern airport interior with large windows showing airplanes. High quality.` |
| SC03_05 | scene_yuki_ch2_ramen.png | 機場拉麵店 | `Anime style, a young couple sitting at a small Japanese ramen counter in an airport. The girl with long black hair slurping ramen cutely, the boy watching her with a smile. Warm steam rising from bowls. Cozy ramen shop atmosphere with Japanese lanterns. Casual and heartwarming scene. Warm color palette. High quality.` |
| SC03_06 | scene_yuki_ch2_story.png | Yuki 述說身世 | `Anime style, a beautiful girl with long black hair looking out a large airport window at sunset, planes on the tarmac. Her reflection visible in the glass. Melancholic but serene expression. A young man sitting beside her listening attentively. Golden sunset light flooding the terminal. Emotional and cinematic atmosphere. High quality.` |

---

#### 第三章：京都的雨中漫步
**觸發條件：** 好感度 ≥ 55，見識 ≥ 50

**劇情概要：**
Yuki 休假三天，邀 4J 到京都遊玩。嵐山竹林、伏見稻荷，兩人穿著浴衣漫步。在一座小神社前突然下雨，兩人躲在鳥居下。Yuki 閉上眼睛聽雨聲，輕聲說：「和你在一起的時候，我不想飛了。」4J 用浴衣的袖子幫她擋雨，她靠在他肩上。

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC03_07 | scene_yuki_ch3_yukata.png | 浴衣漫步嵐山 | `Anime style, a beautiful couple in traditional Japanese yukata walking through the famous Arashiyama bamboo grove in Kyoto. The girl in a floral light blue yukata with her long black hair partly up, the boy in a dark blue yukata. Sunlight filtering through tall bamboo. Magical and serene Japanese atmosphere. Highly detailed. High quality.` |
| SC03_08 | scene_yuki_ch3_torii.png | 鳥居下躲雨 | `Anime style, a couple sheltering under a small red torii gate at a Japanese shrine during rain. The girl in yukata leaning her head on the boy's shoulder with closed eyes and peaceful smile. Rain pouring around them but they're dry under the gate. Atmospheric rain effects, lush green moss and stone lanterns. Romantic and peaceful. High quality.` |
| SC03_09 | scene_yuki_ch3_sleeve.png | 用袖子擋雨 | `Anime style, close-up of a young man in yukata extending his wide sleeve to shield a beautiful girl from rain. She looks up at him with touched, loving expression. Rain droplets on the fabric. Red torii gate framing them. Intimate and tender moment. Beautiful water and fabric details. Warm emotional lighting. High quality.` |

---

#### 第四章：溫泉旅館的夜
**觸發條件：** 好感度 ≥ 80

**劇情概要：**
京都旅行的最後一晚，兩人入住一間傳統溫泉旅館。泡完湯後穿著旅館浴衣，在房間的榻榻米上喝著冰啤酒看庭院月色。微醺的 Yuki 臉頰泛紅，靠過來說：「4J...今晚不要讓我一個人。」窗外是日式庭園的蟲鳴和流水聲。

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC03_10 | scene_yuki_ch4_onsen.png | 溫泉場景 | `Anime style, a beautiful outdoor Japanese hot spring (onsen) at night. Steam rising from the water. A woman partially submerged, long black hair flowing on the water surface, looking up at the moon. Surrounded by natural rocks and bamboo fence. Snow or cherry blossoms falling. Mystical and sensual atmosphere. Beautiful lighting. High quality.` |
| SC03_11 | scene_yuki_ch4_yukata_room.png | 旅館房間 | `Anime style, traditional Japanese ryokan tatami room at night. A beautiful girl in a loose white yukata robe, slightly flushed cheeks from the hot spring, holding a beer can. Sitting by an open sliding door overlooking a moonlit Japanese garden. Her hair is down and slightly damp. Relaxed and intimate atmosphere. Warm room lighting. High quality.` |
| SC03_12 | scene_yuki_ch4_approach.png | Yuki 靠近 | `Anime style, intimate tatami room scene. A beautiful woman in a loose yukata leaning close to a man, her face flushed pink, eyes half-lidded with emotion. Moonlight through shoji screens casting soft shadows. Japanese garden visible outside. Beer cans on low table. Sensual and tender atmosphere. Warm and cool light contrast. High quality.` |

---

#### 第五章：天空與大地之間
**觸發條件：** 好感度 100

**劇情概要：**
Yuki 決定從國際線轉調國內線，這樣她可以每天回到 4J 身邊。在松山機場，4J 拿著一束白百合等她下班。Yuki 從空橋走出來，看到他的那一刻像個小女孩一樣跑了過來。「我回來了。」「歡迎回來。」

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC03_13 | scene_yuki_ch5_airport.png | 機場接機 | `Anime style, airport arrival gate scene. A young man holding white lilies waiting at the gate. A beautiful flight attendant in uniform running towards him with open arms and the brightest smile. Other passengers and crew watching warmly. Bright airport lighting. Joyful and emotional reunion scene. High quality.` |
| SC03_14 | scene_yuki_ch5_reunion.png | 擁抱重逢 | `Anime style, emotional embrace at an airport. A flight attendant jumping into a young man's arms, her hat flying off, white lilies scattered around them. Both have tears of joy. Motion blur on background passengers. Dynamic and emotional composition. Warm lighting. Beautiful moment frozen in time. High quality.` |
| SC03_15 | scene_yuki_ch5_ending_cg.png | 結局CG | `Anime style, ending CG illustration. A couple watching sunset from an airport observation deck. The woman in flight attendant uniform leaning on the man's shoulder. Planes taking off in the background against a gorgeous orange-purple sky. Their silhouettes framed by the window. Peaceful and romantic. Ultra high quality poster illustration.` |

---

### 👑 角色 4：Rebecca (有錢阿姨) 劇情線

#### 第一章：扶輪社的注目禮
**觸發條件：** Act_05 扶輪社，地位 ≥ 30

**劇情概要：**
4J 好不容易湊齊入會費參加扶輪社例會，穿著唯一一套西裝在五星級飯店宴會廳顯得格格不入。所有人都在談股票和高爾夫，他端著紅酒不知所措。這時一位華貴的女性走過來——Rebecca，她穿著一襲紅色晚禮服，舉手投足間都是上流社會的從容。她遞給 4J 一張名片：「你是新來的？很少看到這麼年輕的面孔。有意思。」

**關鍵對話：**
- Rebecca（搖晃紅酒杯）：「你家是做什麼的？」
- 4J 選項 A：「廚具工廠...很普通吧。」（好感 +5，觸發「我來教你」路線）
- 4J 選項 B：「廚具製造業，目前我在研究如何轉型到餐飲設備的國際市場。」（好感 +20，需見識 ≥ 60）
- 4J 選項 C：「比不上在場各位大老闆啦。」（好感 +0，自卑路線）

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC04_01 | scene_rebecca_ch1_gala.png | 扶輪社宴會廳 | `Anime style, luxurious five-star hotel ballroom gala event. Crystal chandeliers, elegant guests in formal wear. A young man in a simple suit looking out of place among wealthy socialites. A stunning mature woman (38yo) in a red evening gown approaching him with a wine glass. Opulent and intimidating atmosphere. High quality.` |
| SC04_02 | scene_rebecca_ch1_intro.png | Rebecca 遞名片 | `Anime style, a glamorous mature woman in a red evening dress with pearl jewelry, elegantly extending a business card to a nervous young man. Her expression is amused and intrigued. Close-up composition showing the contrast between her luxury and his simplicity. Warm ballroom lighting with chandelier bokeh. High quality.` |
| SC04_03 | scene_rebecca_ch1_wine.png | 紅酒對話 | `Anime style, a sophisticated mature woman with curled shoulder-length hair, swirling a glass of red wine, looking at a young man with a mysterious smile. She's wearing diamond earrings and a red dress. The young man holds his wine glass awkwardly. Intimate conversation at a gala. Warm golden ambient lighting. High quality portrait.` |

---

#### 第二章：貴婦的私人課程
**觸發條件：** 好感度 ≥ 35

**劇情概要：**
Rebecca 以「指導年輕人」為名，邀請 4J 到她的私人會所喝下午茶。在一個有落地窗的 VIP 包廂裡，她教 4J 品酒、餐桌禮儀、商業談判技巧。但她的「教導」越來越親密——調整他的領帶時手指滑過他的脖子，教品酒時臉靠得很近。4J 既緊張又受寵若驚，而 Rebecca 享受著這種獵人與獵物的遊戲。

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC04_04 | scene_rebecca_ch2_lounge.png | 私人會所下午茶 | `Anime style, an ultra-luxurious private lounge with floor-to-ceiling windows overlooking a city skyline. A glamorous mature woman in designer clothes pouring tea for a young man on a velvet sofa. Afternoon sunlight streaming in. Expensive decor, fresh flowers, macarons on the table. Elegant and slightly tense atmosphere. High quality.` |
| SC04_05 | scene_rebecca_ch2_tie.png | 調整領帶 | `Anime style, close-up of a mature elegant woman's manicured hands adjusting a young man's necktie. Her fingers lingering near his collar. She's looking up at him with a knowing smile. His face slightly flushed. Intimate distance between them. Soft luxury interior lighting. Sensual tension in the composition. High quality.` |
| SC04_06 | scene_rebecca_ch2_wine_lesson.png | 品酒教學 | `Anime style, a sophisticated mature woman teaching a young man to taste wine. Their faces very close as she guides his hand holding the glass. Her perfume seems to fill the air. Warm intimate lighting in a private lounge. Wine bottles and crystal glasses on the table. Seductive and educational atmosphere simultaneously. High quality.` |

---

#### 第三章：高爾夫球場的獨處
**觸發條件：** 好感度 ≥ 55，地位 ≥ 50

**劇情概要：**
Rebecca 約 4J 打高爾夫球——當然是私人球場，就他們兩個人加一台球車。Rebecca 穿著貼身的白色 Polo 衫配短裙，教 4J 揮桿時從背後環抱住他「矯正姿勢」。在球場的小木屋休息站，她突然認真了：「4J，你知道我老公已經兩年沒回家了嗎？」第一次看到 Rebecca 眼神裡不是遊戲，而是真實的寂寞。

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC04_07 | scene_rebecca_ch3_golf.png | 高爾夫球場 | `Anime style, a private golf course on a sunny day. A glamorous mature woman in a white polo shirt and short golf skirt standing behind a young man, arms around him to correct his golf swing. Her body pressed against his back. Green manicured fairway, luxury golf cart nearby. Playful and flirtatious atmosphere. High quality.` |
| SC04_08 | scene_rebecca_ch3_cart.png | 球車上的對話 | `Anime style, two people sitting in a luxury golf cart on a beautiful course. A mature elegant woman looking distant and vulnerable, her playful mask dropped. The young man listening with genuine concern. Afternoon light casting long shadows on the green. A moment of real emotion. Contemplative atmosphere. High quality.` |
| SC04_09 | scene_rebecca_ch3_lonely.png | Rebecca 的寂寞 | `Anime style, portrait of a beautiful mature woman (38yo) sitting alone on a golf course bench, looking at her diamond wedding ring with a sad expression. Curled hair slightly windswept. Luxury watch and jewelry contrasting with her lonely demeanor. Gorgeous sunset behind rolling green hills. Bittersweet and melancholic. High quality.` |

---

#### 第四章：豪宅的秘密花園
**觸發條件：** 好感度 ≥ 75

**劇情概要：**
一個雨夜，Rebecca 傳訊息：「我一個人在家，你能來嗎？」4J 來到她在陽明山的豪宅，才發現偌大的房子空蕩蕩只有她一個人。Rebecca 脫下了平時的鎧甲——沒有名牌、沒有珠寶，只穿著一件絲質睡袍。她在私人泳池邊對 4J 說：「在這些人面前，只有你把我當一個人看，不是一張信用卡。」

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC04_10 | scene_rebecca_ch4_mansion.png | 豪宅夜景 | `Anime style, a stunning hillside mansion at night in the rain. Floor-to-ceiling windows glowing with warm interior light. A luxury car pulling up to the entrance. Dramatic rain and lightning. Mysterious and atmospheric scene. High quality architectural illustration.` |
| SC04_11 | scene_rebecca_ch4_robe.png | 絲質睡袍的 Rebecca | `Anime style, a beautiful mature woman in a silk robe standing by an indoor infinity pool in a luxury mansion. Her hair is down and natural, no jewelry. Vulnerable and real. Blue pool light reflecting on her face. Floor-to-ceiling windows showing rainy night city lights. Intimate and raw beauty. High quality.` |
| SC04_12 | scene_rebecca_ch4_pool.png | 泳池邊的真心話 | `Anime style, two people sitting at the edge of a luxury indoor pool in a mansion, feet in the water. A mature woman in a silk robe looking at a young man with genuine emotion, her usual confident facade completely gone. Blue-green pool reflections dancing on the ceiling. Rain on the windows. Deeply intimate and emotional scene. High quality.` |

---

#### 第五章：新的天地
**觸發條件：** 好感度 ≥ 90

**劇情概要：**
Rebecca 簽下離婚協議書，帶著 4J 飛往巴黎。在塞納河畔的咖啡店，她說：「我這半輩子活在別人的期待裡。謝謝你讓我知道，重新開始永遠不嫌晚。」她拿出一份投資計畫書——用她的資金加 4J 家族的製造技術，一起在歐洲打造台灣精品廚具品牌。兩人在艾菲爾鐵塔下擁吻。

**場景圖片需求：**

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| SC04_13 | scene_rebecca_ch5_paris.png | 巴黎咖啡店 | `Anime style, a charming Parisian sidewalk cafe by the Seine River. A glamorous mature woman and a young man sitting at a small table with espresso. She's showing him a business plan. Eiffel Tower visible in the distance. Autumn leaves falling. Sophisticated and hopeful atmosphere. Beautiful European cityscape. High quality.` |
| SC04_14 | scene_rebecca_ch5_eiffel.png | 鐵塔下的擁吻 | `Anime style, romantic scene of a couple kissing under the Eiffel Tower at golden hour. The mature elegant woman in a chic coat, the young man in a nice jacket. Autumn Parisian atmosphere. Warm golden sunset light. Fallen leaves swirling around them. Cinematic wide shot with the tower framing them. Breathtaking and romantic. High quality.` |
| SC04_15 | scene_rebecca_ch5_ending_cg.png | 結局CG | `Anime style, ending CG illustration. A confident couple standing in front of their new elegant kitchenware boutique in Paris with a bilingual Chinese-French sign. The woman in a chic business outfit, the man in a tailored suit. Both looking at the viewer with confident smiles. Parisian architecture background. Success and love. Ultra high quality poster illustration.` |

---

## 六、UI 界面圖片需求

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| UI_01 | ui_title_screen.png | 遊戲標題畫面 | `Anime style game title screen. "小小4J長大了" in stylish Chinese calligraphy with neon glow effect. A young man's silhouette in the center with four female silhouettes around him. Taipei city skyline at sunset in background. Cherry blossom petals falling. Modern and romantic game aesthetic. 16:9 aspect ratio. High quality.` |
| UI_02 | ui_main_hub.png | 主畫面/每日行動選擇 | `Anime style game UI background. A cozy Taipei apartment room with a desk, calendar on wall, and window showing city view. Five action icons should fit on screen. Warm morning lighting. Clean modern anime interior design. 16:9 aspect ratio. High quality.` |
| UI_03 | ui_status_panel.png | 角色狀態面板背景 | `Anime style UI panel background. Semi-transparent dark gradient panel with gold border ornaments. Space for character portrait, stats bars, and text. Elegant and modern game UI design. Clean and readable. High quality.` |
| UI_04 | ui_dialogue_box.png | 對話框 | `Anime style visual novel dialogue box. Semi-transparent dark panel at bottom of screen with rounded corners and subtle glow border. Name tag area on upper left. Clean, modern visual novel UI design. 16:9 aspect ratio reference. High quality.` |
| UI_05 | ui_map_taipei.png | 台北地圖選擇畫面 | `Anime style illustrated map of Taipei city from above. Key locations marked: Nangang Exhibition Hall, BMW dealership, Songshan Airport, Grand Hotel for Rotary Club. Cute chibi-style map with vibrant colors. Isometric view. Game UI map design. High quality.` |

---

## 七、角色立繪需求

| 圖片ID | 檔案名稱 | 描述 | Gemini 提示詞 |
|--------|----------|------|--------------|
| CH_01a | char_kaoru_normal.png | 小薰 - 展場制服（普通） | `Anime style, full body character portrait on transparent background. A cute 22-year-old girl with long wavy brown hair, wearing a tight red exhibition showgirl uniform with a sponsor belt. Sweet smile, standing pose with hand on hip. Clear lineart, game character design. High quality.` |
| CH_01b | char_kaoru_casual.png | 小薰 - 便裝 | `Anime style, full body character portrait on transparent background. A cute 22-year-old girl with long wavy brown hair, wearing a floral sundress and white sneakers. Cheerful expression, casual standing pose. Clear lineart, game character design. High quality.` |
| CH_01c | char_kaoru_apron.png | 小薰 - 花店圍裙 | `Anime style, full body character portrait on transparent background. A cute 22-year-old girl with long wavy brown hair, wearing a cute floral apron over casual clothes, holding a small flower bouquet. Warm happy smile. Clear lineart, game character design. High quality.` |
| CH_02a | char_amy_suit.png | Amy - 套裝（普通） | `Anime style, full body character portrait on transparent background. A tall professional 27-year-old woman with short brown hair in ponytail, wearing a fitted black business suit, glasses, and high heels. Confident pose with arms crossed. Clear lineart, game character design. High quality.` |
| CH_02b | char_amy_racing.png | Amy - 賽車服 | `Anime style, full body character portrait on transparent background. A tall 27-year-old woman in a white and red racing suit, unzipped to waist showing tank top. Ponytail, no glasses, confident grin, holding a racing helmet. Clear lineart, game character design. High quality.` |
| CH_02c | char_amy_casual.png | Amy - 便裝 | `Anime style, full body character portrait on transparent background. A tall 27-year-old woman in a casual leather jacket, jeans, and boots. Hair down, no glasses. Cool and relaxed pose leaning slightly. Clear lineart, game character design. High quality.` |
| CH_03a | char_yuki_uniform.png | Yuki - 空姐制服 | `Anime style, full body character portrait on transparent background. A beautiful 25-year-old half-Japanese woman with long straight black hair in elegant bun, wearing a navy blue flight attendant uniform with silk scarf, hat, and heels. Graceful standing pose. Clear lineart, game character design. High quality.` |
| CH_03b | char_yuki_casual.png | Yuki - 便裝 | `Anime style, full body character portrait on transparent background. A beautiful 25-year-old half-Japanese woman with long flowing straight black hair, wearing a simple white sundress. Gentle and ethereal expression. Clear lineart, game character design. High quality.` |
| CH_03c | char_yuki_yukata.png | Yuki - 浴衣 | `Anime style, full body character portrait on transparent background. A beautiful 25-year-old half-Japanese woman with long black hair in a loose updo with hair pins, wearing a light blue floral yukata. Elegant and traditional pose. Clear lineart, game character design. High quality.` |
| CH_04a | char_rebecca_gala.png | Rebecca - 晚禮服 | `Anime style, full body character portrait on transparent background. A glamorous 38-year-old mature woman with curled shoulder-length dark hair, wearing a red evening gown with pearl necklace and diamond earrings. Confident and alluring pose holding a wine glass. Clear lineart, game character design. High quality.` |
| CH_04b | char_rebecca_golf.png | Rebecca - 高爾夫裝 | `Anime style, full body character portrait on transparent background. A beautiful 38-year-old mature woman in a white polo shirt, short golf skirt, and visor hat. Curled hair in a ponytail. Playful sporty pose with a golf club. Clear lineart, game character design. High quality.` |
| CH_04c | char_rebecca_robe.png | Rebecca - 居家絲袍 | `Anime style, full body character portrait on transparent background. A beautiful 38-year-old mature woman in an elegant silk robe, hair down naturally, no makeup or jewelry. Vulnerable but still beautiful. Relaxed standing pose. Clear lineart, game character design. High quality.` |
| CH_00 | char_4j_protagonist.png | 4J 主角立繪 | `Anime style, full body character portrait on transparent background. A young 22-year-old Taiwanese man with short black hair, average build, wearing a simple T-shirt and jeans. Friendly and determined expression. Everyman appearance that players can relate to. Clear lineart, game character design. High quality.` |

---

## 八、圖片檔案命名規則

```
格式：{類型}_{角色}_{章節}_{場景描述}.png

類型前綴：
  scene_  = 劇情場景 CG
  char_   = 角色立繪
  ui_     = UI 介面元素
  bg_     = 背景圖
  item_   = 道具/物品圖

角色代碼：
  kaoru    = 小薰 (車展女孩)
  amy      = Amy (汽車女銷售)
  yuki     = Yuki (空姐)
  rebecca  = Rebecca (有錢阿姨)
  4j       = 主角

章節標記：
  ch1 ~ ch5 = 各角色劇情第 1~5 章
```

---

## 九、音樂/音效建議

| ID | 檔案名稱 | 用途 | 風格 |
|----|----------|------|------|
| BGM_01 | bgm_daily.mp3 | 日常主畫面 | 輕鬆明快的吉他流行 |
| BGM_02 | bgm_romantic.mp3 | 約會/告白場景 | 鋼琴抒情配弦樂 |
| BGM_03 | bgm_tension.mp3 | 衝突/困境場景 | 低沉弦樂加鼓點 |
| BGM_04 | bgm_intimate.mp3 | 親密場景 | 慵懶爵士薩克斯風 |
| BGM_05 | bgm_ending.mp3 | 結局 CG | 壯闊管弦配鋼琴 |
| BGM_06 | bgm_gala.mp3 | 扶輪社/高端場景 | 古典交響華爾茲 |
| BGM_07 | bgm_racing.mp3 | 賽車場景 | 電子搖滾高節奏 |
| BGM_08 | bgm_japan.mp3 | 京都/日本場景 | 三味線配鋼琴 |
| SE_01 | se_heartbeat.mp3 | 心跳加速 | 低頻心跳聲漸快 |
| SE_02 | se_rain.mp3 | 雨聲 | 環境音效 |
| SE_03 | se_airplane.mp3 | 飛機引擎 | 環境音效 |

---

## 十、開發技術建議

```
推薦框架：Ren'Py (Python) 或 Web (HTML5 + JavaScript)
  - Ren'Py：最適合視覺小說，內建對話系統、存檔、好感度管理
  - Web：用 Phaser.js 或 PixiJS 配合自製對話引擎

資料管理：
  - 角色數據/劇情分支 → JSON 格式管理
  - 好感度/屬性 → LocalStorage 或 SQLite

圖片規格：
  - 場景 CG：1920 x 1080 px (16:9)
  - 角色立繪：1080 x 1920 px (直式，去背)
  - UI 元素：依版面需求
  - 格式：PNG (去背素材) / WebP (場景壓縮)
```

---

## 十一、圖片資產清單總覽

| 類型 | 數量 |
|------|------|
| 劇情場景 CG (4角色 × 每角色約15張) | 60 張 |
| 角色立繪 (4女角 × 3套裝 + 主角) | 13 張 |
| UI 介面圖 | 5 張 |
| 背景圖 (場景共用) | 約 15 張 |
| **總計** | **約 93 張** |
