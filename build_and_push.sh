#!/bin/zsh

git checkout dist
rm -rf assets index.html blogBase blogs.json
git add .
git commit -m "Prepare dist ""$(date '+%Y-%m-%d')"
git checkout old-main
pnpm build
git checkout dist
mv dist/assets .
mv dist/blogBase .
mv dist/index.html .
mv dist/blogs.json .
rm -rf dist
git add .
git commit --amend --no-edit
git push
git checkout old-main



