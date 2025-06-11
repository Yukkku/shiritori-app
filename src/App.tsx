import { createSignal, For, Show } from "solid-js";
import styles from "./App.module.css";
import Error from "./Error.tsx";
import Result from "./Result.tsx";

export default () => {
  const [history, setHistory] = createSignal<string[]>(["しりとり"]);
  const [errFlg, setErrFlg] = createSignal(false);
  const [finMsg, setFinMsg] = createSignal<string | null>(null);
  const reset = () => {
    setHistory(["しりとり"]);
    wordInput.value = '';
    setErrFlg(false);
    setFinMsg(null);
  };
  let wordInput: HTMLInputElement;
  return (<div class={styles.app}>
    <h1>しりとり</h1>
    <div class={styles.scrollwrapper}>
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
          setFinMsg("「ん」で終わってしまった!");
        } else if (history().includes(word)) {
          setFinMsg(`「${word}」を2回使ってしまった!`);
        } else {
          setHistory(history => [...history, word]);
          wordInput.scrollIntoView({ behavior: "smooth" });
          wordInput.value = "";
        }
      }} readonly={finMsg() != null} />
    </div>
    <div class={styles.inputdeco} />
    <Show when={errFlg()}><Error msg="前の単語とつながってないよ!" /></Show>
    <Show when={finMsg() != null}><Result reason={finMsg()!} history={history()} onRetry={reset} /></Show>
    <button class={styles.reset} onClick={reset}>リセット</button>
  </div>);
};
