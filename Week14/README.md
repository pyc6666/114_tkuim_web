# 課程管理系統 (Course Management System)

一個使用純 HTML、CSS 和 JavaScript 開發的現代化課程管理系統，提供課程瀏覽、成績查詢和行事曆管理功能。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 目錄

- [功能特色](#功能特色)
- [專案結構](#專案結構)
- [技術架構](#技術架構)
- [快速開始](#快速開始)
- [使用說明](#使用說明)
- [開發指南](#開發指南)
- [資料格式](#資料格式)
- [瀏覽器支援](#瀏覽器支援)
- [授權資訊](#授權資訊)

## ✨ 功能特色

### 📚 課程管理
- **課程瀏覽**：以卡片形式展示所有課程
- **智能搜尋**：支援課程名稱和代碼搜尋
- **多維度篩選**：
  - 學年篩選（113、114、115）
  - 學期篩選（第一學期、第二學期）
  - 課程性質（必修、選修、通識）
  - 開課單位（資訊工程系、電機工程系等）
  - 年級篩選（一年級至四年級）
  - 進度狀態（進行中、已完成、即將開始）
- **課程詳情**：查看課程概述和更多選項

### 📊 成績查詢
- **成績總覽**：
  - 總平均 GPA 顯示
  - 已修學分統計
  - 班級排名
  - 優等課程數量
- **成績表格**：
  - 按學年學期分組顯示
  - 顯示課程名稱、代碼、性質、學分、教師、排名、成績
  - 成績等級顏色標示（優秀、良好、平均、及格、不及格）
  - 學期 GPA 自動計算
- **成績分析**：
  - 成績分布圖表
  - 學期 GPA 趨勢圖
- **資料篩選**：按學年、學期、課程性質篩選
- **匯出功能**：支援成績單匯出（示範功能）

### 📅 行事曆管理
- **月曆檢視**：
  - 完整月曆網格顯示
  - 事件標示（作業、考試、課程、截止日等）
  - 今日高亮顯示
  - 月份切換導航
- **快速統計**：
  - 本月作業數量
  - 本月考試數量
  - 待辦事項數量
  - 已完成項目數量
- **多種檢視模式**：
  - 月檢視：完整月曆網格
  - 列表檢視：事件列表排序
- **即將到來**：顯示最近 6 個即將到來的事件
- **事件詳情**：點擊事件查看完整資訊（課程、類型、日期、時間、地點、說明）

### 🎨 設計特色
- **現代化 UI**：採用卡片式設計，視覺清晰
- **漸層配色**：豐富的漸層色彩系統
- **流暢動畫**：淡入、滑動等過渡效果
- **響應式設計**：完美支援桌面、平板、手機
- **直覺導航**：頂部導航欄和側邊欄雙重導航

## 📁 專案結構

```
Week14/
├── index.html              # 課程頁面
├── grades.html             # 成績頁面
├── calendar.html           # 行事曆頁面
├── start-server.ps1        # 本地伺服器啟動腳本
├── README.md               # 專案說明文件
├── todo.md                 # 原始需求文件
│
├── css/                    # 樣式檔案
│   ├── main.css           # 共用樣式（導航、側邊欄、按鈕等）
│   └── pages.css          # 頁面特定樣式（使用命名空間）
│
├── js/                     # JavaScript 檔案
│   ├── common.js          # 共用工具函數和 UI 處理
│   ├── data-loader.js     # 資料載入器（支援快取）
│   └── app.js             # 頁面邏輯（模組化設計）
│
└── data/                   # JSON 資料檔案
    ├── courses.json       # 課程資料（8 筆）
    ├── grades.json        # 成績資料（15 筆）
    └── events.json        # 行事曆事件（12 筆）
```

## 🏗️ 技術架構

### 前端技術
- **HTML5**：語義化標籤，良好的 SEO 結構
- **CSS3**：
  - CSS Variables（自訂屬性）
  - Flexbox 和 Grid 佈局
  - 動畫和過渡效果
  - 響應式媒體查詢
- **JavaScript (ES6+)**：
  - 模組化設計
  - Async/Await 非同步處理
  - Fetch API 資料載入
  - 事件委派

### 設計模式
- **關注點分離**：資料、樣式、邏輯完全分離
- **模組化架構**：每個頁面獨立模組
- **命名空間**：CSS 使用 `.page-*` 前綴避免衝突
- **快取機制**：DataLoader 自動快取 JSON 資料

### 資料管理
- **JSON 格式**：標準化資料儲存
- **非同步載入**：不阻塞頁面渲染
- **錯誤處理**：完整的錯誤處理和降級方案
- **快取優化**：避免重複載入相同資料

## 🚀 快速開始

### 環境需求
- 現代瀏覽器（Chrome、Firefox、Safari、Edge）
- 本地 Web 伺服器（必須，避免 CORS 問題）

### 安裝步驟

1. **下載專案**
   ```bash
   git clone <repository-url>
   cd Week14
   ```

2. **啟動本地伺服器**

   **方式 1：使用 PowerShell 腳本（推薦）**
   ```powershell
   .\start-server.ps1
   ```

   **方式 2：使用 Python**
   ```bash
   python -m http.server 8000
   ```

   **方式 3：使用 VS Code Live Server**
   - 安裝 Live Server 擴充功能
   - 右鍵點擊 `index.html`
   - 選擇 "Open with Live Server"

   **方式 4：使用 Node.js**
   ```bash
   npx http-server -p 8000
   ```

3. **開啟瀏覽器**
   ```
   http://localhost:8000
   ```

### ⚠️ 重要提醒

**必須使用本地伺服器**，不能直接用 `file:///` 協議開啟 HTML 檔案，否則會遇到 CORS 錯誤，無法載入 JSON 資料。

## 📖 使用說明

### 課程頁面
1. 在搜尋框輸入課程名稱或代碼
2. 使用下拉選單進行多維度篩選
3. 點擊「搜尋」按鈕或按 Enter 執行搜尋
4. 點擊課程卡片上的「課程概述」查看詳情
5. 點擊「更多」查看其他選項

### 成績頁面
1. 查看頂部統計卡片了解整體表現
2. 使用篩選器選擇學年、學期、課程性質
3. 查看成績表格，按學期分組顯示
4. 觀察成績分布和 GPA 趨勢圖表
5. 點擊「匯出成績單」按鈕（示範功能）

### 行事曆頁面
1. 使用左右箭頭切換月份
2. 點擊「今天」按鈕快速回到當前月份
3. 切換「月檢視」或「列表檢視」
4. 點擊月曆上的事件查看詳情
5. 查看「即將到來」區塊了解近期事件

## 🛠️ 開發指南

### 修改資料

所有資料都儲存在 `data/` 資料夾的 JSON 檔案中：

**編輯課程資料**
```bash
# 編輯 data/courses.json
# 格式：
{
  "courses": [
    {
      "id": 1,
      "title": "課程名稱",
      "code": "課程代碼",
      "department": "cs",
      "type": "required",
      ...
    }
  ]
}
```

**編輯成績資料**
```bash
# 編輯 data/grades.json
# 格式：
{
  "grades": [
    {
      "id": 1,
      "year": "114",
      "semester": "1",
      "courseName": "課程名稱",
      "score": 92,
      ...
    }
  ]
}
```

**編輯行事曆資料**
```bash
# 編輯 data/events.json
# 格式：
{
  "events": [
    {
      "id": 1,
      "title": "事件標題",
      "type": "exam",
      "date": "2025-12-18",
      ...
    }
  ]
}
```

### 添加新頁面

1. 創建 HTML 檔案
2. 在 `<body>` 添加 `data-page="your-page"` 和 `class="page-your-page"`
3. 在 `css/pages.css` 添加樣式（使用 `.page-your-page` 前綴）
4. 在 `js/app.js` 添加模組
5. 更新所有頁面的導航連結

### 自訂樣式

**修改顏色系統**
```css
/* 編輯 css/main.css */
:root {
    --primary-color: #00bcd4;    /* 主色調 */
    --secondary-color: #3a4a5c;  /* 次要色 */
    --background-color: #f5f7fa; /* 背景色 */
    ...
}
```

**添加動畫**
```css
/* 在 css/main.css 添加 */
@keyframes yourAnimation {
    from { ... }
    to { ... }
}
```

### 擴展功能

**添加新的資料載入方法**
```javascript
// 在 js/data-loader.js
async loadYourData() {
    const data = await this.load('your-data.json');
    return data?.items || [];
}
```

**添加新的工具函數**
```javascript
// 在 js/common.js 的 Utils 物件
yourUtilFunction() {
    // 實作
}
```

## 📊 資料格式

### 課程資料 (courses.json)
```json
{
  "id": 1,                              // 唯一識別碼
  "title": "資料結構與演算法",           // 課程名稱
  "code": "1141TLMX051M300-0B",         // 課程代碼
  "department": "cs",                   // 系所代碼
  "class": "1 B 甲班",                  // 班級
  "startDate": "2025-04-01",            // 開始日期
  "endDate": "2026-01-31",              // 結束日期
  "type": "required",                   // 課程性質
  "credits": 3.0,                       // 學分數
  "year": "114",                        // 學年
  "semester": "1",                      // 學期
  "grade": "2",                         // 年級
  "progress": "ongoing",                // 進度狀態
  "icon": "💻"                          // 圖示
}
```

### 成績資料 (grades.json)
```json
{
  "id": 1,                              // 唯一識別碼
  "year": "114",                        // 學年
  "semester": "1",                      // 學期
  "courseName": "資料結構與演算法",      // 課程名稱
  "courseCode": "CS2101",               // 課程代碼
  "type": "required",                   // 課程性質
  "credits": 3.0,                       // 學分數
  "score": 92,                          // 成績
  "rank": "5/120",                      // 排名
  "teacher": "陳教授"                    // 授課教師
}
```

### 事件資料 (events.json)
```json
{
  "id": 1,                              // 唯一識別碼
  "title": "資料結構期中考",             // 事件標題
  "course": "資料結構與演算法",          // 相關課程
  "type": "exam",                       // 事件類型
  "date": "2025-12-18",                 // 日期
  "time": "09:00-11:00",                // 時間
  "location": "資訊館 101",             // 地點（選填）
  "description": "範圍：第 1-6 章..."   // 說明
}
```

### 資料類型說明

**課程性質 (type)**
- `required`: 必修
- `elective`: 選修
- `general`: 通識

**進度狀態 (progress)**
- `ongoing`: 進行中
- `completed`: 已完成
- `upcoming`: 即將開始

**事件類型 (type)**
- `exam`: 考試
- `assignment`: 作業
- `class`: 課程
- `deadline`: 截止日
- `other`: 其他

## 🌐 瀏覽器支援

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**需要的功能支援：**
- CSS Grid 和 Flexbox
- CSS Variables
- Fetch API
- Async/Await
- ES6 模組語法

## 🔧 故障排除

### 問題：頁面顯示「沒有找到符合條件的課程/成績/事件」

**原因**：CORS 錯誤，無法載入 JSON 檔案

**解決方案**：
1. 確認使用本地伺服器（不是直接開啟 HTML）
2. 檢查 Console 是否有錯誤訊息
3. 確認 JSON 檔案路徑正確

### 問題：資料沒有更新

**原因**：瀏覽器快取

**解決方案**：
1. 硬性重新整理（Ctrl + Shift + R 或 Cmd + Shift + R）
2. 清除瀏覽器快取
3. 使用 DataLoader.clearCache() 清除應用快取

### 問題：樣式錯亂

**原因**：CSS 檔案載入失敗

**解決方案**：
1. 檢查 CSS 檔案路徑
2. 確認 `<link>` 標籤正確
3. 檢查 Console 是否有 404 錯誤

## 📝 更新日誌

### Version 1.0.0 (2025-12-15)
- ✨ 初始版本發布
- ✅ 實作課程管理功能
- ✅ 實作成績查詢功能
- ✅ 實作行事曆管理功能
- ✅ 資料與邏輯分離（JSON + DataLoader）
- ✅ 響應式設計支援
- ✅ 完整的錯誤處理

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權資訊

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 👥 作者

- 開發者：Your Name
- 聯絡方式：your.email@example.com

## 🙏 致謝

- 設計靈感來自現代化的課程管理系統
- 使用 Google Fonts (Noto Sans TC)
- Emoji 圖示來自 Unicode 標準

---

**⭐ 如果這個專案對你有幫助，請給個星星！**
