---
title: プチコン3号乱数解析の話
date: 2017-07-17T08:29:58+09:00
categories:
  - technology
tags:
  - smilebasic
  - math
---

<div class="miiverse-post" lang="ja" data-miiverse-cite="https://miiverse.nintendo.net/posts/AYMHAAADAAADV44GjdVvow" data-miiverse-embedded-version="1"></div><script async src="https://miiverse.nintendo.net/js/embedded.min.js" charset="utf-8"></script>
プチコン界隈ではこの投稿が衝撃をもたらしたとかもたらしてないとかという話ですが、今回はこの解析の方法について書きます。
なお、この解析結果はプチコン3号限定です。(プチコンBIGはまた別の乱数生成アルゴリズムを採用しているらしい)

# 乱数の内部実装を予測する
## なぜか
SmileBasicにおいて乱数を取得する方法は、 0からK-1までの乱数を生成する`RND(K)`と、0から1までの乱数を生成する`RNDF()`があります。
つまり、プチコン内から直接これらの関数の内部で使用されている"生"の乱数を取得する方法はありません。
そのため、乱数生成アルゴリズムを知るには、これらの関数の実装を予測し、"生"の乱数を計算する必要があります。
## 予想
とりあえず、実装が簡単そうな`RNDF()`について予想してみましょう 。
```c
double RNDF() {
  return raw_rand() / RND_MAX;
} 
```
ここでは`raw_rand()`は0から`RND_MAX`までの整数の乱数を返す関数とします。
`RNDF()`の仕様から考えて、これ以外の実装はあまり考えられないでしょう。

次は`RND(K)`です。 これは、複数の実装が考えられます。
1つ目は`RNDF()`を内部で利用する方法です。
```c
int RND(int K) {
  return (int)( RNDF() * K );
} 
```
 `RNDF()`の範囲を拡大する方法ですね。

 2つ目は`raw_rand()`の余りを取る方法です。
```c
int RND(int K) {
  return raw_rand() % K
} 
```
`raw_rand()`のアルゴリズムが線形合同法だとプログラマー格付けチェックに引っかかるあれですね。

## 実験
次のコードを使います。
```basic
RANDOMIZE 0,1
?"RNDF",RNDF()

RANDOMIZE 0,1
?"RND ",RND(&H7FFFFFFF)/&H7FFFFFFF
```
`RANDOMIZE`命令を使って乱数のシード値を1に固定しています。
もし`RND(K)`の実装が内部で`RNDF()`を利用する実装の場合、`RND(K)`の値をKで割ることによって`RNDF()`に近い値が得られると考えられます。
では実行してみましょう。
```
RNDF 0.59263361
RND 0.18526723
```
2つの値が大きく異なっています。

## 結果
この結果から`RND(K)`と`RNDF()`の実装を予測することができます。
```c
int RND(int K) {
  return raw_rand() % K
} 

double RNDF() {
  return raw_rand() / RND_MAX;
} 
```

# "生"の乱数値を計算する
乱数関数の実装を知ることができたので、"生"の乱数値を計算できます。
次のコードを使います。
```basic
DEF R(K)
 RANDOMIZE 0,1
 return RND(K)
END

?R(&H7FFFFFFF)
?R(&H7FFFFFFE)
?R(&H7FFFFFFD)
?R(&H7FFFFFFC)
```
結果はこのようになります。
```
397858342
397858343
397858344
397858345
```
`R(K)`に渡す値を1減らすたびに結果が1増えていて、規則性を感じますね。
`R(K)`は"生"の乱数の値を`K`で割った余りなので、この時の"生"の乱数を`X`とします。


$$
\displaystyle
X=K\times n+R(K)
$$


するとこのように表すことができます。

これに実際の数字を代入してみましょう。

<!--textlint-disable-->
$$
\displaystyle
\begin{eqnarray}
\left\\{
  \begin{array}{@{}1}
    X=2147483647\times n+397858342 \\\\\\
    X=2147483646\times n+397858343
  \end{array}
\right.
\end{eqnarray}
$$
<!--textlint-enable-->


これを解くと、
$\displaystyle
X=2545341989,\\,n=1$
より、シード値が1のときの"生"の乱数は2545341989であると考えられます。

# 乱数生成アルゴリズムを推測する
一口に乱数生成アルゴリズムといっても様々な種類があります。
それらについてより深く知るためにGoogle先生の力を借りましょう。
![びっくり](https://static.tosukeapps.tk/analyze-rng/ex.jpg)
一瞬で答えが出てしまいました。
このことから、__プチコン3号の乱数生成アルゴリズムはTiny Mersenne Twisterである__ということがわかります。

# あとがき
最初にも書きましたが、プチコンBIGの乱数生成アルゴリズムはプチコン3号とは違います。
また、SmileBasicは[PasocomMini](https://www.pcmini.jp)にも搭載される予定ですが、これの乱数生成アルゴリズムも他とは異なる可能性があります。
いつかこれらの解析もしたいですね。(投げやり)