#!/bin/bash
# ============================================================
# Grok (xAI) 圖片生成腳本 — 本地安全版
# ============================================================
# 用法:
#   export XAI_API_KEY="your-key-here"
#   ./scripts/generate-images.sh                    # 生成全部未完成圖片
#   ./scripts/generate-images.sh --category yuki    # 只生成 Yuki 場景
#   ./scripts/generate-images.sh --id SC04_05       # 只生成指定 ID
#   ./scripts/generate-images.sh --dry-run          # 預覽不實際呼叫 API
#
# 安全須知:
#   API 金鑰只從環境變數 XAI_API_KEY 讀取，不會寫入任何檔案。
#   建議將金鑰放在 ~/.xai_env (已加入 .gitignore):
#     echo 'export XAI_API_KEY="xai-xxx..."' > ~/.xai_env
#     source ~/.xai_env
# ============================================================

set -euo pipefail

# --- 顏色輸出 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# --- 專案根目錄 ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# --- 參數解析 ---
CATEGORY=""
TARGET_ID=""
DRY_RUN=false
MODEL="grok-imagine-image-pro"
DELAY=3  # API 呼叫間隔（秒）

while [[ $# -gt 0 ]]; do
  case $1 in
    --category) CATEGORY="$2"; shift 2 ;;
    --id) TARGET_ID="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    --model) MODEL="$2"; shift 2 ;;
    --delay) DELAY="$2"; shift 2 ;;
    --help|-h)
      echo "用法: $0 [--category yuki|rebecca|characters] [--id SC04_05] [--dry-run] [--model grok-imagine-image-pro] [--delay 3]"
      exit 0 ;;
    *) echo -e "${RED}未知參數: $1${NC}"; exit 1 ;;
  esac
done

# --- 檢查 API 金鑰 ---
if [[ -z "${XAI_API_KEY:-}" ]]; then
  echo -e "${RED}錯誤: 請先設定環境變數 XAI_API_KEY${NC}"
  echo ""
  echo "  方法 1 (臨時):"
  echo "    export XAI_API_KEY=\"your-key-here\""
  echo ""
  echo "  方法 2 (持久):"
  echo "    echo 'export XAI_API_KEY=\"your-key-here\"' > ~/.xai_env"
  echo "    source ~/.xai_env"
  echo ""
  exit 1
fi

# --- 檢查 jq ---
if ! command -v jq &>/dev/null; then
  echo -e "${RED}錯誤: 需要安裝 jq${NC}"
  echo "  brew install jq"
  exit 1
fi

# --- 圖片資料定義 ---
# 格式: "ID|檔名|目標資料夾|分類|提示詞"
declare -a IMAGES=()

# Yuki 場景 (5 張)
IMAGES+=('SC03_11|scene_yuki_ch4_yukata_room.png|assets/images/scene_yuki|yuki|Anime style, traditional Japanese ryokan tatami room at night. A beautiful girl in a loose white yukata robe, slightly flushed cheeks from the hot spring, holding a beer can. Sitting by an open sliding door overlooking a moonlit Japanese garden. Her hair is down and slightly damp. Relaxed and intimate atmosphere. Warm room lighting. High quality.')
IMAGES+=('SC03_12|scene_yuki_ch4_approach.png|assets/images/scene_yuki|yuki|Anime style, intimate tatami room scene. A beautiful woman in a loose yukata leaning close to a man, her face flushed pink, eyes half-lidded with emotion. Moonlight through shoji screens casting soft shadows. Japanese garden visible outside. Beer cans on low table. Sensual and tender atmosphere. Warm and cool light contrast. High quality.')
IMAGES+=('SC03_13|scene_yuki_ch5_airport.png|assets/images/scene_yuki|yuki|Anime style, airport arrival gate scene. A young man holding white lilies waiting at the gate. A beautiful flight attendant in uniform running towards him with open arms and the brightest smile. Other passengers and crew watching warmly. Bright airport lighting. Joyful and emotional reunion scene. High quality.')
IMAGES+=('SC03_14|scene_yuki_ch5_reunion.png|assets/images/scene_yuki|yuki|Anime style, emotional embrace at an airport. A flight attendant jumping into a young mans arms, her hat flying off, white lilies scattered around them. Both have tears of joy. Motion blur on background passengers. Dynamic and emotional composition. Warm lighting. Beautiful moment frozen in time. High quality.')
IMAGES+=('SC03_15|scene_yuki_ch5_ending_cg.png|assets/images/scene_yuki|yuki|Anime style, ending CG illustration. A couple watching sunset from an airport observation deck. The woman in flight attendant uniform leaning on the mans shoulder. Planes taking off in the background against a gorgeous orange-purple sky. Their silhouettes framed by the window. Peaceful and romantic. Ultra high quality poster illustration.')

# Rebecca 場景 (15 張)
IMAGES+=('SC04_01|scene_rebecca_ch1_gala.png|assets/images/scene_rebecca|rebecca|Anime style, luxurious five-star hotel ballroom gala event. Crystal chandeliers, elegant guests in formal wear. A young man in a simple suit looking out of place among wealthy socialites. A stunning mature woman (38yo) in a red evening gown approaching him with a wine glass. Opulent and intimidating atmosphere. High quality.')
IMAGES+=('SC04_02|scene_rebecca_ch1_intro.png|assets/images/scene_rebecca|rebecca|Anime style, a glamorous mature woman in a red evening dress with pearl jewelry, elegantly extending a business card to a nervous young man. Her expression is amused and intrigued. Close-up composition showing the contrast between her luxury and his simplicity. Warm ballroom lighting with chandelier bokeh. High quality.')
IMAGES+=('SC04_03|scene_rebecca_ch1_wine.png|assets/images/scene_rebecca|rebecca|Anime style, a sophisticated mature woman with curled shoulder-length hair, swirling a glass of red wine, looking at a young man with a mysterious smile. Shes wearing diamond earrings and a red dress. The young man holds his wine glass awkwardly. Intimate conversation at a gala. Warm golden ambient lighting. High quality portrait.')
IMAGES+=('SC04_04|scene_rebecca_ch2_lounge.png|assets/images/scene_rebecca|rebecca|Anime style, an ultra-luxurious private lounge with floor-to-ceiling windows overlooking a city skyline. A glamorous mature woman in designer clothes pouring tea for a young man on a velvet sofa. Afternoon sunlight streaming in. Expensive decor, fresh flowers, macarons on the table. Elegant and slightly tense atmosphere. High quality.')
IMAGES+=('SC04_05|scene_rebecca_ch2_tie.png|assets/images/scene_rebecca|rebecca|Anime style, close-up of a mature elegant womans manicured hands adjusting a young mans necktie. Her fingers lingering near his collar. Shes looking up at him with a knowing smile. His face slightly flushed. Intimate distance between them. Soft luxury interior lighting. Sensual tension in the composition. High quality.')
IMAGES+=('SC04_06|scene_rebecca_ch2_wine_lesson.png|assets/images/scene_rebecca|rebecca|Anime style, a sophisticated mature woman teaching a young man to taste wine. Their faces very close as she guides his hand holding the glass. Warm intimate lighting in a private lounge. Wine bottles and crystal glasses on the table. Seductive and educational atmosphere simultaneously. High quality.')
IMAGES+=('SC04_07|scene_rebecca_ch3_golf.png|assets/images/scene_rebecca|rebecca|Anime style, a private golf course on a sunny day. A glamorous mature woman in a white polo shirt and short golf skirt standing behind a young man, arms around him to correct his golf swing. Her body pressed against his back. Green manicured fairway, luxury golf cart nearby. Playful and flirtatious atmosphere. High quality.')
IMAGES+=('SC04_08|scene_rebecca_ch3_cart.png|assets/images/scene_rebecca|rebecca|Anime style, two people sitting in a luxury golf cart on a beautiful course. A mature elegant woman looking distant and vulnerable, her playful mask dropped. The young man listening with genuine concern. Afternoon light casting long shadows on the green. A moment of real emotion. Contemplative atmosphere. High quality.')
IMAGES+=('SC04_09|scene_rebecca_ch3_lonely.png|assets/images/scene_rebecca|rebecca|Anime style, portrait of a beautiful mature woman (38yo) sitting alone on a golf course bench, looking at her diamond wedding ring with a sad expression. Curled hair slightly windswept. Luxury watch and jewelry contrasting with her lonely demeanor. Gorgeous sunset behind rolling green hills. Bittersweet and melancholic. High quality.')
IMAGES+=('SC04_10|scene_rebecca_ch4_mansion.png|assets/images/scene_rebecca|rebecca|Anime style, a stunning hillside mansion at night in the rain. Floor-to-ceiling windows glowing with warm interior light. A luxury car pulling up to the entrance. Dramatic rain and lightning. Mysterious and atmospheric scene. High quality architectural illustration.')
IMAGES+=('SC04_11|scene_rebecca_ch4_robe.png|assets/images/scene_rebecca|rebecca|Anime style, a beautiful mature woman in a silk robe standing by an indoor infinity pool in a luxury mansion. Her hair is down and natural, no jewelry. Vulnerable and real. Blue pool light reflecting on her face. Floor-to-ceiling windows showing rainy night city lights. Intimate and raw beauty. High quality.')
IMAGES+=('SC04_12|scene_rebecca_ch4_pool.png|assets/images/scene_rebecca|rebecca|Anime style, two people sitting at the edge of a luxury indoor pool in a mansion, feet in the water. A mature woman in a silk robe looking at a young man with genuine emotion, her usual confident facade completely gone. Blue-green pool reflections dancing on the ceiling. Rain on the windows. Deeply intimate and emotional scene. High quality.')
IMAGES+=('SC04_13|scene_rebecca_ch5_paris.png|assets/images/scene_rebecca|rebecca|Anime style, a charming Parisian sidewalk cafe by the Seine River. A glamorous mature woman and a young man sitting at a small table with espresso. Shes showing him a business plan. Eiffel Tower visible in the distance. Autumn leaves falling. Sophisticated and hopeful atmosphere. Beautiful European cityscape. High quality.')
IMAGES+=('SC04_14|scene_rebecca_ch5_eiffel.png|assets/images/scene_rebecca|rebecca|Anime style, romantic scene of a couple kissing under the Eiffel Tower at golden hour. The mature elegant woman in a chic coat, the young man in a nice jacket. Autumn Parisian atmosphere. Warm golden sunset light. Fallen leaves swirling around them. Cinematic wide shot with the tower framing them. Breathtaking and romantic. High quality.')
IMAGES+=('SC04_15|scene_rebecca_ch5_ending_cg.png|assets/images/scene_rebecca|rebecca|Anime style, ending CG illustration. A confident couple standing in front of their new elegant kitchenware boutique in Paris with a bilingual Chinese-French sign. The woman in a chic business outfit, the man in a tailored suit. Both looking at the viewer with confident smiles. Parisian architecture background. Success and love. Ultra high quality poster illustration.')

# 角色立繪 (13 張)
IMAGES+=('CH_00|char_4j_protagonist.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A young 22-year-old Taiwanese man with short black hair, average build, wearing a simple T-shirt and jeans. Friendly and determined expression. Everyman appearance. Clear lineart, game character design. High quality.')
IMAGES+=('CH_01a|char_kaoru_normal.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A cute 22-year-old girl with long wavy brown hair, wearing a tight red exhibition showgirl uniform with a sponsor belt. Sweet smile, standing pose with hand on hip. Clear lineart, game character design. High quality.')
IMAGES+=('CH_01b|char_kaoru_casual.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A cute 22-year-old girl with long wavy brown hair, wearing a floral sundress and white sneakers. Cheerful expression, casual standing pose. Clear lineart, game character design. High quality.')
IMAGES+=('CH_01c|char_kaoru_apron.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A cute 22-year-old girl with long wavy brown hair, wearing a cute floral apron over casual clothes, holding a small flower bouquet. Warm happy smile. Clear lineart, game character design. High quality.')
IMAGES+=('CH_02a|char_amy_suit.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A tall professional 27-year-old woman with short brown hair in ponytail, wearing a fitted black business suit, glasses, and high heels. Confident pose with arms crossed. Clear lineart, game character design. High quality.')
IMAGES+=('CH_02b|char_amy_racing.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A tall 27-year-old woman in a white and red racing suit, unzipped to waist showing tank top. Ponytail, no glasses, confident grin, holding a racing helmet. Clear lineart, game character design. High quality.')
IMAGES+=('CH_02c|char_amy_casual.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A tall 27-year-old woman in a casual leather jacket, jeans, and boots. Hair down, no glasses. Cool and relaxed pose leaning slightly. Clear lineart, game character design. High quality.')
IMAGES+=('CH_03a|char_yuki_uniform.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A beautiful 25-year-old half-Japanese woman with long straight black hair in elegant bun, wearing a navy blue flight attendant uniform with silk scarf, hat, and heels. Graceful standing pose. Clear lineart, game character design. High quality.')
IMAGES+=('CH_03b|char_yuki_casual.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A beautiful 25-year-old half-Japanese woman with long flowing straight black hair, wearing a simple white sundress. Gentle and ethereal expression. Clear lineart, game character design. High quality.')
IMAGES+=('CH_03c|char_yuki_yukata.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A beautiful 25-year-old half-Japanese woman with long black hair in a loose updo with hair pins, wearing a light blue floral yukata. Elegant and traditional pose. Clear lineart, game character design. High quality.')
IMAGES+=('CH_04a|char_rebecca_gala.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A glamorous 38-year-old mature woman with curled shoulder-length dark hair, wearing a red evening gown with pearl necklace and diamond earrings. Confident and alluring pose holding a wine glass. Clear lineart, game character design. High quality.')
IMAGES+=('CH_04b|char_rebecca_golf.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A beautiful 38-year-old mature woman in a white polo shirt, short golf skirt, and visor hat. Curled hair in a ponytail. Playful sporty pose with a golf club. Clear lineart, game character design. High quality.')
IMAGES+=('CH_04c|char_rebecca_robe.png|assets/images/characters|characters|Anime style, full body character portrait on transparent background. A beautiful 38-year-old mature woman in an elegant silk robe, hair down naturally, no makeup or jewelry. Vulnerable but still beautiful. Relaxed standing pose. Clear lineart, game character design. High quality.')

# --- 生成記錄 ---
LOG_DIR="$PROJECT_ROOT/scripts/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/generate_$(date +%Y%m%d_%H%M%S).log"

log() {
  echo -e "$1" | tee -a "$LOG_FILE"
}

# --- 統計 ---
TOTAL=0
SKIPPED=0
SUCCESS=0
FAILED=0

# --- API 呼叫函數 ---
generate_image() {
  local id="$1"
  local filename="$2"
  local folder="$3"
  local prompt="$4"

  local output_path="$PROJECT_ROOT/$folder/$filename"
  local output_dir="$PROJECT_ROOT/$folder"

  # 確保目標資料夾存在
  mkdir -p "$output_dir"

  # 如果檔案已存在且大於 1KB，跳過
  if [[ -f "$output_path" ]] && [[ $(stat -f%z "$output_path" 2>/dev/null || stat -c%s "$output_path" 2>/dev/null) -gt 1024 ]]; then
    log "${YELLOW}⏭ 跳過 $id ($filename) — 檔案已存在${NC}"
    ((SKIPPED++))
    return 0
  fi

  if $DRY_RUN; then
    log "${CYAN}🔍 [預覽] $id → $folder/$filename${NC}"
    log "   提示詞: ${prompt:0:80}..."
    return 0
  fi

  log "${CYAN}🎨 生成中: $id ($filename)...${NC}"

  # 呼叫 xAI Grok Image API
  local response
  response=$(curl -s -w "\n%{http_code}" \
    -X POST "https://api.x.ai/v1/images/generations" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $XAI_API_KEY" \
    -d "$(jq -n \
      --arg model "$MODEL" \
      --arg prompt "$prompt" \
      '{
        model: $model,
        prompt: $prompt,
        n: 1,
        response_format: "url"
      }')" \
    --max-time 120)

  local http_code
  http_code=$(echo "$response" | tail -n1)
  local body
  body=$(echo "$response" | sed '$d')

  if [[ "$http_code" != "200" ]]; then
    local error_msg
    error_msg=$(echo "$body" | jq -r '.error.message // .error // "Unknown error"' 2>/dev/null || echo "HTTP $http_code")
    log "${RED}❌ 失敗 $id: $error_msg${NC}"
    echo "$id|$filename|FAILED|$error_msg" >> "$LOG_FILE"
    ((FAILED++))
    return 1
  fi

  # 解碼 base64 並存檔
  local b64_data
  b64_data=$(echo "$body" | jq -r '.data[0].b64_json // empty' 2>/dev/null)

  if [[ -z "$b64_data" ]]; then
    # 嘗試 url 格式
    local url
    url=$(echo "$body" | jq -r '.data[0].url // empty' 2>/dev/null)
    if [[ -n "$url" ]]; then
      curl -s -o "$output_path" "$url" --max-time 60
    else
      log "${RED}❌ 失敗 $id: 無法解析回應${NC}"
      ((FAILED++))
      return 1
    fi
  else
    echo "$b64_data" | base64 -d > "$output_path"
  fi

  # 驗證檔案
  if [[ -f "$output_path" ]] && [[ $(stat -f%z "$output_path" 2>/dev/null || stat -c%s "$output_path" 2>/dev/null) -gt 1024 ]]; then
    log "${GREEN}✅ 完成 $id → $output_path ($(du -h "$output_path" | cut -f1))${NC}"
    ((SUCCESS++))
  else
    log "${RED}❌ 失敗 $id: 檔案太小或損壞${NC}"
    rm -f "$output_path"
    ((FAILED++))
    return 1
  fi
}

# --- 主程式 ---
echo ""
log "╔════════════════════════════════════════════╗"
log "║  🎮 小小4J長大了 — Grok 圖片生成腳本     ║"
log "╚════════════════════════════════════════════╝"
log ""
log "模型: $MODEL"
log "時間: $(date)"
if $DRY_RUN; then
  log "${YELLOW}⚠ 預覽模式 (不會實際呼叫 API)${NC}"
fi
if [[ -n "$CATEGORY" ]]; then
  log "篩選分類: $CATEGORY"
fi
if [[ -n "$TARGET_ID" ]]; then
  log "篩選 ID: $TARGET_ID"
fi
log ""

for entry in "${IMAGES[@]}"; do
  IFS='|' read -r id filename folder category prompt <<< "$entry"

  # 分類篩選
  if [[ -n "$CATEGORY" ]] && [[ "$category" != "$CATEGORY" ]]; then
    continue
  fi

  # ID 篩選
  if [[ -n "$TARGET_ID" ]] && [[ "$id" != "$TARGET_ID" ]]; then
    continue
  fi

  ((TOTAL++))

  generate_image "$id" "$filename" "$folder" "$prompt" || true

  # API 呼叫間隔
  if ! $DRY_RUN && [[ $TOTAL -gt 0 ]]; then
    sleep "$DELAY"
  fi
done

# --- 結果摘要 ---
log ""
log "════════════════════════════════════════"
log "📊 生成結果摘要"
log "════════════════════════════════════════"
log "  總計: $TOTAL"
log "  ${GREEN}成功: $SUCCESS${NC}"
log "  ${YELLOW}跳過: $SKIPPED${NC}"
log "  ${RED}失敗: $FAILED${NC}"
log "  記錄: $LOG_FILE"
log ""

if [[ $FAILED -gt 0 ]]; then
  log "${YELLOW}提示: 失敗的圖片可以用 --id 參數單獨重試${NC}"
  log "  例如: $0 --id SC04_05"
fi

exit $FAILED
