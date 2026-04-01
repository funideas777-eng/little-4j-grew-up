# 小小4J長大了 - 剩餘圖片生成任務

## 完成狀態總覽

| 分類 | 已完成 | 總數 | 剩餘 |
|------|--------|------|------|
| SC01 小薰場景 | 15/15 | 15 | 0 |
| SC02 Amy場景 | 7/15 | 15 | 8 |
| SC03 Yuki場景 | 0/15 | 15 | 15 |
| SC04 Rebecca場景 | 0/15 | 15 | 15 |
| UI 介面 | 0/5 | 5 | 5 |
| CH 角色立繪 | 0/13 | 13 | 13 |
| **合計** | **22/78** | **78** | **56** |

---

## 已完成清單

### SC01 小薰 (全部完成)
- SC01_01 ~ SC01_15 (15張) ✅

### SC02 Amy (7/15)
- SC02_01 scene_amy_ch1_showroom.png ✅
- SC02_02 scene_amy_ch1_explain.png ✅
- SC02_03 scene_amy_ch1_cold.png ✅
- SC02_04 scene_amy_ch2_racesuit.png ✅
- SC02_05 scene_amy_ch2_driving.png ✅
- SC02_06 scene_amy_ch2_smile.png ✅
- SC02_07 scene_amy_ch3_overtime.png ✅

---

## Gemini Pro 圖片生成工作流程 (可在任何電腦執行)

### 前置條件
- Chrome 瀏覽器 + Claude in Chrome MCP 擴充套件
- 已登入 Google 帳號 funideas777@gmail.com
- Gemini Pro 網頁介面: `https://gemini.google.com/u/1/app`

### 每張圖片的標準流程

1. **開新對話**: 導航到 `https://gemini.google.com/u/1/app`
2. **等待載入**: 等待 4 秒讓頁面完全載入
3. **點擊輸入區**: 點擊頁面中央的文字輸入框
4. **等待就緒**: 等待 1-2 秒
5. **輸入提示詞**: 貼上該圖片的 Gemini 提示詞
6. **截圖驗證**: 確認文字確實出現在輸入框中
7. **發送**: 點擊輸入框內部，然後按 Enter 鍵送出
8. **等待生成**: 等待 90-120 秒讓圖片生成完成（不要按停止按鈕！）
9. **下載圖片**:
   - 向下滾動找到回覆下方的動作按鈕列
   - 點擊「⋮」(顯示更多選項) 按鈕
   - 在彈出選單中點擊「下載圖片」
10. **等待下載**: 等待 6 秒
11. **移動檔案**: 從 `~/Downloads/` 找到最新下載的 png 檔，重新命名並移動到目標資料夾

### 重要注意事項
- **內容審核**: 如果提示詞涉及敏感內容，加上 "22-year-old adult" 避免被過濾
- **不要按停止**: 生成過程中按停止按鈕會導致圖片丟失
- **文字消失問題**: 頁面導航後文字可能消失，需要等待頁面完全載入後再輸入
- **下載方式**: 「顯示更多選項」→「下載圖片」是最可靠的下載方法
- **模型選擇**: 確認右下角顯示 "Pro" 模型

### 檔案移動指令範本
```bash
# 範例: 移動 Amy 場景圖片
mv ~/Downloads/gemini_generated_image_*.png "/path/to/little-4j-grew-up/assets/images/scene_amy/scene_amy_ch3_comfort.png"
```

---

## 剩餘任務清單 (含完整提示詞)

### SC02 Amy 場景 (剩餘 8 張)

#### SC02_08 - scene_amy_ch3_comfort.png
**描述**: 4J帶宵夜來
**目標資料夾**: `assets/images/scene_amy/`
**提示詞**:
```
Anime style, a young man standing at an office door holding a bag of Taiwanese fried chicken and bubble tea, smiling warmly. A tired businesswoman at her desk looking up in surprise. Warm light from the hallway contrasting with the dim office. Heartwarming moment. Simple but touching scene. High quality.
```

#### SC02_09 - scene_amy_ch3_vulnerable.png
**描述**: Amy卸下防備的表情
**目標資料夾**: `assets/images/scene_amy/`
**提示詞**:
```
Anime style, intimate close-up of a beautiful woman without her glasses, hair slightly messy, looking at the viewer with vulnerable, slightly teary eyes while eating fried chicken. Soft warm lighting from a desk lamp. Genuine emotion breaking through her tough exterior. Beautiful and raw expression. High quality portrait.
```

#### SC02_10 - scene_amy_ch4_convertible.png
**描述**: 敞篷車夜景
**目標資料夾**: `assets/images/scene_amy/`
**提示詞**:
```
Anime style, a luxury convertible car parked on a mountain overlook at night. Taipei city lights panorama below. A man and woman reclining in the car seats looking up at a starry sky. The car roof is open. Romantic and serene atmosphere. Cool night colors with warm city light glow. Cinematic wide shot. High quality.
```

#### SC02_11 - scene_amy_ch4_moonlight.png
**描述**: 月光下的Amy
**目標資料夾**: `assets/images/scene_amy/`
**提示詞**:
```
Anime style, breathtaking portrait of a beautiful woman lying back in a convertible car seat, moonlight illuminating her face. Hair spread out, glasses off, looking sideways with tender eyes. Stars visible above. Her white blouse slightly open at the collar. Ethereal moonlight glow. Deeply romantic atmosphere. Ultra high quality.
```

#### SC02_12 - scene_amy_ch4_intimate.png
**描述**: 親密時刻
**目標資料夾**: `assets/images/scene_amy/`
**提示詞**:
```
Anime style, intimate scene inside a convertible under the stars on a mountain. A couple leaning close to each other, faces inches apart. City lights bokeh in the background. The woman's hand on the man's cheek. Starlight and moonlight. Passionate and tender atmosphere. Beautiful color palette of deep blue and warm gold. High quality.
```

#### SC02_13 - scene_amy_ch5_shop.png
**描述**: 改裝車店開幕
**目標資料夾**: `assets/images/scene_amy/`
**提示詞**:
```
Anime style, a cool custom car garage grand opening. A tall woman and young man standing proudly under a new shop sign. Modified sports cars inside. Industrial chic decor with exposed brick and neon signs. Both wearing matching work jackets. Confident poses. Exciting and triumphant atmosphere. High quality.
```

#### SC02_14 - scene_amy_ch5_keychain.png
**描述**: 鑰匙項鍊
**目標資料夾**: `assets/images/scene_amy/`
**提示詞**:
```
Anime style, close-up of a beautiful woman hanging a small car key pendant necklace around a young man's neck. Her hands delicate against his chest. Both smiling warmly. Soft workshop lighting behind them. Symbolic and intimate moment. Warm color tone. High quality detailed illustration.
```

#### SC02_15 - scene_amy_ch5_ending_cg.png
**描述**: 結局CG
**目標資料夾**: `assets/images/scene_amy/`
**提示詞**:
```
Anime style, ending CG illustration. A couple standing back-to-back leaning on each other in front of a custom sports car, both in racing jackets. City night skyline behind them. The woman has confident smile, the man looks determined. Wind blowing their hair. Dynamic and romantic composition. Ultra high quality poster illustration.
```

---

### SC03 Yuki 場景 (15 張)

#### SC03_01 - scene_yuki_ch1_cabin.png
**描述**: 商務艙初遇
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, inside a luxury airplane business class cabin. A beautiful flight attendant with black hair in an elegant bun, wearing a fitted navy blue uniform, bending down to help a young male passenger adjust his seat. Her hair strand brushing near his face. Soft cabin lighting, warm atmosphere. Detailed airplane interior. High quality.
```

#### SC03_02 - scene_yuki_ch1_smile.png
**描述**: Yuki的服務微笑
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, portrait of a beautiful half-Japanese flight attendant (25yo) with perfect posture, holding a serving tray. Professional warm smile, dark hair in elegant bun with a small pin. Navy blue uniform with silk scarf. Airplane cabin aisle background with soft lighting. Graceful and enchanting presence. High quality.
```

#### SC03_03 - scene_yuki_ch1_chat.png
**描述**: 短暫聊天
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, a flight attendant crouching beside a business class passenger's seat, chatting casually. She's resting her chin on her hand on the armrest. Warm cabin night lighting, other passengers sleeping in background. Intimate and quiet conversation moment. Soft blue ambient lighting. High quality.
```

#### SC03_04 - scene_yuki_ch2_casual.png
**描述**: 便裝的Yuki
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, a stunning Japanese-Taiwanese girl in a simple white sundress with long straight black hair flowing freely, standing in an airport terminal. Completely different aura from her uniformed self. Carrying a small suitcase. Natural beauty, gentle expression. Modern airport interior with large windows showing airplanes. High quality.
```

#### SC03_05 - scene_yuki_ch2_ramen.png
**描述**: 機場拉麵店
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, a young couple sitting at a small Japanese ramen counter in an airport. The girl with long black hair slurping ramen cutely, the boy watching her with a smile. Warm steam rising from bowls. Cozy ramen shop atmosphere with Japanese lanterns. Casual and heartwarming scene. Warm color palette. High quality.
```

#### SC03_06 - scene_yuki_ch2_story.png
**描述**: Yuki述說身世
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, a beautiful girl with long black hair looking out a large airport window at sunset, planes on the tarmac. Her reflection visible in the glass. Melancholic but serene expression. A young man sitting beside her listening attentively. Golden sunset light flooding the terminal. Emotional and cinematic atmosphere. High quality.
```

#### SC03_07 - scene_yuki_ch3_yukata.png
**描述**: 浴衣漫步嵐山
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, a beautiful couple in traditional Japanese yukata walking through the famous Arashiyama bamboo grove in Kyoto. The girl in a floral light blue yukata with her long black hair partly up, the boy in a dark blue yukata. Sunlight filtering through tall bamboo. Magical and serene Japanese atmosphere. Highly detailed. High quality.
```

#### SC03_08 - scene_yuki_ch3_torii.png
**描述**: 鳥居下躲雨
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, a couple sheltering under a small red torii gate at a Japanese shrine during rain. The girl in yukata leaning her head on the boy's shoulder with closed eyes and peaceful smile. Rain pouring around them but they're dry under the gate. Atmospheric rain effects, lush green moss and stone lanterns. Romantic and peaceful. High quality.
```

#### SC03_09 - scene_yuki_ch3_sleeve.png
**描述**: 用袖子擋雨
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, close-up of a young man in yukata extending his wide sleeve to shield a beautiful girl from rain. She looks up at him with touched, loving expression. Rain droplets on the fabric. Red torii gate framing them. Intimate and tender moment. Beautiful water and fabric details. Warm emotional lighting. High quality.
```

#### SC03_10 - scene_yuki_ch4_onsen.png
**描述**: 溫泉場景
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, a beautiful outdoor Japanese hot spring (onsen) at night. Steam rising from the water. A woman partially submerged, long black hair flowing on the water surface, looking up at the moon. Surrounded by natural rocks and bamboo fence. Cherry blossoms falling. Mystical and sensual atmosphere. Beautiful lighting. High quality.
```

#### SC03_11 - scene_yuki_ch4_yukata_room.png
**描述**: 旅館房間
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, traditional Japanese ryokan tatami room at night. A beautiful girl in a loose white yukata robe, slightly flushed cheeks from the hot spring, holding a beer can. Sitting by an open sliding door overlooking a moonlit Japanese garden. Her hair is down and slightly damp. Relaxed and intimate atmosphere. Warm room lighting. High quality.
```

#### SC03_12 - scene_yuki_ch4_approach.png
**描述**: Yuki靠近
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, intimate tatami room scene. A beautiful woman in a loose yukata leaning close to a man, her face flushed pink, eyes half-lidded with emotion. Moonlight through shoji screens casting soft shadows. Japanese garden visible outside. Beer cans on low table. Sensual and tender atmosphere. Warm and cool light contrast. High quality.
```

#### SC03_13 - scene_yuki_ch5_airport.png
**描述**: 機場接機
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, airport arrival gate scene. A young man holding white lilies waiting at the gate. A beautiful flight attendant in uniform running towards him with open arms and the brightest smile. Other passengers and crew watching warmly. Bright airport lighting. Joyful and emotional reunion scene. High quality.
```

#### SC03_14 - scene_yuki_ch5_reunion.png
**描述**: 擁抱重逢
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, emotional embrace at an airport. A flight attendant jumping into a young man's arms, her hat flying off, white lilies scattered around them. Both have tears of joy. Motion blur on background passengers. Dynamic and emotional composition. Warm lighting. Beautiful moment frozen in time. High quality.
```

#### SC03_15 - scene_yuki_ch5_ending_cg.png
**描述**: 結局CG
**目標資料夾**: `assets/images/scene_yuki/`
**提示詞**:
```
Anime style, ending CG illustration. A couple watching sunset from an airport observation deck. The woman in flight attendant uniform leaning on the man's shoulder. Planes taking off in the background against a gorgeous orange-purple sky. Their silhouettes framed by the window. Peaceful and romantic. Ultra high quality poster illustration.
```

---

### SC04 Rebecca 場景 (15 張)

#### SC04_01 - scene_rebecca_ch1_gala.png
**描述**: 扶輪社宴會廳
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, luxurious five-star hotel ballroom gala event. Crystal chandeliers, elegant guests in formal wear. A young man in a simple suit looking out of place among wealthy socialites. A stunning mature woman (38yo) in a red evening gown approaching him with a wine glass. Opulent and intimidating atmosphere. High quality.
```

#### SC04_02 - scene_rebecca_ch1_intro.png
**描述**: Rebecca遞名片
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, a glamorous mature woman in a red evening dress with pearl jewelry, elegantly extending a business card to a nervous young man. Her expression is amused and intrigued. Close-up composition showing the contrast between her luxury and his simplicity. Warm ballroom lighting with chandelier bokeh. High quality.
```

#### SC04_03 - scene_rebecca_ch1_wine.png
**描述**: 紅酒對話
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, a sophisticated mature woman with curled shoulder-length hair, swirling a glass of red wine, looking at a young man with a mysterious smile. She's wearing diamond earrings and a red dress. The young man holds his wine glass awkwardly. Intimate conversation at a gala. Warm golden ambient lighting. High quality portrait.
```

#### SC04_04 - scene_rebecca_ch2_lounge.png
**描述**: 私人會所下午茶
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, an ultra-luxurious private lounge with floor-to-ceiling windows overlooking a city skyline. A glamorous mature woman in designer clothes pouring tea for a young man on a velvet sofa. Afternoon sunlight streaming in. Expensive decor, fresh flowers, macarons on the table. Elegant and slightly tense atmosphere. High quality.
```

#### SC04_05 - scene_rebecca_ch2_tie.png
**描述**: 調整領帶
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, close-up of a mature elegant woman's manicured hands adjusting a young man's necktie. Her fingers lingering near his collar. She's looking up at him with a knowing smile. His face slightly flushed. Intimate distance between them. Soft luxury interior lighting. Sensual tension in the composition. High quality.
```

#### SC04_06 - scene_rebecca_ch2_wine_lesson.png
**描述**: 品酒教學
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, a sophisticated mature woman teaching a young man to taste wine. Their faces very close as she guides his hand holding the glass. Warm intimate lighting in a private lounge. Wine bottles and crystal glasses on the table. Seductive and educational atmosphere simultaneously. High quality.
```

#### SC04_07 - scene_rebecca_ch3_golf.png
**描述**: 高爾夫球場
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, a private golf course on a sunny day. A glamorous mature woman in a white polo shirt and short golf skirt standing behind a young man, arms around him to correct his golf swing. Her body pressed against his back. Green manicured fairway, luxury golf cart nearby. Playful and flirtatious atmosphere. High quality.
```

#### SC04_08 - scene_rebecca_ch3_cart.png
**描述**: 球車上的對話
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, two people sitting in a luxury golf cart on a beautiful course. A mature elegant woman looking distant and vulnerable, her playful mask dropped. The young man listening with genuine concern. Afternoon light casting long shadows on the green. A moment of real emotion. Contemplative atmosphere. High quality.
```

#### SC04_09 - scene_rebecca_ch3_lonely.png
**描述**: Rebecca的寂寞
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, portrait of a beautiful mature woman (38yo) sitting alone on a golf course bench, looking at her diamond wedding ring with a sad expression. Curled hair slightly windswept. Luxury watch and jewelry contrasting with her lonely demeanor. Gorgeous sunset behind rolling green hills. Bittersweet and melancholic. High quality.
```

#### SC04_10 - scene_rebecca_ch4_mansion.png
**描述**: 豪宅夜景
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, a stunning hillside mansion at night in the rain. Floor-to-ceiling windows glowing with warm interior light. A luxury car pulling up to the entrance. Dramatic rain and lightning. Mysterious and atmospheric scene. High quality architectural illustration.
```

#### SC04_11 - scene_rebecca_ch4_robe.png
**描述**: 絲質睡袍的Rebecca
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, a beautiful mature woman in a silk robe standing by an indoor infinity pool in a luxury mansion. Her hair is down and natural, no jewelry. Vulnerable and real. Blue pool light reflecting on her face. Floor-to-ceiling windows showing rainy night city lights. Intimate and raw beauty. High quality.
```

#### SC04_12 - scene_rebecca_ch4_pool.png
**描述**: 泳池邊的真心話
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, two people sitting at the edge of a luxury indoor pool in a mansion, feet in the water. A mature woman in a silk robe looking at a young man with genuine emotion, her usual confident facade completely gone. Blue-green pool reflections dancing on the ceiling. Rain on the windows. Deeply intimate and emotional scene. High quality.
```

#### SC04_13 - scene_rebecca_ch5_paris.png
**描述**: 巴黎咖啡店
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, a charming Parisian sidewalk cafe by the Seine River. A glamorous mature woman and a young man sitting at a small table with espresso. She's showing him a business plan. Eiffel Tower visible in the distance. Autumn leaves falling. Sophisticated and hopeful atmosphere. Beautiful European cityscape. High quality.
```

#### SC04_14 - scene_rebecca_ch5_eiffel.png
**描述**: 鐵塔下的擁吻
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, romantic scene of a couple kissing under the Eiffel Tower at golden hour. The mature elegant woman in a chic coat, the young man in a nice jacket. Autumn Parisian atmosphere. Warm golden sunset light. Fallen leaves swirling around them. Cinematic wide shot with the tower framing them. Breathtaking and romantic. High quality.
```

#### SC04_15 - scene_rebecca_ch5_ending_cg.png
**描述**: 結局CG
**目標資料夾**: `assets/images/scene_rebecca/`
**提示詞**:
```
Anime style, ending CG illustration. A confident couple standing in front of their new elegant kitchenware boutique in Paris with a bilingual Chinese-French sign. The woman in a chic business outfit, the man in a tailored suit. Both looking at the viewer with confident smiles. Parisian architecture background. Success and love. Ultra high quality poster illustration.
```

---

### UI 介面 (5 張)

#### UI_01 - ui_title_screen.png
**描述**: 遊戲標題畫面
**目標資料夾**: `assets/images/ui/`
**提示詞**:
```
Anime style game title screen. Stylish Chinese text with neon glow effect. A young man silhouette in the center with four female silhouettes around him. Taipei city skyline at sunset in background. Cherry blossom petals falling. Modern and romantic game aesthetic. 16:9 aspect ratio. High quality.
```

#### UI_02 - ui_main_hub.png
**描述**: 主畫面/每日行動選擇
**目標資料夾**: `assets/images/ui/`
**提示詞**:
```
Anime style game UI background. A cozy Taipei apartment room with a desk, calendar on wall, and window showing city view. Five action icons should fit on screen. Warm morning lighting. Clean modern anime interior design. 16:9 aspect ratio. High quality.
```

#### UI_03 - ui_status_panel.png
**描述**: 角色狀態面板背景
**目標資料夾**: `assets/images/ui/`
**提示詞**:
```
Anime style UI panel background. Semi-transparent dark gradient panel with gold border ornaments. Space for character portrait, stats bars, and text. Elegant and modern game UI design. Clean and readable. High quality.
```

#### UI_04 - ui_dialogue_box.png
**描述**: 對話框
**目標資料夾**: `assets/images/ui/`
**提示詞**:
```
Anime style visual novel dialogue box. Semi-transparent dark panel at bottom of screen with rounded corners and subtle glow border. Name tag area on upper left. Clean, modern visual novel UI design. 16:9 aspect ratio reference. High quality.
```

#### UI_05 - ui_map_taipei.png
**描述**: 台北地圖選擇畫面
**目標資料夾**: `assets/images/ui/`
**提示詞**:
```
Anime style illustrated map of Taipei city from above. Key locations marked: Nangang Exhibition Hall, BMW dealership, Songshan Airport, Grand Hotel for Rotary Club. Cute chibi-style map with vibrant colors. Isometric view. Game UI map design. High quality.
```

---

### CH 角色立繪 (13 張)

#### CH_00 - char_4j_protagonist.png
**描述**: 主角立繪
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A young 22-year-old Taiwanese man with short black hair, average build, wearing a simple T-shirt and jeans. Friendly and determined expression. Everyman appearance. Clear lineart, game character design. High quality.
```

#### CH_01a - char_kaoru_normal.png
**描述**: 展場制服
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A cute 22-year-old girl with long wavy brown hair, wearing a tight red exhibition showgirl uniform with a sponsor belt. Sweet smile, standing pose with hand on hip. Clear lineart, game character design. High quality.
```

#### CH_01b - char_kaoru_casual.png
**描述**: 便裝
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A cute 22-year-old girl with long wavy brown hair, wearing a floral sundress and white sneakers. Cheerful expression, casual standing pose. Clear lineart, game character design. High quality.
```

#### CH_01c - char_kaoru_apron.png
**描述**: 花店圍裙
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A cute 22-year-old girl with long wavy brown hair, wearing a cute floral apron over casual clothes, holding a small flower bouquet. Warm happy smile. Clear lineart, game character design. High quality.
```

#### CH_02a - char_amy_suit.png
**描述**: 套裝
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A tall professional 27-year-old woman with short brown hair in ponytail, wearing a fitted black business suit, glasses, and high heels. Confident pose with arms crossed. Clear lineart, game character design. High quality.
```

#### CH_02b - char_amy_racing.png
**描述**: 賽車服
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A tall 27-year-old woman in a white and red racing suit, unzipped to waist showing tank top. Ponytail, no glasses, confident grin, holding a racing helmet. Clear lineart, game character design. High quality.
```

#### CH_02c - char_amy_casual.png
**描述**: 便裝
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A tall 27-year-old woman in a casual leather jacket, jeans, and boots. Hair down, no glasses. Cool and relaxed pose leaning slightly. Clear lineart, game character design. High quality.
```

#### CH_03a - char_yuki_uniform.png
**描述**: 空姐制服
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A beautiful 25-year-old half-Japanese woman with long straight black hair in elegant bun, wearing a navy blue flight attendant uniform with silk scarf, hat, and heels. Graceful standing pose. Clear lineart, game character design. High quality.
```

#### CH_03b - char_yuki_casual.png
**描述**: 便裝
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A beautiful 25-year-old half-Japanese woman with long flowing straight black hair, wearing a simple white sundress. Gentle and ethereal expression. Clear lineart, game character design. High quality.
```

#### CH_03c - char_yuki_yukata.png
**描述**: 浴衣
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A beautiful 25-year-old half-Japanese woman with long black hair in a loose updo with hair pins, wearing a light blue floral yukata. Elegant and traditional pose. Clear lineart, game character design. High quality.
```

#### CH_04a - char_rebecca_gala.png
**描述**: 晚禮服
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A glamorous 38-year-old mature woman with curled shoulder-length dark hair, wearing a red evening gown with pearl necklace and diamond earrings. Confident and alluring pose holding a wine glass. Clear lineart, game character design. High quality.
```

#### CH_04b - char_rebecca_golf.png
**描述**: 高爾夫裝
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A beautiful 38-year-old mature woman in a white polo shirt, short golf skirt, and visor hat. Curled hair in a ponytail. Playful sporty pose with a golf club. Clear lineart, game character design. High quality.
```

#### CH_04c - char_rebecca_robe.png
**描述**: 居家絲袍
**目標資料夾**: `assets/images/characters/`
**提示詞**:
```
Anime style, full body character portrait on transparent background. A beautiful 38-year-old mature woman in an elegant silk robe, hair down naturally, no makeup or jewelry. Vulnerable but still beautiful. Relaxed standing pose. Clear lineart, game character design. High quality.
```

---

## 快速執行腳本 (供新對話使用)

在新的 Claude Code 對話中貼上以下指令即可繼續工作：

```
請繼續為「小小4J長大了」遊戲生成圖片素材。

工作流程：
1. 讀取 /path/to/little-4j-grew-up/docs/remaining_image_tasks.md 了解剩餘任務
2. 使用 Chrome 自動化開啟 Gemini Pro (https://gemini.google.com/u/1/app)
3. 依序生成每張圖片，使用文件中的提示詞
4. 下載方式：回覆下方「⋮ 顯示更多選項」→「下載圖片」
5. 將下載的檔案移動到對應資料夾並重新命名
6. 每完成一張就更新文件中的狀態

注意事項：
- 頁面載入後等 4 秒再操作
- 生成過程不要按停止按鈕
- 如遇內容審核問題，在提示詞中加上 "22-year-old adult"
- 下載檔案通常在 ~/Downloads/ 中，檔名為 gemini_generated_image_*.png
```

---

## 資料夾結構
```
little-4j-grew-up/
└── assets/
    └── images/
        ├── scene_kaoru/    ← 15/15 完成 ✅
        ├── scene_amy/      ← 7/15 完成，剩 8 張
        ├── scene_yuki/     ← 0/15，剩 15 張
        ├── scene_rebecca/  ← 0/15，剩 15 張
        ├── characters/     ← 0/13，剩 13 張
        └── ui/             ← 0/5，剩 5 張
```
