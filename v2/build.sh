#!/usr/bin/env bash

echo "Building..."
yarn build
echo "Build finished!"
cd docs || exit
echo "Updating docs..."
rm -rf css fonts index.html js letter_k.png
cd .. || exit
mv dist/* docs/
rm -rf dist
echo "Docs update finished!"
echo "Cheers!"

