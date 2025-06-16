import { createSignal, createEffect, createMemo, For, Show } from "solid-js";
import styles from "./App.module.css";
import Error from "./Error.tsx";
import Result from "./Result.tsx";
import JA from "./shiritorija.ts";
import EN from "./shiritorien.ts";

export default () => {
  // 設定の言語
  const [lang, setLang] = createSignal<"ja" | "en">("ja");
  // 翻訳する
  const translation = <T = string>(ja: T, en: T): T => lang() === "ja" ? ja : en;
  const langconfig = createMemo(() => translation(JA, EN));
  const [history, setHistory] = createSignal<string[]>([langconfig().gametitle]);
  const nextChar = createMemo(() => langconfig().lastChar(history().at(-1)!));
  // エラーメッセージ. エラーを出さないときはnull
  const [errMsg, setErrMsg] = createSignal<string | null>(null);
  // 終了画面のメッセージ. 終了画面を出さないときはnullを入れる.
  const [finMsg, setFinMsg] = createSignal<string | null>(null);
  const reset = () => {
    setHistory([langconfig().gametitle]);
    wordInput.value = '';
    setErrMsg(null);
    setFinMsg(null);
  };
  createEffect(reset);
  let wordInput: HTMLInputElement;
  // しりとりが続いた量からスクロール量を計算する.
  const scrollamount = (len: number) => {
    /*
    * 履歴表示のサイズ配分の例
    *  しりとり | タイトル (5rem)
    *     v     | 矢印 (5rem)  (最初の矢印だけ5rem, あとは4rem)
    *   りんご  | 単語 (3rem)
    *     v     | 矢印 (4rem)
    *   ごりら  | 単語 (3rem)
    *     v     | 矢印 (4rem)
    *    ...    | 入力欄 (3rem)
    *
    * これを基に, 直前の単語(orタイトル), 矢印, 入力欄が映るようにスクロール量を決める.
    */
    if (len === 1) return 0;
    return 4 - len * 7;
  };
  return (<div class={styles.app}>
    <div class={`${styles.smalltitle} ${history().length === 1 ? "" : styles.smallshow}`}>{langconfig().gametitle}</div>
    <div class={`${styles.scrollwrapper} ${history().length === 1 ? styles.titleshown : ""}`}>
      <div class={styles.scrollinner} style={{ top: `${scrollamount(history().length)}rem` }}>
        <For each={history()}>{word => <><input value={word} disabled /><div class={styles.arrow} /></>}</For>
        <input ref={elem => wordInput = elem} placeholder={history().length === 1 ? translation("りんご", "Island") : ""} onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          const word = wordInput.value;
          // 入力が空の場合は無視
          if (word === '') return;
          const first = langconfig().firstChar(word);
          if (first == null) {
            setErrMsg(translation("ひらがなかカタカナで読み方をかいてね!", "Spell in UPPER or lower latin alphabet!"));
            return;
          }
          // 入力が前の単語と繋がっていない場合は警告を出して終了
          if (first !== nextChar()) {
            setErrMsg(translation("はじめの文字が違うよ!", "The first letter is incorrect!"));
            return;
          }
          setErrMsg(null);
          if (langconfig().lastChar(word) === langconfig().dropout) {
            setFinMsg(translation("「ん」で終わってしまった!", 'The word ends with "x"!'));
          } else if (history().includes(word)) {
            setFinMsg(translation(`「${word}」を2回使ってしまった!`, `You use the "${word}" word twice!`));
          } else {
            setHistory(history => [...history, word]);
            // 入力欄を空にして次の入力を受け付ける
            wordInput.value = "";
          }
        }} readonly={finMsg() != null} />
      </div>
    </div>
    <div class={`${styles.inputdeco} ${errMsg() != null ? styles.errorcolor : ""}`} />
    <div>{translation("はじめの文字", "First Letter")}: {nextChar()}</div>
    <Show when={errMsg() != null}><Error msg={errMsg()!} /></Show>
    <Show when={finMsg() != null}><Result lang={lang()} reason={finMsg()!} history={history()} onRetry={reset} /></Show>
    <div class={styles.controll}>
      <button class={styles.reset} onClick={() => setLang(lang => lang === "ja" ? "en" : "ja")}><div>{translation("English", "日本語")}</div></button>
      <button class={styles.reset} onClick={reset}><div>{translation("リセット", "Reset")}</div></button>
    </div>
  </div >);
};
