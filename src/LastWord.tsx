import { createEffect, createSignal, For } from "solid-js";
import styles from "./LastWord.module.css";

export default (prop: { word: string }) => {
  const [entries, setEntries] = createSignal<string[]>([]);
  createEffect(() => {
    setEntries(entries => [...entries, prop.word]);
  });
  return (<div class={styles.view}>
    <div class={styles.scroller} style={{ "--entries": entries().length }}>
      <For each={entries()}>{word => (<div class={styles.entry}>
        {word.slice(0, -1)}<span class={styles.lastchar}>{word.at(-1)}
        </span></div>)}</For>
    </div>
  </div>);
};
