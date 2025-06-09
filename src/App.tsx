import { createSignal, For, Show } from "solid-js";
import styles from "./App.module.css";
import Error from "./Error.tsx";

export default () => {
  const [history, setHistory] = createSignal<string[]>(["しりとり"]);
  const [errFlg, setErrFlg] = createSignal(false);
  const reset = () => {
    setHistory(["しりとり"]);
    wordInput.value = '';
    setErrFlg(false);
  };
  let wordInput: HTMLInputElement;
  let scrollwrapper: HTMLDivElement;
  return (<div class={styles.app}>
    <h1>しりとり</h1>
    <div ref={elem => scrollwrapper = elem} class={styles.scrollwrapper}>
      <For each={history()}>{word => <input value={word} disabled />}</For>
      <input ref={elem => wordInput = elem} onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        const word = wordInput.value;
        if (word === '') return;
        if (word[0] !== history().at(-1)!.at(-1)) {
          setErrFlg(true);
          return;
        }
        setErrFlg(false);
        if (word.at(-1) === "ん") {
          alert("「ん」で終わってる!");
          reset();
        } else if (history().includes(word)) {
          alert("その単語は2回目だよ!");
          reset();
        } else {
          setHistory(history => [...history, word]);
          wordInput.scrollIntoView({ behavior: "smooth" });
          wordInput.value = "";
        }
      }} />
    </div>
    <Show when={errFlg()}><Error msg="前の単語とつながってないよ!" /></Show>
    <button class={styles.reset} onClick={reset}>リセット</button>
  </div>);
};
