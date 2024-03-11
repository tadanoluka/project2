"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import { montserrat } from "@/fonts/fonts";
import { IFile } from "@/tsTypes/data/file/iFile";
import { downloadFileURI, securedFilesURI } from "@/apiDomain/apiDomain";
import styles from "./page.module.css";
import Image from "next/image";

export default function FilesTable() {
  const [files, setFiles] = useState<IFile[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(securedFilesURI, {
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
        setFiles(data);
        setIsLoading(false);
      });
  }, []);

  async function download(filename: string) {
    const response = await fetch(downloadFileURI(filename), {
      cache: "no-cache",
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
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

  if (isError || !files) {
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

  const postsElements = files.map((file) => {
    return (
      <tr key={file.id} onClick={() => download(file.filename)}>
        <td>
          <div className={styles.fileIconWrapper}>
            <Image
              className={styles.fileIcon}
              src="/fileIcon.svg"
              width={30}
              height={39}
              alt="fileIcon"
            />
          </div>
        </td>
        <td>
          <span>{file.filename}</span>
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
      </tr>
    );
  });
  return (
    <table className={styles.filesTable} cellSpacing={0} cellPadding={0}>
      <colgroup>
        <col style={{ width: "40px" }} />
        <col style={{ flex: "1" }} />
        <col style={{ width: "120px" }} />
        <col style={{ width: "120px" }} />
      </colgroup>
      <tbody>{postsElements}</tbody>
    </table>
  );
}
