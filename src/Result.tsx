import styles from "./Result.module.css";

export default (prop: { reason: string, history: string[], onRetry?: () => void }) => {
  return (<div class={styles.resultshadow}>
    <div class={styles.result}>
      <h2>終了!</h2>
      <div>{prop.reason}</div>
      <div>記録: {prop.history.length}単語</div>
      <button class={styles.retry} onClick={prop.onRetry}>もう一回あそぶ</button>
    </div>
  </div >);
};
