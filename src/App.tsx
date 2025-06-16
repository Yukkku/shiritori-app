import { createSignal, createMemo, For, Show } from "solid-js";
import styles from "./App.module.css";
import Error from "./Error.tsx";
import Result from "./Result.tsx";
import { lastChar, firstChar } from "./shiritori.ts";

export default () => {
  const [history, setHistory] = createSignal<string[]>(["しりとり"]);
  const nextChar = createMemo(() => lastChar(history().at(-1)!));
  // 前の単語と繋がっていないエラーを表示するフラグ
  const [errFlg, setErrFlg] = createSignal(false);
  // 終了画面のメッセージ. 終了画面を出さないときはnullを入れる.
  const [finMsg, setFinMsg] = createSignal<string | null>(null);
  const reset = () => {
    setHistory(["しりとり"]);
    wordInput.value = '';
    setErrFlg(false);
    setFinMsg(null);
  };
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
    <div class={`${styles.smalltitle} ${history().length === 1 ? "" : styles.smallshow}`}>しりとり</div>
    <div class={`${styles.scrollwrapper} ${history().length === 1 ? styles.titleshown : ""}`}>
      <div class={styles.scrollinner} style={{ top: `${scrollamount(history().length)}rem` }}>
        <For each={history()}>{word => <><input value={word} disabled /><div class={styles.arrow} /></>}</For>
        <input ref={elem => wordInput = elem} placeholder={history().length === 1 ? "りんご" : ""} onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          const word = wordInput.value;
          // 入力が空の場合は無視
          if (word === '') return;
          // 入力が前の単語と繋がっていない場合は警告を出して終了
          if (firstChar(word) !== nextChar()) {
            setErrFlg(true);
            return;
          }
          setErrFlg(false);
          if (lastChar(word) === "ん") {
            setFinMsg("「ん」で終わってしまった!");
          } else if (history().includes(word)) {
            setFinMsg(`「${word}」を2回使ってしまった!`);
          } else {
            setHistory(history => [...history, word]);
            // 入力欄を空にして次の入力を受け付ける
            wordInput.value = "";
          }
        }} readonly={finMsg() != null} />
      </div>
    </div>
    <div class={`${styles.inputdeco} ${errFlg() ? styles.errorcolor : ""}`} />
    <Show when={errFlg()}><Error msg="前の単語とつながってないよ!" /></Show>
    <Show when={finMsg() != null}><Result reason={finMsg()!} history={history()} onRetry={reset} /></Show>
    <button class={styles.reset} onClick={reset}>リセット</button>
  </div >);
};
