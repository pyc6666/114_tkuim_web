# 本地伺服器啟動腳本
# 使用 Python 內建的 HTTP 伺服器

Write-Host "正在啟動本地伺服器..." -ForegroundColor Green
Write-Host "伺服器位址: http://localhost:8000" -ForegroundColor Cyan
Write-Host "按 Ctrl+C 停止伺服器" -ForegroundColor Yellow
Write-Host ""

# 啟動 Python HTTP 伺服器
python -m http.server 8000
