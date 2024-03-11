"use client";

import { useEffect, useState } from "react";
import { IPost } from "@/tsTypes/data/post/iPost";
import classNames from "classnames";
import styles from "@/app/admin/posts/panel/page.module.css";
import { montserrat } from "@/fonts/fonts";

export default function PostsTable() {
  const [posts, setPosts] = useState<IPost[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/v1/posts", {
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
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

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

  if (isError || !posts) {
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

  const postsElements = posts.map((post) => {
    const dateArr = post.createdAt.split("T");
    const date = dateArr[0];
    const time = dateArr[1].split(".")[0];

    return (
      <tr
        key={post.id}
        onClick={() => window.open(`/admin/posts/${post.id}`, "_blank")}
      >
        <td></td>
        <td>
          <span>{date}</span>
        </td>
        <td>
          <span>{time}</span>
        </td>
        <td>
          <span>{post.title}</span>
        </td>
        <td>
          <button
            className={classNames(styles.tableButton, montserrat.className)}
            onClick={(event) => event.stopPropagation()}
          >
            Опубликовать
          </button>
        </td>
        <td>
          <button
            className={classNames(styles.removeButton, montserrat.className)}
            onClick={(event) => event.stopPropagation()}
          >
            Удалить
          </button>
        </td>
        <td></td>
      </tr>
    );
  });
  return (
    <table className={styles.postsTable} cellSpacing={0} cellPadding={0}>
      <colgroup>
        <col style={{ width: "0.5rem" }} />
        <col style={{ width: "110px" }} />
        <col style={{ width: "80px" }} />
        <col style={{ flex: "1" }} />
        <col style={{ width: "120px" }} />
        <col style={{ width: "120px" }} />
        <col style={{ width: "0.5rem" }} />
      </colgroup>
      <tbody>{postsElements}</tbody>
    </table>
  );
}
