import styles from "./Result.module.css";

export default (prop: { lang: "ja" | "en", reason: string, history: string[], onRetry?: () => void }) => {
  const translation = <T = string>(ja: T, en: T): T => prop.lang === "ja" ? ja : en;
  return (<div class={styles.resultshadow}>
    <div class={styles.result}>
      <h2>{translation("終了!", "Finish!")}</h2>
      <div>{prop.reason}</div>
      <div>{translation("記録", "Score")}: {prop.history.length}{translation("単語", prop.history.length === 1 ? " word" : " words")}</div>
      <button class={styles.retry} onClick={prop.onRetry}><div>{translation("もう一回あそぶ", "Retry")}</div></button>
    </div>
  </div >);
};
