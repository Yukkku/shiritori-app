import { createSignal } from "solid-js";
import styles from "./App.module.css";

export default () => {
  const [lastWord, setlastWord] = createSignal("しりとり");
  const used = new Set<string>();
  const reset = () => {
    setlastWord("しりとり");
    used.clear();
  };
  let wordInput: HTMLInputElement;
  return (<div class={styles.app}>
    <h1>しりとり</h1>
    <div class={styles.lastword}>Last Word: {lastWord()}</div>
    <input ref={elem => wordInput = elem} class={styles.wordinput} onKeyDown={(e) => {
      if (e.key !== "Enter") return;
      const word = wordInput.value;
      if (word === '') return;
      if (word[0] !== lastWord().at(-1)) {
        alert("つながってないよ!");
        return;
      }
      if (word.at(-1)) {
        alert('「ん」で終わってる!');
        reset();
      } else if (used.has(word)) {
        alert('その単語は2回目だよ!');
        reset();
      } else {
        setlastWord(word);
        wordInput.value = "";
      }
    }} />
    <button class={styles.reset} onClick={reset}>リセット</button>
  </div>);
};
