#!/bin/bash
# ============================================================
# Yuki 溫泉結局 — 5張特製場景生成
# ============================================================
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_DIR="$PROJECT_ROOT/assets/images/scene_yuki"
MODEL="grok-imagine-image-pro"

# --- 檢查 API 金鑰 ---
if [[ -z "${XAI_API_KEY:-}" ]]; then
  echo -e "${RED}錯誤: 請先設定 export XAI_API_KEY=\"your-key\"${NC}"
  exit 1
fi

if ! command -v jq &>/dev/null; then
  echo -e "${RED}錯誤: 需要 jq (brew install jq)${NC}"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

# --- 5 張溫泉結局場景 ---
declare -a NAMES=(
  "scene_yuki_onsen_01_together.png"
  "scene_yuki_onsen_02_whisper.png"
  "scene_yuki_onsen_03_backleaning.png"
  "scene_yuki_onsen_04_faceto face.png"
  "scene_yuki_onsen_05_embrace.png"
)

declare -a PROMPTS=(
  # 1. 一起踏入露天溫泉 — 害羞初入浴
  "Anime style, gorgeous outdoor Japanese hot spring onsen at night under moonlight. A young couple stepping into the steaming water together. The beautiful half-Japanese woman with long flowing black hair has a white towel wrapped around her body, blushing deeply with shy expression, one foot testing the water. The young man beside her looking away gentlemanly. Cherry blossom petals falling, stone lanterns glowing warmly, steam rising dramatically. Natural rock pool surrounded by bamboo and maple trees. Romantic and nervous atmosphere. Cinematic composition. Ultra high quality illustration."

  # 2. 溫泉中低語私語 — 靠近耳邊說話
  "Anime style, intimate outdoor onsen hot spring scene at night. A beautiful woman with long wet black hair leaning close to whisper in a young mans ear, her lips almost touching his earlobe. Both submerged in steaming water up to their shoulders. Her eyes half-closed with a playful seductive smile. His face bright red with surprise. Moonlight reflecting on the water surface, steam swirling around them creating a dreamy veil. Stone lanterns and cherry blossoms in background. Sensual and teasing atmosphere. Warm and cool light contrast. Ultra high quality."

  # 3. 背靠背依偎 — 仰望星空
  "Anime style, serene outdoor Japanese onsen at night. A young couple sitting back to back in the hot spring water, leaning against each other. The woman with long black hair cascading over her bare shoulders, eyes closed peacefully, slight smile. The man looking up at the starry sky. Water level at their upper chest. Steam creating a soft haze. Spectacular starry night sky with Milky Way visible. Stone garden, wooden fence, lantern light. Intimate and peaceful atmosphere of two souls connected. Breathtaking composition. Ultra high quality."

  # 4. 面對面深情對望 — 水中牽手
  "Anime style, romantic outdoor onsen scene at night. A young couple facing each other very close in the hot spring. The beautiful woman with wet black hair clinging to her neck and shoulders, gazing into the mans eyes with deep emotion and desire, lips slightly parted. Their hands intertwined under the water surface, visible through the clear steaming water. Faces inches apart, noses almost touching. Cherry blossom petals floating on the water around them. Moonlight backlighting creating silhouette glow on their hair. Intensely romantic and passionate atmosphere. Cinematic close-up. Ultra high quality."

  # 5. 溫泉擁抱 — 結局高潮
  "Anime style, breathtaking outdoor onsen ending CG illustration. A passionate embrace between a young couple in a moonlit hot spring. The beautiful woman with long wet black hair wrapping her arms around the mans neck, pulling him close, her back arched slightly. His arms around her waist. Water splashing gently from their movement. Steam and cherry blossom petals swirling dramatically around them like a vortex. Full moon large in the sky, casting silver light. Stone lanterns, bamboo, Japanese garden. Deeply passionate and emotional climax scene. Dynamic composition with motion blur effects. Poster-quality ultra high resolution illustration."
)

# Fix filename with space
NAMES[3]="scene_yuki_onsen_04_facetoface.png"

echo ""
echo -e "${CYAN}╔════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  🌸 Yuki 溫泉結局 — 5張特製場景生成      ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════╝${NC}"
echo ""

SUCCESS=0
FAILED=0

for i in {0..4}; do
  filename="${NAMES[$i]}"
  prompt="${PROMPTS[$i]}"
  output_path="$OUTPUT_DIR/$filename"
  num=$((i + 1))

  echo -e "${CYAN}🎨 [$num/5] 生成中: $filename ...${NC}"
  echo -e "   提示詞: ${prompt:0:80}..."

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

  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')

  if [[ "$http_code" != "200" ]]; then
    error_msg=$(echo "$body" | jq -r '.error.message // .error // "Unknown"' 2>/dev/null || echo "HTTP $http_code")
    echo -e "${RED}   ❌ 失敗: $error_msg${NC}"
    ((FAILED++))
    sleep 2
    continue
  fi

  # 下載圖片
  url=$(echo "$body" | jq -r '.data[0].url // empty' 2>/dev/null)
  if [[ -n "$url" ]]; then
    curl -s -o "$output_path" "$url" --max-time 60
  else
    b64_data=$(echo "$body" | jq -r '.data[0].b64_json // empty' 2>/dev/null)
    if [[ -n "$b64_data" ]]; then
      echo "$b64_data" | base64 -d > "$output_path"
    else
      echo -e "${RED}   ❌ 無法解析回應${NC}"
      ((FAILED++))
      continue
    fi
  fi

  # 驗證
  filesize=$(stat -f%z "$output_path" 2>/dev/null || stat -c%s "$output_path" 2>/dev/null)
  if [[ "$filesize" -gt 1024 ]]; then
    echo -e "${GREEN}   ✅ 完成! $(du -h "$output_path" | cut -f1)${NC}"
    ((SUCCESS++))
  else
    echo -e "${RED}   ❌ 檔案損壞${NC}"
    rm -f "$output_path"
    ((FAILED++))
  fi

  # 間隔避免 rate limit
  if [[ $i -lt 4 ]]; then
    echo -e "   ⏳ 等待 5 秒..."
    sleep 5
  fi
done

echo ""
echo -e "════════════════════════════════════════"
echo -e "📊 結果: ${GREEN}成功 $SUCCESS${NC} / ${RED}失敗 $FAILED${NC} / 共 5 張"
echo -e "📁 輸出: $OUTPUT_DIR/"
echo ""

if [[ $SUCCESS -gt 0 ]]; then
  echo -e "${GREEN}生成的檔案:${NC}"
  for f in "${NAMES[@]}"; do
    if [[ -f "$OUTPUT_DIR/$f" ]]; then
      echo "  ✅ $f ($(du -h "$OUTPUT_DIR/$f" | cut -f1))"
    fi
  done
fi
