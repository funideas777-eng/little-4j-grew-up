/* === Save System === */
const SaveSystem = {
  KEY: 'little4j_save',
  UNLOCK_KEY: 'little4j_unlocks',

  getDefault() {
    return {
      day: 1,
      stamina: 100,
      money: 50000,
      charm: 0,
      insight: 0,
      status: 0,
      monthlyIncome: 22000,
      affection: { kaoru: 0, amy: 0, yuki: 0, rebecca: 0 },
      metChars: { kaoru: false, amy: false, yuki: false, rebecca: false },
      chapterProgress: { kaoru: 0, amy: 0, yuki: 0, rebecca: 0 },
      completedEndings: [],
      playerName: '4J',
      currentRoute: null,
      currentChapter: 0,
      currentDialogueIndex: 0,
    };
  },

  save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
      return true;
    } catch (e) { return false; }
  },

  load() {
    try {
      const d = localStorage.getItem(this.KEY);
      return d ? JSON.parse(d) : null;
    } catch (e) { return null; }
  },

  hasSave() {
    return !!localStorage.getItem(this.KEY);
  },

  clear() {
    localStorage.removeItem(this.KEY);
  },

  // === Character Unlock System (persists across new games) ===
  getUnlocks() {
    try {
      const d = localStorage.getItem(this.UNLOCK_KEY);
      const unlocks = d ? JSON.parse(d) : {};
      // Yuki is always free
      unlocks.yuki = true;
      return unlocks;
    } catch (e) {
      return { yuki: true };
    }
  },

  isUnlocked(charKey) {
    if (charKey === 'yuki') return true;
    const unlocks = this.getUnlocks();
    return !!unlocks[charKey];
  },

  setUnlock(charKey) {
    try {
      const unlocks = this.getUnlocks();
      unlocks[charKey] = true;
      localStorage.setItem(this.UNLOCK_KEY, JSON.stringify(unlocks));
      return true;
    } catch (e) { return false; }
  },
};
