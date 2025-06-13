import styles from "./Error.module.css";

export default (prop: {
  msg: string,
}) => {
  return (<div class={styles.error}>
    <svg viewBox="0 0 12 12" style={{
      width: "1.5em",
      "vertical-align": `calc(0.5cap - 0.75em)`,
    }}>
      <path d="
        M0,0H12V12H0Z
        M7,2 5,2 5,7 7,7Z
        M7,8 5,8 5,10 7,10Z
      " fill="var(--error-icon)" />
    </svg>
    {prop.msg}
  </div>);
};
