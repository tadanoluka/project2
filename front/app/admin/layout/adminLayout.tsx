import styles from "./adminLayout.module.css";
import { JSX, ReactNode } from "react";

export default function AdminLayout({
  children,
  tabName,
  footer,
}: {
  children: ReactNode;
  tabName: string;
  footer?: () => JSX.Element;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{tabName}</div>
      <div className={styles.main}>
        <div className={styles.left}></div>
        <div className={styles.center}>{children}</div>
        <div className={styles.right}></div>
      </div>
      {footer ? <div className={styles.footer}>footer</div> : ""}
    </div>
  );
}
