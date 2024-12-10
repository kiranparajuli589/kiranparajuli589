#!/bin/sh

cd $HOME/kiranparajuli589 || exit
git pull
cd $HOME/kiranparajuli.com.np || exit
rm -rf assets index.html
cp -r $HOME/kiranparajuli589/assets .
cp $HOME/kiranparajuli589/index.html .
