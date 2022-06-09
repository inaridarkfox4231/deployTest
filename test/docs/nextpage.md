<div id = "sketchArea0" style = "display: block; position: fixed; top: 0px; left: 0px; z-index: -1;"></div>
# 別のページ
表示されるでしょうか...心配。  
できた！一安心。じゃあちょっと数式を。  
$$
x^2+y^2=z^2
$$
OKですね。インラインは$~a=1~$でできますね。確かに最新のMathJaxだと数式消えちゃいますね...  
mebiusboxさんの記事の通り。記事：[gh-pagesへのデプロイ](https://zenn.dev/mebiusbox/articles/81d977a72cee01#%F0%9F%93%8C-github-pages)  
というわけでやり直し。無事表示されました。mdx_mathは外さなくていいっぽい...？

# p5jsのスケッチを表示する
じゃあ本題。p5jsのスケッチを表示します。やり方はインスタンスモード。  
はじめにp5jsとdocs内のsketch.jsをyml内で読み込む。
```
extra_javascript: 
    - https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js  # ここでp5jsを読み込む。minの方がいいね。
    - js/sketch.js
```
次にスケッチの詳細。  
タイトルを付ける練習

``` javascript title="ハローハロー"
console.log("hello");
function hello(){
    return "hello";
}
var x = 1;
var y = 2;
```

``` python title="タイトル"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```
絵文字 :fox: が使えるのだ。  
静的なサイトってそういうことね。  
なるほど  
事前にすべてのページのhtmlを用意すると  
だから重いものは作れないわけで  
もちろん複数用意すればいいんだけどそれもあれだしみたいな  
でもまあ便利よね  
そのうちきちんとした使い道を考えないとね