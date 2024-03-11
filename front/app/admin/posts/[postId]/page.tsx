"use client";

import { IPost } from "@/tsTypes/data/post/iPost";
import styles from "./page.module.css";
import { montserrat } from "@/fonts/fonts";
import classNames from "classnames";
import { useEffect, useState } from "react";
import PostTitle from "@/app/admin/posts/[postId]/components/postTitle";
import PostContent from "@/app/admin/posts/[postId]/components/postContent";

export default function Page({ params }: { params: { postId: string } }) {
  const postId = Number(params.postId);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [localPost, setLocalPost] = useState<IPost>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/v1/posts/${postId}`, {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
        return res.json();
      })
      .catch((error) => setIsError(true))
      .then((data) => {
        setLocalPost(data);
        setIsLoading(false);
      });
  }, [postId]);

  function submitPost() {
    if (localPost) {
      fetch(`http://localhost:8080/v1/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localPost),
      });
    }
  }

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Загрузка
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Ошибка
      </div>
    );
  }

  if (localPost) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {isEditing
            ? "Редактирование публикации"
            : "Предварительный просмотр публикации"}
        </div>
        <div className={styles.main}>
          <div className={styles.left}></div>
          <div className={styles.center}>
            <div className={styles.postArea}>
              <PostTitle
                localPost={localPost}
                setLocalPost={setLocalPost}
                isEditing={isEditing}
              />
              <PostContent
                localPost={localPost}
                setLocalPost={setLocalPost}
                isEditing={isEditing}
              />
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
        <div className={styles.footer}>
          <button
            className={classNames(montserrat.className, styles.editButton)}
            onClick={() => setIsEditing(!isEditing)}
          >
            Редактировать
          </button>
          <button
            className={classNames(montserrat.className, styles.editButton)}
            onClick={submitPost}
          >
            Сохранить
          </button>
        </div>
      </div>
    );
  }
}
