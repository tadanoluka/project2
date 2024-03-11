"use client";

import styles from "./page.module.css";
import { montserrat } from "@/fonts/fonts";
import classNames from "classnames";
import { useRef, useState } from "react";
import { IPost } from "@/tsTypes/data/post/iPost";

export default function Home() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  function onClickFileButtonHandler() {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  function onClickSubmitButtonHandler() {
    fetch(`http://localhost:8080/v1/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Новая публикация</div>
      <div className={styles.main}>
        <div className={styles.left}></div>
        <div className={styles.center}>
          <form className={styles.createPostForm}>
            <div className={styles.choseImageBlock}>
              <label htmlFor="image">Изображение </label>
              <input
                type="file"
                id="image"
                ref={fileInput}
                style={{ display: "none" }}
                className={classNames(montserrat.className, styles.fileInput)}
              />
              <button
                onClick={onClickFileButtonHandler}
                className={montserrat.className}
              >
                Обзор...
              </button>
            </div>
            <input
              className={classNames(styles.titleInput, montserrat.className)}
              type="text"
              placeholder="Введите заголовок публикации"
              value={post.title}
              onChange={(event) => {
                const copy = { ...post };
                copy.title = event.target.value;
                setPost(copy);
              }}
            />
            <textarea
              className={classNames(
                montserrat.className,
                styles.contentTextarea,
              )}
              placeholder="Введите содержимое публикации"
              value={post.content}
              onChange={(event) => {
                const copy = { ...post };
                copy.content = event.target.value;
                setPost(copy);
              }}
            />
          </form>
        </div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.footer}>
        <button
          className={classNames(styles.submitButton, montserrat.className)}
          onClick={onClickSubmitButtonHandler}
        >
          Создать
        </button>
      </div>
    </div>
  );
}
