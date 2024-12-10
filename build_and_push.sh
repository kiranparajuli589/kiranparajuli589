#!/bin/zsh

git checkout dist
rm -rf assets index.html blogBase
git add .
git commit -m "Prepare dist ""$(date '+%Y-%m-%d')"
git checkout main
pnpm build
git checkout dist
mv dist/assets .
mv dist/blogBase .
mv dist/index.html .
rm -rf dist
git add .
git commit --amend --no-edit
git push
git checkout main



