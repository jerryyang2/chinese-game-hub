# 國語遊戲集合站

南一、康軒、翰林三個版本的選單式入口。一至六年級、上下學期，先選冊別，再進入原遊戲。純靜態網站，入口不要求登入或密碼。

正式網址：https://jerryyang2.github.io/chinese-game-hub/

## 遊戲連結

- 南一版：https://jerryyang2.github.io/nani-grade-six-mondrian/
- 康軒版：https://jerryyang2.github.io/kangxuan-chinese-arena/
- 翰林版：https://hanlin-language-arena-123.asterina-co.chatgpt.site/

三站於2026-11-18以匿名HTTP請求確認可開啟，並在瀏覽器驗證對應冊別。若原站網址改變，須同步修改 `web/app.js` 的 `versions` 與 `web/index.html` 的備援連結。入口只傳遞 `grade=1..6` 與 `semester=upper|lower`；任務、題數及單人／2隊／4隊人數在原遊戲內選擇。

南一、康軒提供一至三年級注音，翰林提供一至六年級注音。翰林閱讀關使用原創延伸短文；各版本教材年度與詳細內容以原站說明為準。所有版本皆為自主製作工具，非出版社官方網站。

## 功能

- 年級、學期選擇同時更新三個入口，共36個課程連結。
- 以網址參數分享指定年級／學期；按鈕可複製目前入口網址。
- 瀏覽器記住最後選擇的冊別。無法存取本機儲存時仍可操作；剪貼簿不可用時顯示可自行複製的網址。
- 遊戲在同一分頁開啟，瀏覽器上一頁可返回入口。未啟用JavaScript時仍有可用的預設遊戲連結。
- 手機單欄卡片、年級三欄；桌面三欄入口。支援鍵盤焦點及裝置減少動態設定。
- 專屬三本書favicon。南一與康軒卡片沿用自主製作的既有SVG，其他插圖為本入口自行繪製，不使用出版社標誌。

入口僅在本機保存年級與學期偏好，不讀取、合併或上傳各遊戲的學生紀錄；各站錯題、局數與集章仍由各站保存。

## 建置

```sh
node --check web/app.js
node scripts/build.mjs
python3 -m http.server 8770 --directory dist
```

不需要第三方套件。`web/`為來源、`dist/`為忽略追蹤的發布目錄；GitHub Actions於main更新時建置並發布Pages。

## 社群宣傳素材

- [1080 × 1350社群宣傳圖](https://jerryyang2.github.io/chinese-game-hub/social/chinese-game-hub-social.png)
- [2160 × 2700高解析宣傳圖](https://jerryyang2.github.io/chinese-game-hub/social/chinese-game-hub-social-2x.png)
- [集合站QR Code](https://jerryyang2.github.io/chinese-game-hub/social/chinese-game-hub-qr.png)

貼文、原始插畫、可編輯SVG、產圖提示詞及驗收紀錄位於 `promotion/2026-11-18/`。原始插畫由內建image_gen產生，文字及QR在新SVG版型排版；所有交付圖檔均已解碼確認QR網址。海報可選擇性由 `scripts/render-social-poster.mjs` 重製，不影響無套件的網站建置。

集合站訪客畫面不顯示宣傳素材區、下載宣傳圖與複製推薦貼文按鈕，也不發布推薦貼文文字檔。宣傳圖與原始推薦貼文仍保留在專案中供製作者使用；圖片既有檔案網址未移除。
