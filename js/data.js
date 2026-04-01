/* === Story Data - 完整劇情資料 === */
const StoryData = {
  characters: {
    kaoru: { name: '小薰', fullName: '林小薰', color: '#ffb0d0' },
    amy: { name: 'Amy', fullName: '陳思婷', color: '#a0c0ff' },
    yuki: { name: 'Yuki', fullName: '佐藤由紀', color: '#c8a0ff' },
    rebecca: { name: 'Rebecca', fullName: '王瑞貝卡', color: '#ffa0a0' },
  },

  // Action trigger mapping
  actionTriggers: {
    work: { char: 'kaoru', chance: 0.15 },
    cars: { char: 'amy', chance: 0.20 },
    travel: { char: 'yuki', chance: 0.25 },
    rotary: { char: 'rebecca', chance: 1.0 },
  },

  // Chapter unlock thresholds
  chapterThresholds: {
    kaoru: [0, 30, 60, 80, 100],
    amy: [0, 30, 55, 80, 100],
    yuki: [0, 25, 55, 80, 100],
    rebecca: [0, 35, 55, 75, 90],
  },

  routes: {
    // ============================================
    // KAORU - 小薰 (車展女孩)
    // ============================================
    kaoru: [
      // Chapter 1: 命運的展場相遇
      {
        title: '命運的展場相遇',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch1_meet.png', description: '展場碰撞瞬間' },
          { type: 'dialogue', speaker: '', text: '在台北南港展覽館擔任臨時工的你，扛著重物轉過一個角落——' },
          { type: 'dialogue', speaker: '', text: '砰！撞上了正在補妝的 Show Girl，粉底液灑了一地。' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch1_wipe.png', description: '4J用衣服幫她擦' },
          { type: 'dialogue', speaker: '', text: '你手忙腳亂地用自己的 T-shirt 下擺幫她擦...' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch1_laugh.png', description: '小薰笑出來' },
          { type: 'dialogue', speaker: '小薰', text: '你是白痴嗎？用衣服擦？！...不過，還滿可愛的啦。' },
          {
            type: 'choice',
            choices: [
              { text: '抱歉！我去幫你買新的！', effect: { affection: 10 } },
              { text: '能讓這麼漂亮的人笑出來，弄髒衣服也值得。', effect: { affection: 15 }, require: { charm: 20 } },
              { text: '......', effect: { affection: 3 } },
            ]
          },
          { type: 'dialogue', speaker: '小薰', text: '嗯...你叫什麼名字？下次別再這麼冒失了啦。' },
          { type: 'dialogue', speaker: '', text: '你和小薰交換了聯絡方式。第一次遇見她——車展中最耀眼的女孩。' },
        ]
      },
      // Chapter 2: 休息室的秘密
      {
        title: '休息室的秘密',
        scenes: [
          { type: 'dialogue', speaker: '', text: '車展第三天，你又被派到同一個場館。午休時間偷溜到後台找小薰...' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch2_cry.png', description: '小薰在道具間哭泣' },
          { type: 'dialogue', speaker: '', text: '你發現她一個人躲在道具間哭。攝影師對她毛手毛腳，她反抗後被威脅要在業界封殺。' },
          { type: 'dialogue', speaker: '小薰', text: '每次都這樣...他們只看到我的身體，沒人在乎我在想什麼...' },
          {
            type: 'choice',
            choices: [
              { text: '走，跟我去找主辦方。妳不用一個人扛。', effect: { affection: 20 } },
              { text: '我可以幫妳揍他。', effect: { affection: 10 } },
              { text: '要不...妳就別做這行了？', effect: { affection: -10 } },
            ]
          },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch2_hand.png', description: '4J拉起她的手' },
          { type: 'dialogue', speaker: '', text: '你二話不說拉著她的手，態度堅定地走出去。' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch2_resolve.png', description: '兩人一起去找主辦方' },
          { type: 'dialogue', speaker: '小薰', text: '謝謝你...你是第一個認真站出來幫我的人。' },
          { type: 'dialogue', speaker: '', text: '小薰第一次對你卸下心防。' },
        ]
      },
      // Chapter 3: 日落的淡水告白
      {
        title: '日落的淡水告白',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch3_tamsui.png', description: '淡水老街約會' },
          { type: 'dialogue', speaker: '', text: '你們騎機車到淡水老街約會，吃著阿給和魚酥。' },
          { type: 'dialogue', speaker: '小薰', text: '我其實是單親家庭長大的...做 Show Girl 是為了存錢讓媽媽開一間小花店。' },
          { type: 'dialogue', speaker: '', text: '你被觸動了——你也是被父親期望著要獨立的人。' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch3_sunset.png', description: '漁人碼頭日落告白' },
          { type: 'dialogue', speaker: '', text: '日落時分，漁人碼頭。海風吹起小薰的長髮，你鼓起勇氣...' },
          { type: 'dialogue', speaker: '4J', text: '小薰...我知道我現在什麼都不是，只是一個在展場搬箱子的傢伙。但我想認真對待妳。' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch3_blush.png', description: '小薰害羞接受' },
          { type: 'dialogue', speaker: '小薰', text: '你真的很笨耶...但是...我也想被這樣的笨蛋認真對待。' },
          { type: 'dialogue', speaker: '', text: '夕陽下，你們成為了戀人。' },
        ]
      },
      // Chapter 4: 雨夜的心跳加速
      {
        title: '雨夜的心跳加速',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch4_rain.png', description: '雨中奔跑' },
          { type: 'dialogue', speaker: '', text: '約會回程遇上暴雨，你們狼狽地躲進你的小套房。' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch4_tshirt.png', description: '小薰穿著大T-shirt' },
          { type: 'dialogue', speaker: '', text: '小薰從浴室出來穿著你過大的 T-shirt，空氣中的氣氛突然改變了...' },
          { type: 'dialogue', speaker: '小薰', text: '...你的衣服好大件...但好溫暖。' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch4_gaze.png', description: '兩人在床邊對望' },
          {
            type: 'choice',
            choices: [
              { text: '那以後...妳的溫暖就讓我來守護。', effect: { affection: 20 } },
              { text: '妳先睡床，我睡地板。', effect: { affection: 5 } },
            ]
          },
          { type: 'dialogue', speaker: '', text: '窗外的雨聲，成了這個夜晚唯一的背景音樂。' },
        ]
      },
      // Chapter 5: 我的花店與妳
      {
        title: '我的花店與妳',
        scenes: [
          { type: 'dialogue', speaker: '', text: '一年後——你用存下的錢和家裡工廠的人脈，幫小薰的媽媽圓了花店夢。' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch5_shop.png', description: '花店開幕日' },
          { type: 'dialogue', speaker: '', text: '開幕那天，小薰穿著花店圍裙，眼裡含著淚水。' },
          { type: 'cg', image: 'assets/images/scene_kaoru/scene_kaoru_ch5_embrace.png', description: '花香中的擁抱' },
          { type: 'dialogue', speaker: '小薰', text: '謝謝你...看見真正的我。' },
          { type: 'ending', image: 'assets/images/scene_kaoru/scene_kaoru_ch5_ending_cg.png',
            title: '🌸 花與你的未來', text: '你和小薰在花香中擁吻。\n從展場的偶遇，到花店的相守。\n這就是你們的故事。' },
        ]
      },
    ],

    // ============================================
    // AMY - 汽車女銷售
    // ============================================
    amy: [
      // Chapter 1: 展示間的女王
      {
        title: '展示間的女王',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch1_showroom.png', description: '展示間初遇' },
          { type: 'dialogue', speaker: '', text: '你走進 BMW 展示間，只是想過過眼癮。' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch1_explain.png', description: 'Amy專業介紹' },
          { type: 'dialogue', speaker: 'Amy', text: '先生您好，請問您今天想了解哪款車型？' },
          { type: 'dialogue', speaker: '', text: '她一眼就看出你「只是來看看的」，但專業地沒有怠慢。' },
          {
            type: 'choice',
            choices: [
              { text: '其實我只是來看看的，但妳介紹得太專業了。', effect: { affection: 10 } },
              { text: '比起車，我對妳更有興趣。', effect: { affection: -15 } },
              { text: '我想了解一下 M3 的渦輪配置。', effect: { affection: 15 }, require: { insight: 40 } },
            ]
          },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch1_cold.png', description: 'Amy的距離感' },
          { type: 'dialogue', speaker: '', text: 'Amy 的眼神始終帶著距離感——她見過太多只想搭訕的男客人。' },
          { type: 'dialogue', speaker: 'Amy', text: '歡迎下次再來。這是我的名片。' },
        ]
      },
      // Chapter 2: 賽道上的真面目
      {
        title: '賽道上的真面目',
        scenes: [
          { type: 'dialogue', speaker: 'Amy', text: '週末有個 VIP 試駕活動，你要來嗎？' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch2_racesuit.png', description: 'Amy換上賽車服' },
          { type: 'dialogue', speaker: '', text: '在大鵬灣賽車場，西裝革履的 Amy 突然換上了賽車服——原來她是業餘賽車手！' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch2_driving.png', description: '賽道狂飆' },
          { type: 'dialogue', speaker: '', text: '她載著你在賽道上飆到 200km/h，你嚇得臉色發白卻又興奮不已！' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch2_smile.png', description: 'Amy的真心笑容' },
          { type: 'dialogue', speaker: 'Amy', text: '下班後的我跟上班完全不同喔。還受得了嗎？' },
          {
            type: 'choice',
            choices: [
              { text: '受得了！下次我來開，換妳在副駕嚇得尖叫！', effect: { affection: 20 } },
              { text: '妳認真開車的樣子...超帥的。', effect: { affection: 15 } },
            ]
          },
          { type: 'dialogue', speaker: '', text: '第一次看到 Amy 不是營業用的笑容。' },
        ]
      },
      // Chapter 3: 深夜加班的脆弱
      {
        title: '深夜加班的脆弱',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch3_overtime.png', description: '深夜獨自加班' },
          { type: 'dialogue', speaker: '', text: '深夜路過展示間，看到裡面還亮著燈。Amy 一個人坐在辦公室裡。' },
          { type: 'dialogue', speaker: '', text: '這個月她業績墊底——因為拒絕了總經理「陪客戶應酬」的要求。' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch3_comfort.png', description: '4J帶宵夜來' },
          { type: 'dialogue', speaker: '', text: '你默默買了雞排和珍奶過去陪她。' },
          { type: 'dialogue', speaker: 'Amy', text: '你知道嗎，這個行業...女生要賣車，不是只賣車。' },
          { type: 'dialogue', speaker: '4J', text: '那就用實力讓他們閉嘴。妳比任何人都專業。' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch3_vulnerable.png', description: 'Amy卸下防備' },
          { type: 'dialogue', speaker: 'Amy', text: '...謝了，雞排還不錯。' },
          { type: 'dialogue', speaker: '', text: '第一次看到 Amy 脫下套裝外套、拿掉眼鏡的疲憊模樣。' },
        ]
      },
      // Chapter 4: 試車的盡頭是星空
      {
        title: '試車的盡頭是星空',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch4_convertible.png', description: '敞篷車夜景' },
          { type: 'dialogue', speaker: '', text: 'Amy 拿到新款敞篷車的試駕鑰匙，邀你晚上開到陽明山。' },
          { type: 'dialogue', speaker: '', text: '車停在可以俯瞰台北夜景的秘密景點，兩人把車頂打開躺著看星星。' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch4_moonlight.png', description: '月光下的Amy' },
          { type: 'dialogue', speaker: 'Amy', text: '我從小被期待要當醫生，卻偷偷愛上了機械和速度。' },
          { type: 'dialogue', speaker: '4J', text: '那我們很像，都在走自己選的路。' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch4_intimate.png', description: '親密時刻' },
          {
            type: 'choice',
            choices: [
              { text: '（握住她的手）這條路，一起走。', effect: { affection: 20 } },
              { text: '（靜靜看著她）...妳眼睛裡有星星。', effect: { affection: 15 } },
            ]
          },
          { type: 'dialogue', speaker: '', text: '月光下，Amy 側過頭看著你，眼睛閃著光。' },
        ]
      },
      // Chapter 5: 並肩馳騁
      {
        title: '並肩馳騁',
        scenes: [
          { type: 'dialogue', speaker: '', text: '半年後——Amy 辭職開了自己的改裝車店。' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch5_shop.png', description: '改裝車店開幕' },
          { type: 'dialogue', speaker: '', text: '你用家族工廠的金屬加工技術成為她的合作夥伴。' },
          { type: 'cg', image: 'assets/images/scene_amy/scene_amy_ch5_keychain.png', description: '鑰匙項鍊' },
          { type: 'dialogue', speaker: 'Amy', text: '這是我們事業的鑰匙，也是我的心。' },
          { type: 'ending', image: 'assets/images/scene_amy/scene_amy_ch5_ending_cg.png',
            title: '🏎️ 並肩馳騁', text: 'Amy 把車鑰匙項鍊掛在你脖子上。\n從展示間的距離感，到並肩創業。\n引擎聲中，是你們的未來。' },
        ]
      },
    ],

    // ============================================
    // YUKI - 空姐
    // ============================================
    yuki: [
      // Chapter 1: 三萬英尺的微笑
      {
        title: '三萬英尺的微笑',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch1_cabin.png', description: '商務艙初遇' },
          { type: 'dialogue', speaker: '', text: '你第一次搭商務艙出國，Yuki 是負責你那區的空服員。' },
          { type: 'dialogue', speaker: '', text: '你不會用商務艙的座椅調整按鈕，Yuki 彎下腰幫你調整時，一縷髮絲掃過你的臉頰。' },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch1_smile.png', description: 'Yuki的服務微笑' },
          { type: 'dialogue', speaker: 'Yuki', text: '先生，需要幫您調整座椅嗎？' },
          {
            type: 'choice',
            choices: [
              { text: '謝謝...對了，妳的中文說得好好，在台灣長大的嗎？', effect: { affection: 10 } },
              { text: '妳的香水好好聞...啊不是，我是說謝謝！', effect: { affection: 8 } },
              { text: '可以給我妳的 LINE 嗎？', effect: { affection: -5 } },
            ]
          },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch1_chat.png', description: '短暫聊天' },
          { type: 'dialogue', speaker: 'Yuki', text: '我媽媽是台灣人，爸爸是日本人。所以中文有一點點腔調呢。' },
          { type: 'dialogue', speaker: '', text: '飛行途中 Yuki 特別多來了幾次。你的心跳漏了一拍。' },
        ]
      },
      // Chapter 2: 東京轉機的巧遇
      {
        title: '東京轉機的巧遇',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch2_casual.png', description: '便裝的Yuki' },
          { type: 'dialogue', speaker: '', text: '成田機場轉機，候機室裡巧遇剛下班換了便裝的 Yuki。' },
          { type: 'dialogue', speaker: '', text: '制服下的她穿著簡約的白色連衣裙，放下的長黑髮讓你幾乎認不出來。' },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch2_ramen.png', description: '機場拉麵店' },
          { type: 'dialogue', speaker: '', text: '兩人一起在機場拉麵店吃了一碗拉麵。' },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch2_story.png', description: 'Yuki述說身世' },
          { type: 'dialogue', speaker: 'Yuki', text: '爸爸媽媽離婚後...我選擇當空姐，在天上尋找屬於自己的地方。' },
          { type: 'dialogue', speaker: 'Yuki', text: '不屬於台灣，也不完全屬於日本...但在飛機上，我哪裡都可以去。' },
          { type: 'dialogue', speaker: '', text: 'Yuki 看著窗外的飛機，眼神中帶著溫柔的寂寞。' },
        ]
      },
      // Chapter 3: 京都的雨中漫步
      {
        title: '京都的雨中漫步',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch3_yukata.png', description: '浴衣漫步嵐山' },
          { type: 'dialogue', speaker: '', text: 'Yuki 休假三天，邀你到京都遊玩。嵐山竹林，穿著浴衣漫步。' },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch3_torii.png', description: '鳥居下躲雨' },
          { type: 'dialogue', speaker: '', text: '在一座小神社前突然下雨，你們躲在鳥居下。' },
          { type: 'dialogue', speaker: 'Yuki', text: '和你在一起的時候，我不想飛了。' },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch3_sleeve.png', description: '用袖子擋雨' },
          {
            type: 'choice',
            choices: [
              { text: '（用浴衣袖子幫她擋雨）那就停下來，在我身邊。', effect: { affection: 20 } },
              { text: '京都的雨也很美...因為有妳在。', effect: { affection: 15 } },
            ]
          },
          { type: 'dialogue', speaker: '', text: '她靠在你肩上，雨聲成了最好的背景音樂。' },
        ]
      },
      // Chapter 4: 溫泉旅館的夜
      {
        title: '溫泉旅館的夜',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch4_onsen.png', description: '溫泉場景' },
          { type: 'dialogue', speaker: '', text: '京都旅行最後一晚，兩人入住傳統溫泉旅館。' },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch4_yukata_room.png', description: '旅館房間' },
          { type: 'dialogue', speaker: '', text: '泡完湯，在榻榻米上喝著冰啤酒看庭院月色。' },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch4_approach.png', description: 'Yuki靠近' },
          { type: 'dialogue', speaker: 'Yuki', text: '4J...今晚不要讓我一個人。' },
          {
            type: 'choice',
            choices: [
              { text: '（輕輕握住她的手）我在這裡。', effect: { affection: 20 } },
              { text: '（為她披上外套）今晚，明天，以後都是。', effect: { affection: 15 } },
            ]
          },
          { type: 'dialogue', speaker: '', text: '窗外是日式庭園的蟲鳴和流水聲...' },
        ]
      },
      // Chapter 5: 天空與大地之間
      {
        title: '天空與大地之間',
        scenes: [
          { type: 'dialogue', speaker: '', text: 'Yuki 決定從國際線轉調國內線，這樣她可以每天回到你身邊。' },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch5_airport.png', description: '機場接機' },
          { type: 'dialogue', speaker: '', text: '松山機場，你拿著一束白百合等她下班。' },
          { type: 'cg', image: 'assets/images/scene_yuki/scene_yuki_ch5_reunion.png', description: '擁抱重逢' },
          { type: 'dialogue', speaker: 'Yuki', text: '我回來了。' },
          { type: 'dialogue', speaker: '4J', text: '歡迎回來。' },
          { type: 'ending', image: 'assets/images/scene_yuki/scene_yuki_ch5_ending_cg.png',
            title: '✈️ 天空與大地之間', text: 'Yuki 從空橋走出來的那一刻，像個小女孩一樣跑了過來。\n天空是她的翅膀，而你是她的家。\n再也不用一個人飛翔。' },
        ]
      },
    ],

    // ============================================
    // REBECCA - 有錢阿姨
    // ============================================
    rebecca: [
      // Chapter 1: 扶輪社的注目禮
      {
        title: '扶輪社的注目禮',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch1_gala.png', description: '扶輪社宴會廳' },
          { type: 'dialogue', speaker: '', text: '你穿著唯一一套西裝在五星級飯店宴會廳，格格不入。所有人都在談股票和高爾夫。' },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch1_intro.png', description: 'Rebecca遞名片' },
          { type: 'dialogue', speaker: 'Rebecca', text: '你是新來的？很少看到這麼年輕的面孔。有意思。' },
          { type: 'dialogue', speaker: 'Rebecca', text: '你家是做什麼的？' },
          {
            type: 'choice',
            choices: [
              { text: '廚具工廠...很普通吧。', effect: { affection: 5 } },
              { text: '廚具製造業，目前在研究轉型到國際市場。', effect: { affection: 20 }, require: { insight: 60 } },
              { text: '比不上在場各位大老闆啦。', effect: { affection: 0 } },
            ]
          },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch1_wine.png', description: '紅酒對話' },
          { type: 'dialogue', speaker: 'Rebecca', text: '（搖晃紅酒杯）有自知之明是好事。但光有自知之明，成不了大事。' },
          { type: 'dialogue', speaker: '', text: '她的名片上印著：「王瑞貝卡 — 凱達國際董事長夫人」。' },
        ]
      },
      // Chapter 2: 貴婦的私人課程
      {
        title: '貴婦的私人課程',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch2_lounge.png', description: '私人會所下午茶' },
          { type: 'dialogue', speaker: '', text: 'Rebecca 以「指導年輕人」為名，邀你到私人會所喝下午茶。' },
          { type: 'dialogue', speaker: '', text: '她教你品酒、餐桌禮儀、商業談判技巧。' },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch2_tie.png', description: '調整領帶' },
          { type: 'dialogue', speaker: '', text: '調整你的領帶時，她的手指滑過你的脖子...' },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch2_wine_lesson.png', description: '品酒教學' },
          { type: 'dialogue', speaker: 'Rebecca', text: '品酒和品人一樣，要慢慢來。別急。' },
          {
            type: 'choice',
            choices: [
              { text: '（保持冷靜）謝謝 Rebecca 姊的指導。', effect: { affection: 10 } },
              { text: '（心跳加速）妳...離得好近。', effect: { affection: 15 } },
            ]
          },
          { type: 'dialogue', speaker: '', text: 'Rebecca 享受著這種獵人與獵物的遊戲。' },
        ]
      },
      // Chapter 3: 高爾夫球場的獨處
      {
        title: '高爾夫球場的獨處',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch3_golf.png', description: '高爾夫球場' },
          { type: 'dialogue', speaker: '', text: 'Rebecca 約你打高爾夫球——私人球場，就你們兩個人。' },
          { type: 'dialogue', speaker: '', text: '她從背後環抱住你「矯正姿勢」...' },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch3_cart.png', description: '球車上的對話' },
          { type: 'dialogue', speaker: 'Rebecca', text: '4J，你知道我老公已經兩年沒回家了嗎？' },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch3_lonely.png', description: 'Rebecca的寂寞' },
          { type: 'dialogue', speaker: 'Rebecca', text: '所有人看到的都是「董事長夫人」...沒有人看到我。' },
          {
            type: 'choice',
            choices: [
              { text: '我看到的是妳，不是那個頭銜。', effect: { affection: 20 } },
              { text: '...妳值得更好的。', effect: { affection: 15 } },
            ]
          },
          { type: 'dialogue', speaker: '', text: '第一次看到 Rebecca 眼神裡不是遊戲，而是真實的寂寞。' },
        ]
      },
      // Chapter 4: 豪宅的秘密花園
      {
        title: '豪宅的秘密花園',
        scenes: [
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch4_mansion.png', description: '豪宅夜景' },
          { type: 'dialogue', speaker: '', text: '雨夜，Rebecca 傳訊息：「我一個人在家，你能來嗎？」' },
          { type: 'dialogue', speaker: '', text: '陽明山的豪宅，偌大的房子空蕩蕩只有她一個人。' },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch4_robe.png', description: '絲質睡袍的Rebecca' },
          { type: 'dialogue', speaker: '', text: '沒有名牌、沒有珠寶，只穿著一件絲質睡袍的她，和平時完全不同。' },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch4_pool.png', description: '泳池邊的真心話' },
          { type: 'dialogue', speaker: 'Rebecca', text: '在這些人面前，只有你把我當一個人看，不是一張信用卡。' },
          {
            type: 'choice',
            choices: [
              { text: '（坐在她身邊）那就做回真正的妳。', effect: { affection: 20 } },
              { text: '（握住她的手）不管妳是誰，我都在這裡。', effect: { affection: 15 } },
            ]
          },
          { type: 'dialogue', speaker: '', text: '泳池的藍光映照在天花板上，雨打在窗上...' },
        ]
      },
      // Chapter 5: 新的天地
      {
        title: '新的天地',
        scenes: [
          { type: 'dialogue', speaker: '', text: 'Rebecca 簽下離婚協議書，帶著你飛往巴黎。' },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch5_paris.png', description: '巴黎咖啡店' },
          { type: 'dialogue', speaker: 'Rebecca', text: '我這半輩子活在別人的期待裡。謝謝你讓我知道，重新開始永遠不嫌晚。' },
          { type: 'dialogue', speaker: '', text: '她拿出投資計畫書——用她的資金加你家族的製造技術，打造台灣精品廚具品牌。' },
          { type: 'cg', image: 'assets/images/scene_rebecca/scene_rebecca_ch5_eiffel.png', description: '鐵塔下的擁吻' },
          { type: 'ending', image: 'assets/images/scene_rebecca/scene_rebecca_ch5_ending_cg.png',
            title: '👑 新的天地', text: 'Rebecca 在艾菲爾鐵塔下吻了你。\n從扶輪社的偶遇，到巴黎的新人生。\n年齡不是問題，真心才是答案。' },
        ]
      },
    ],
  }
};
