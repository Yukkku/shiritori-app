# shiritori-app

インターンシップの選考課題用に作成したしりとりを遊べるウェブアプリです.

## 使い方

https://yukkku.github.io/shiritori-app/ から遊べます.

入力欄にひらがなかカタカナで単語を書いていって, 「ん」が付くか同じ単語を2度使ったら終わりです.

### 推奨環境

最新のChrome, Microsoft Edge, Firefox, Safariを想定しています.

スマホでも遊べますが, 画面が小さくキーボードを画面に表示させると見えづらいため, タブレット端末やPCを推奨します.

### ルール詳細

- ひらがなやカタカナ以外の文字があるとエラーになります.
- 「っ」や「ー」から始まる, 「っ」や「ー」が連続するなどの読みが判定できないものを入力するとエラーになります.
- 先頭の文字が直前の単語の末尾と一致しない場合はエラーになります.
- 濁点や半濁点の有無は区別しません.
- ひらがなとカタカナは区別しません.
- 入力をNFKCで正規化してから解釈するため,「㌀」なども正しく認識できます.
- 単語の最後が「ゃ」「ゅ」「ょ」で終わる場合は, 次の単語は「や」「ゆ」「よ」で始めます.
- 単語の最後が長音や促音で終わる場合は, それらを無視します.

### 作った機能

- ゲーム終了後に, 何単語続いたか表示されます.
- 拗音で終わった場面などでルールを確認しなくてもいいように, 何の文字で始めればよいか表示されます.
- 英語で遊べるようにしました. 画面右上の「English」と書かれたボタンをクリックすることで開始します.
  - 「X」で終わったら終了です.
  - 大文字と小文字は区別しません.
- ダークモードや[強制色モード](https://developer.mozilla.org/ja/docs/Web/CSS/@media/forced-colors)でも見えにくくならないよう調整しました.

## 参考にしたウェブサイト

- [MDN Web Docs](https://developer.mozilla.org/)

  CSSのプロパティやJavaScriptの関数を調べました.

- [Can I use...](https://caniuse.com/)

  試せない環境で動作するかの確認に使用しました.

- [SolidJSのドキュメント](https://www.solidjs.com/docs/latest/api)

  覚えていないSolidJSのインターフェイスを調べました.

- [Unicode Technical Reports](https://www.unicode.org/reports/)

  文字列の正規化などについて調べました.

- [Unicode Character reference (Wikibooks)](https://en.wikibooks.org/wiki/Unicode/Character_reference/3000-3FFF)

  ひらがな・カタカナのコードポイントの確認に使用しました.

## AIの使用

AIは使用していません.
