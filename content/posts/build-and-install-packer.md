---
title: packerをビルドしてインストール
date: 2016-12-19T23:01:04+09:00
categories:
  - technology
  - linux
tags:
  - archlinux
  - lifelog
---

[yaourtをビルドしてインストール](http://blog.surume.tk/yaourt-build-install/)に対抗して。

```bash
cd /tmp
mkdir aur
cd aur
git clone https://aur.archlinux.org/packer.git
cd packer
makepkg -sri
cd ../../
rm -rf aur
```
個人的にはpackerのほうが軽いし依存も少ないしで好きです。
