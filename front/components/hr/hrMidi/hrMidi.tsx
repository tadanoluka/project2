import styles from "./hrMidi.module.css";

export default function HrMidi({ style }: { style?: any }) {
  return <hr className={styles.hrMidi} style={style} />;
}
