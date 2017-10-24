---
title: ddoxを使う
date: 2017-03-21 23:35:34
categories:
  - technology
  - dlang
tags:
  - lifelog
---

皆さん、D言語使ってますか
ドキュメント書いてますか(ブーメラン)

# ddoxとは

[ddox](https://github.com/rejectedsoftware/ddox)は、D言語界隈では馴染みの深いRejected Softwareによって開発されている、高機能なドキュメント生成エンジンです。同じくRejected Softwareによって開発されている[vibe.d](http://vibed.org/)によってサーバーを建ててドキュメントを閲覧したり、静的にドキュメントを生成してgithub pagesに配置しておくこともできます。事前にフィルタをかけることでドキュメントとして公開するモジュールを制御することも可能な、とても強力なツールです。


# ddoxを使う

ddoxはRejected Softwareによって開発されているので、Rejected Softwareを中心に開発されている[dub](https://github.com/dlang/dub)を使っている場合は簡単に利用できます。
試しに現在私が開発中のライブラリ[dpromise](https://github.com/Tosuke/dpromise)のドキュメントを生成してみましょう。
今回は、ddoxが生成するドキュメントをきれいに表示してくれるライブラリ[scod](https://github.com/MartinNowak/scod)を利用することにします。
ddoxで利用するテーマを変更する場合、dub.jsonに`"-ddoxTool": "scod"`と記述します。
それでは生成してみましょう。
```
$ dub run --build=ddox
```
{{<figure src="https://static.tosukeapps.tk/use-ddox/scod.jpg" title="scod">}}

いい感じですね。
```
$ dub build --build=ddox
```
また、このようにすることでdocsフォルダに静的にページを生成してくれます。

# 落とし穴

非常に便利なddoxですが、大きな落とし穴があります。
もし、あなたが複雑な設定をするために自力でddoxを利用する設定を書いたとします。
例えば、このようにです。
``` json
"buildTypes": {
  "ddoc": {
    "dflags": [
      "-Xfdocs.json"
    ],
    "postBuildCommands": [
      "dub run scod -- filter --only-documented --unittest-examples docs.json",
      "dub run scod -- generate-html docs.json docs"
    ]
  }
}
```
これをdub.jsonに追記し、`$ dub build --build=ddoc`を実行したとします。
その場合、このようなエラーを吐くことがあります。
私はこれにハマりました。
```
core.exception.RangeError@../../.dub/packages/ddox-0.15.18/ddox/source/ddox/parsers/jsonparser.d(469): Range violation
----------------
??:? _d_arraybounds [0xbd1d33]
??:? ddox.parsers.jsonparser.__array [0x97398a]
??:? _D4ddox7parsers10jsonparser6Parser14parseBasicTypeMFKAAyaC4ddox8entities6EntityJAAyaZ15parseAttributesMFNaNbNfKAAyaAxAyaZv [0x978989]
??:? ddox.entities.Type ddox.parsers.jsonparser.Parser.parseBasicType(ref immutable(char)[][], ddox.entities.Entity, out immutable(char)[][]) [0x978793]
??:? ddox.entities.Type ddox.parsers.jsonparser.Parser.parseType(ref immutable(char)[][], ddox.entities.Entity) [0x9768dd]
??:? ddox.entities.Type ddox.parsers.jsonparser.Parser.parseTypeDecl(ref immutable(char)[][], ddox.entities.Entity) [0x976863]
??:? ddox.entities.Type ddox.parsers.jsonparser.Parser.parseType(immutable(char)[], ddox.entities.Entity) [0x976535]
??:? ddox.entities.Type ddox.parsers.jsonparser.Parser.parseType(vibe.data.json.Json, ddox.entities.Entity, immutable(char)[], bool) [0x976449]
??:? ddox.entities.FunctionDeclaration ddox.parsers.jsonparser.Parser.parseFunctionDecl(vibe.data.json.Json, ddox.entities.Entity) [0x974f7e]
??:? ddox.entities.Declaration ddox.parsers.jsonparser.Parser.parseDecl(vibe.data.json.Json, ddox.entities.Entity) [0x974537]
??:? _D4ddox7parsers10jsonparser6Parser13parseDeclListMFS4vibe4data4json4JsonC4ddox8entities6EntityZ14__foreachbody3MFKS4vibe4data4json4JsonZi [0x974200]
??:? @trusted int vibe.data.json.Json.opApply(scope int delegate(ref vibe.data.json.Json)) [0xbb9c39]
??:? ddox.entities.Declaration[] ddox.parsers.jsonparser.Parser.parseDeclList(vibe.data.json.Json, ddox.entities.Entity) [0x97419e]
??:? ddox.entities.TemplateDeclaration ddox.parsers.jsonparser.Parser.parseTemplateDecl(vibe.data.json.Json, ddox.entities.Entity) [0x976223]
??:? ddox.entities.Declaration ddox.parsers.jsonparser.Parser.parseDecl(vibe.data.json.Json, ddox.entities.Entity) [0x97463a]
??:? _D4ddox7parsers10jsonparser6Parser13parseDeclListMFS4vibe4data4json4JsonC4ddox8entities6EntityZ14__foreachbody3MFKS4vibe4data4json4JsonZi [0x974200]
??:? @trusted int vibe.data.json.Json.opApply(scope int delegate(ref vibe.data.json.Json)) [0xbb9c39]
??:? ddox.entities.Declaration[] ddox.parsers.jsonparser.Parser.parseDeclList(vibe.data.json.Json, ddox.entities.Entity) [0x97419e]
??:? void ddox.parsers.jsonparser.Parser.parseModule(vibe.data.json.Json, ddox.entities.Package) [0x9740d4]
??:? int ddox.parsers.jsonparser.parseJsonDocs(vibe.data.json.Json, ddox.entities.Package).__foreachbody3(ref vibe.data.json.Json) [0x973a9d]
??:? @trusted int vibe.data.json.Json.opApply(scope int delegate(ref vibe.data.json.Json)) [0xbb9c39]
??:? ddox.entities.Package ddox.parsers.jsonparser.parseJsonDocs(vibe.data.json.Json, ddox.entities.Package) [0x973a35]
??:? ddox.entities.Package ddox.main.parseDocFile(immutable(char)[], ddox.settings.DdoxSettings) [0x969835]
??:? int ddox.main.setupGeneratorInput(ref immutable(char)[][], out ddox.settings.GeneratorSettings, out ddox.entities.Package) [0x9683bc]
??:? int ddox.main.cmdGenerateHtml(immutable(char)[][]) [0x967d7a]
??:? int ddox.main.ddoxMain(immutable(char)[][]) [0x967c0d]
??:? _Dmain [0x967307]
??:? _D2rt6dmain211_d_run_mainUiPPaPUAAaZiZ6runAllMFZ9__lambda1MFZv [0xbd8406]
??:? void rt.dmain2._d_run_main(int, char**, extern (C) int function(char[][])*).tryExec(scope void delegate()) [0xbd834c]
??:? void rt.dmain2._d_run_main(int, char**, extern (C) int function(char[][])*).runAll() [0xbd83c2]
??:? void rt.dmain2._d_run_main(int, char**, extern (C) int function(char[][])*).tryExec(scope void delegate()) [0xbd834c]
??:? _d_run_main [0xbd82c6]
??:? main [0x967a17]
??:? __libc_start_main [0x111f8510]
```
これはddox側に問題があるようです。
あまり推奨できる方法ではありませんが、パッケージを直接書きかえることで対処することができます。
.dub/packages下にある使用しているddoxパッケージの中、source/parsers/jsonparser.dの469行目付近にこのような関数があります。
```d
void parseAttributes(ref string[] dst, const(string)[] keywords)
{
	while( tokens.length > 0 ){
		if( tokens.front == "@" ){
			tokens.popFront();
			dst ~= "@"~tokens.front;
			tokens.popFront();
		} else if( keywords.countUntil(tokens[0]) >= 0 && tokens[1] != "(" ){
			dst ~= tokens.front;
			tokens.popFront();
		} else break;
	}
}
```
```d
void parseAttributes(ref string[] dst, const(string)[] keywords)
{
	while( tokens.length > 0 ){
		if( tokens.front == "@" ){
			tokens.popFront();
			dst ~= "@"~tokens.front;
			tokens.popFront();
		} else if( keywords.countUntil(tokens[0]) >= 0 && tokens.length > 2 && tokens[1] != "(" ){
			dst ~= tokens.front;
			tokens.popFront();
		} else break;
	}
}
```
それをこのように書きかえることでこれを防ぐことができます。

# あとがき・怨嗟の声

はっきり言って、Rejected Software製のソフトウェア・ライブラリの質は低いです。
dubやvibe.dなどでD言語の存在感を高めた功績は大きいですが、ソフトウェアの品質が低いことでD言語に対して負の影響がないか心配です。
ちなみにdubは遅いパッケージレジストリに毎回リクエストするなどの問題があり、vibe.dにもカジュアルにnullを返すなどの設計上の問題があります。
私はD言語が流行らない理由としてライブラリの不足も一因であると考えていますが、だからといって品質の低いライブラリを無闇に増やすのも問題です。
D言語は本当に素晴しい言語です。この言語が多くの人々に末長く親しまれることを願っています。