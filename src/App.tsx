import { createSignal, Show } from "solid-js";
import styles from "./App.module.css";
import Error from "./Error.tsx";
import LastWord from "./LastWord.tsx";

export default () => {
  const [lastWord, setlastWord] = createSignal("しりとり");
  const [errFlg, setErrFlg] = createSignal(false);
  const used = new Set<string>();
  const reset = () => {
    setlastWord("しりとり");
    used.clear();
  };
  let wordInput: HTMLInputElement;
  return (<div class={styles.app}>
    <h1>しりとり</h1>
    <LastWord word={lastWord()} />
    <input ref={elem => wordInput = elem} class={styles.wordinput} onKeyDown={(e) => {
      if (e.key !== "Enter") return;
      const word = wordInput.value;
      if (word === '') return;
      if (word[0] !== lastWord().at(-1)) {
        setErrFlg(true);
        return;
      }
      setErrFlg(false);
      if (word.at(-1) === "ん") {
        alert("「ん」で終わってる!");
        reset();
      } else if (used.has(word)) {
        alert("その単語は2回目だよ!");
        reset();
      } else {
        setlastWord(word);
        used.add(word);
        wordInput.value = "";
      }
    }} />
    <Show when={errFlg()}><Error msg="前の単語とつながってないよ!" /></Show>
    <button class={styles.reset} onClick={reset}>リセット</button>
  </div>);
};
