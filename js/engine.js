/* === Game Engine === */
const GameEngine = {
  state: null,
  vnQueue: [],
  vnIndex: 0,
  waitingForClick: false,
  currentRoute: null,

  init() {
    UI.init();
    // VN click handler
    document.getElementById('vn-dialogue').addEventListener('click', (e) => {
      if (e.target.closest('.vn-choice-btn')) return;
      this.onVNClick();
    });
  },

  // === New Game ===
  newGame() {
    this.state = SaveSystem.getDefault();
    UI.showScreen('hub');
    UI.updateHub(this.state);
  },

  // === Load / Save ===
  loadGame() {
    const s = SaveSystem.load();
    if (s) {
      this.state = s;
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
    UI.showScreen('title');
    if (SaveSystem.hasSave()) {
      document.getElementById('btn-continue').style.display = '';
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

    switch (actionKey) {
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
        if (s.stamina < 20) { UI.showResultPopup('體力不足', [{ text: '需要至少 20 體力', type: 'result-loss' }]); return; }
        s.stamina -= 20;
        const earn = 8000 + Math.floor(Math.random() * 7001);
        s.money += earn;
        results.push({ text: '體力 -20', type: 'result-loss' });
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
        s.money -= cost; s.stamina = 100;
        s.insight = Math.min(100, s.insight + 10);
        results.push({ text: `金錢 -${cost.toLocaleString()}`, type: 'result-loss' });
        results.push({ text: '體力回滿！', type: 'result-gain' });
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
    if (chProgress >= 5) return false;

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
  startChapter(charKey, chapterIndex) {
    this.currentRoute = charKey;
    const chapter = StoryData.routes[charKey][chapterIndex];
    this.vnQueue = chapter.scenes;
    this.vnIndex = 0;

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
        if (chosen.effect) {
          if (chosen.effect.affection && this.currentRoute) {
            this.state.affection[this.currentRoute] = Math.min(100,
              Math.max(0, this.state.affection[this.currentRoute] + chosen.effect.affection));
          }
        }
        this.vnIndex++;
        this.processNextScene();
        break;

      case 'ending':
        // Mark chapter complete
        this.state.chapterProgress[this.currentRoute] = 5;
        if (!this.state.completedEndings.includes(this.currentRoute)) {
          this.state.completedEndings.push(this.currentRoute);
        }
        SaveSystem.save(this.state);
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
    // Advance chapter progress
    const charKey = this.currentRoute;
    if (this.state.chapterProgress[charKey] < 5) {
      this.state.chapterProgress[charKey]++;
    }
    SaveSystem.save(this.state);
    UI.hideCG();
    UI.showScreen('hub');
    UI.updateHub(this.state);
  },
};

// === Global game reference ===
const game = GameEngine;

// === Init on load ===
window.addEventListener('DOMContentLoaded', () => {
  game.init();
});
