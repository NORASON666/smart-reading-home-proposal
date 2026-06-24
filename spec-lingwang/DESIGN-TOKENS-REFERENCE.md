# Design Tokens 對照速查表

> 來源：`design-tokens-full.json`（與 Figma HyVue CMS 1.1 100% 對齊）  
> 使用：在 HTML `<head>` 引入 `design-tokens.css`，替換掉舊的 `css-variables.css`

---

## 如何引入

```html
<link rel="stylesheet" href="./design-tokens.css">
```

---

## 顏色對照

### 主色（Primary）

| Figma Token | CSS 變數 | 色碼 | 用途 |
|-------------|----------|------|------|
| `Sys/Color/Primary/30` | `--color-primary-30` | `#014d92` | hover / active 狀態 |
| `Sys/Color/Primary/50` | `--color-primary-50` | `#0463b8` | 主按鈕、連結 |
| `Sys/Color/Primary/70` | `--color-primary-70` | `#e6eef6` | 淡藍背景 |

### 中性色（Neutral）

| Figma Token | CSS 變數 | 色碼 | 用途 |
|-------------|----------|------|------|
| `Sys/Color/Neutral/0` | `--color-neutral-0` | `#111111` | 最深色 |
| `Sys/Color/Neutral/10` | `--color-neutral-10` | `#333333` | **主文字** |
| `Sys/Color/Neutral/20` | `--color-neutral-20` | `#555555` | 次要文字 |
| `Sys/Color/Neutral/30` | `--color-neutral-30` | `#69707d` | Placeholder |
| `Sys/Color/Neutral/40` | `--color-neutral-40` | `#97a3b6` | 停用 / 邊框輔助 |
| `Sys/Color/Neutral/60` | `--color-neutral-60` | `#dee0e3` | 分隔線 / 邊框 |
| `Sys/Color/Neutral/70` | `--color-neutral-70` | `#f1f1f1` | 淺灰背景 |
| `Sys/Color/Neutral/80` | `--color-neutral-80` | `#f8f8f8` | **頁面底色** |
| `Sys/Color/Neutral/100` | `--color-neutral-100` | `#ffffff` | 白色 |

### 狀態色（Status）

| 語意 | 深色 CSS 變數 | 淺色 CSS 變數 | 深色色碼 | 淺色色碼 |
|------|-------------|-------------|---------|---------|
| 錯誤 Error | `--color-error-dark` | `--color-error-light` | `#c40000` | `#ffedf1` |
| 成功 Success | `--color-success-dark` | `--color-success-light` | `#00754b` | `#eef8e4` |
| 警告 Warning | `--color-warning-dark` | `--color-warning-light` | `#c23e00` | `#faece6` |
| 資訊 Info | `--color-info-dark` | `--color-info-light` | `#00529b` | `#e7f3ff` |
| 預設 Default | `--color-default-dark` | `--color-default-light` | `#333333` | `#f8f8f8` |

---

## 字型排版對照

### 直接使用 class（推薦）

```html
<!-- Heading -->
<h1 class="text-h1">標題一</h1>
<h2 class="text-h2">標題二</h2>
<h3 class="text-h3">標題三</h3>
<h4 class="text-h4">標題四</h4>
<p class="text-h-lg">超大標題</p>

<!-- Body -->
<p class="text-body-16">內文 16px</p>
<p class="text-body-16-bold">粗體內文 16px</p>
<p class="text-body-14">說明文字 14px</p>
<p class="text-body-14-bold">粗體說明 14px</p>
<p class="text-body-18-bold">強調內文 18px</p>
```

### 字型 token 細節

| Figma Token | class | 字級 | 字重 | 行高 | 字距 |
|-------------|-------|------|------|------|------|
| `H_lg` | `.text-h-lg` | 48px | 900 | 48px | 1.2px |
| `H1` | `.text-h1` | 32px | 700 | 40px | 1.2px |
| `H2` | `.text-h2` | 28px | 700 | 32px | 1.2px |
| `H3` | `.text-h3` | 20px | 700 | 28px | 1.2px |
| `H4` | `.text-h4` | 18px | 700 | 28px | 0.6px |
| `Body 18px Bold` | `.text-body-18-bold` | 18px | 700 | 36px | 0.6px |
| `Body 16px` | `.text-body-16` | 16px | 400 | 32px | 0.6px |
| `Body 16px Bold` | `.text-body-16-bold` | 16px | 700 | 32px | 0.6px |
| `Body 14px` | `.text-body-14` | 14px | 400 | 28px | 0.6px |
| `Body 14px Bold` | `.text-body-14-bold` | 14px | 700 | 28px | 0.6px |

---

## 圓角對照

| Figma Token | CSS 變數 | 值 | 用途 |
|-------------|----------|----|------|
| `sys/Radius/sm` | `--radius-sm` | 4px | 標籤、小元件 |
| `sys/Radius/def` | `--radius-def` | 8px | 預設（卡片、輸入框）|
| `sys/Radius/med` | `--radius-med` | 12px | 按鈕、中型元件 |
| `sys/Radius/lg` | `--radius-lg` | 24px | 大型卡片 |
| `sys/Radius/full` | `--radius-full` | 120px | 膠囊型（Chip、Badge）|

---

## 陰影對照

| Figma Token | CSS 變數 | 用途 |
|-------------|----------|------|
| `Shadow 20` | `--shadow-20` | 輕微浮起（dropdown）|
| `Shadow 40` | `--shadow-40` | 卡片懸浮 |
| `Shadow 60` | `--shadow-60` | Modal / Dialog |
| `Shadow 100` | `--shadow-100` | 強調浮層 |

---

## 舊版 css-variables.css → 新版對照

更新 HTML 時，搜尋舊變數名稱並替換：

| 舊 `css-variables.css` | 新 `design-tokens.css` |
|-----------------------|----------------------|
| `var(--sys-color-primary-50)` | `var(--color-primary-50)` |
| `var(--sys-color-primary-30)` | `var(--color-primary-30)` |
| `var(--sys-color-primary-70)` | `var(--color-primary-70)` |
| `var(--sys-color-neutral-10)` | `var(--color-neutral-10)` |
| `var(--sys-color-neutral-30)` | `var(--color-neutral-30)` |
| `var(--sys-color-neutral-60)` | `var(--color-neutral-60)` |
| `var(--sys-color-neutral-80)` | `var(--color-neutral-80)` |
| `var(--sys-color-neutral-100)` | `var(--color-neutral-100)` |
| `var(--sys-radius-med)` | `var(--radius-med)` |
| `var(--sys-radius-def)` | `var(--radius-def)` |
| `var(--ref-font-size-14)` | `var(--font-size-14)` |
| `var(--ref-font-face-face)` | `var(--font-face)` |
| `var(--ref-color-neutral-100)` | `var(--color-neutral-100)` |
| `var(--sys-spacing-xl)` | `var(--spacing-xl)` |
| `var(--sys-color-additional-error-darkness)` | `var(--color-error-dark)` |
| `var(--sys-color-additional-sucsess-darkness)` | `var(--color-success-dark)` |
| `var(--sys-color-additional-warning-darkness)` | `var(--color-warning-dark)` |

---

## index-v3.html 需要的特別處理

`index-v3.html` 目前使用自訂的 coral 色系（非 HyVue 設計系統），若要對齊設計規範需討論：

| 目前自訂色 | 色碼 | 建議替換 |
|-----------|------|---------|
| `--coral` | `#E07560` | 討論後決定（非 HyVue 標準色）|
| `--coral-dk` | `#C8614E` | 同上 |
| `--coral-lt` | `#FEF0ED` | 同上 |

---

## 注意事項

1. **字型載入**：`design-tokens.css` 只定義變數，需另外確保 Google Fonts `Noto Sans TC` 已載入
2. **漸層**：`--color-gradients-b/c` 需自行組合 `linear-gradient()`，沒有直接的漸層變數
3. **`Hyweb blue gradient`**：Figma 中為空值，待設計確認實際漸層定義
