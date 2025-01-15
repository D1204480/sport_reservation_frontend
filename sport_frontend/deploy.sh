#!/usr/bin/env sh

# 發生錯誤時執行終止指令
set -e

# 打包編譯
npm run build

# 移動到打包資料夾下，若你有調整的話打包後的資料夾請務必調整
cd dist

# 初始化 git
git init
git add -A
git commit -m 'deploy'

# 部署到 github pages
git push -f git@github.com:<D1204480>/<sport_reservation_frontebd>.git master:gh-pages

cd -