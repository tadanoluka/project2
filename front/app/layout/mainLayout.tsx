import styles from "@/app/layout/mainLayout.module.css";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { montserrat } from "@/fonts/fonts";

export default function MainLayout({
  children,
  activeTab,
}: {
  children: React.ReactNode;
  activeTab: number;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.inHeaderWrapper}>
          <div className={styles.headerPersonInfo}>
            <div className={styles.headerPhoto}></div>
            <div>
              <div className={styles.headerPersonInfoName}>
                Протоиерей Сергий Коротких
              </div>
              <div className={styles.headerPersonInfoSubtitle}>Личный сайт</div>
            </div>
          </div>

          <input
            type="text"
            className={classNames(montserrat.className, styles.searchbar)}
            placeholder="Введите тест для поиска по сайту"
          ></input>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.left}></div>
        <div className={styles.center}>
          <div className={styles.nav}>
            <Link
              href={"/main"}
              className={activeTab === 1 ? styles.activeNav : ""}
            >
              Главная
            </Link>
            <Link
              href={"/posts"}
              className={activeTab === 2 ? styles.activeNav : ""}
            >
              Публикации
            </Link>
            <Link
              href={"/videos"}
              className={activeTab === 3 ? styles.activeNav : ""}
            >
              Видео
            </Link>
            <Link
              href={"/audios"}
              className={activeTab === 4 ? styles.activeNav : ""}
            >
              Аудио
            </Link>
            <Link
              href={"/files"}
              className={activeTab === 5 ? styles.activeNav : ""}
            >
              Файлы
            </Link>
          </div>
          <hr className={styles.navHrNews} />
          {children}
        </div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
