"use client";

import styles from "./page.module.css";
import React, { useReducer, useRef, useState } from "react";
import AdminLayout from "@/app/admin/layout/adminLayout";
import FileLoading from "@/app/admin/files/add/fileInfo/fileLoading/fileLoading";
import HrMidi from "@/components/hr/hrMidi/hrMidi";
import FileLoaded from "@/app/admin/files/add/fileInfo/fileLoaded/fileLoaded";
import { FILE_STATUS } from "@/app/admin/files/add/fileInfo/FILE_STATUS";
import { loadFileURI } from "@/apiDomain/apiDomain";
import {
  FILE_INFO_ACTION_TYPE,
  TFileInfo,
  TFileInfoAction,
} from "@/app/admin/files/add/fileInfo/tFileInfo";

function reducer(fileInfos: TFileInfo[], action: TFileInfoAction): TFileInfo[] {
  switch (action.type) {
    case FILE_INFO_ACTION_TYPE.REMOVE_ALL: {
      return [];
    }
    case FILE_INFO_ACTION_TYPE.REMOVE_FILE_INFO_BY_FILE: {
      if (action.payload.file) {
        return fileInfos.filter(
          (fileInfo) => fileInfo.file !== action.payload.file,
        );
      }
      return fileInfos;
    }
    case FILE_INFO_ACTION_TYPE.ADD_FILE_INFO:
      if (action.payload.fileInfo) {
        return [...fileInfos, action.payload.fileInfo];
      }
      return fileInfos;
    case FILE_INFO_ACTION_TYPE.SET_STATUS:
      if (action.payload.file && action.payload.status) {
        return fileInfos.map((fileInfo) => {
          if (fileInfo.file === action.payload.file) {
            return { ...fileInfo, status: action.payload.status };
          }
          return fileInfo;
        });
      }
      return fileInfos;
    case FILE_INFO_ACTION_TYPE.UPDATE_LOAD_PERCENT:
      if (action.payload.file && action.payload.uploadPercent) {
        return fileInfos.map((fileInfo) => {
          if (fileInfo.file === action.payload.file) {
            return { ...fileInfo, uploadPercent: action.payload.uploadPercent };
          }
          return fileInfo;
        });
      }
      return fileInfos;
    default:
      throw new Error("No action type");
  }
}

function newFileInfoObject(file: File) {
  return {
    file: file,
    status: FILE_STATUS.SELECTED,
    uploadPercent: 0,
  };
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [selectedFileInfos, selectedFileInfosDispatch] = useReducer(
    reducer,
    [],
  );
  const [loadingFileInfos, loadingFileInfosDispatch] = useReducer(reducer, []);
  const [loadedFileInfos, loadedFileInfosDispatch] = useReducer(reducer, []);

  function onClickFileButtonHandler() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function addFile(file: File) {
    if (!!file) {
      const fileInfo = newFileInfoObject(file);
      uploadFile(fileInfo);
      selectedFileInfosDispatch({
        type: FILE_INFO_ACTION_TYPE.ADD_FILE_INFO,
        payload: {
          fileInfo: fileInfo,
        },
      });
    }
  }

  function clearFiles() {
    selectedFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.REMOVE_ALL,
    });
    loadingFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.REMOVE_ALL,
    });
    loadedFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.REMOVE_ALL,
    });
  }

  function handleDrop(event: React.DragEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      Array.from(event.dataTransfer.items).forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            addFile(file);
          }
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      Array.from(event.dataTransfer.files).forEach((file) => {
        addFile(file);
      });
    }
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      Array.from(event.target.files).forEach((file) => addFile(file));
    }
  }

  function setFileLoading(fileInfo: TFileInfo) {
    selectedFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.REMOVE_FILE_INFO_BY_FILE,
      payload: {
        file: fileInfo.file,
      },
    });
    loadingFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.ADD_FILE_INFO,
      payload: {
        fileInfo: { ...fileInfo, status: FILE_STATUS.LOADING },
      },
    });
  }

  function setFileLoadingPercent(fileInfo: TFileInfo, value: number) {
    loadingFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.UPDATE_LOAD_PERCENT,
      payload: {
        file: fileInfo.file,
        uploadPercent: value,
      },
    });
  }

  function setFileLoaded(fileInfo: TFileInfo) {
    loadingFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.REMOVE_FILE_INFO_BY_FILE,
      payload: {
        file: fileInfo.file,
      },
    });
    loadedFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.ADD_FILE_INFO,
      payload: {
        fileInfo: { ...fileInfo, status: FILE_STATUS.LOADED },
      },
    });
  }

  function setFileSuccessful(fileInfo: TFileInfo) {
    loadedFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.SET_STATUS,
      payload: {
        file: fileInfo.file,
        status: FILE_STATUS.SUCCESSFUL,
      },
    });
  }

  function setFileNotValid(fileInfo: TFileInfo) {
    loadedFileInfosDispatch({
      type: FILE_INFO_ACTION_TYPE.SET_STATUS,
      payload: {
        file: fileInfo.file,
        status: FILE_STATUS.NOT_VALID,
      },
    });
  }

  function uploadFile(fileInfo: TFileInfo) {
    if (fileInfo) {
      const formData = new FormData();
      formData.append("file", fileInfo.file);
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
          console.log(xmlHttpRequest.status);
          switch (xmlHttpRequest.status) {
            case 200:
              setFileSuccessful(fileInfo);
              return;
            case 204:
              // TODO Файл пустой
              return;
            case 400:
              setFileNotValid(fileInfo);
              return;
            case 413:
              // TODO Файл слишком большой
              return;
          }
        }
      };
      xmlHttpRequest.upload.addEventListener("loadstart", () =>
        setFileLoading(fileInfo),
      );
      xmlHttpRequest.upload.addEventListener("loadend", () =>
        setFileLoaded(fileInfo),
      );
      xmlHttpRequest.upload.addEventListener("progress", (event) =>
        setFileLoadingPercent(
          fileInfo,
          Math.round((event.loaded / event.total) * 1000) / 10,
        ),
      );
      xmlHttpRequest.open("POST", loadFileURI);
      // xmlHttpRequest.setRequestHeader(
      //   "Authorization",
      //   `Basic ${getCredentials()}`,
      // );
      xmlHttpRequest.send(formData);
    }
  }

  const fileLoadingComponents = () => {
    if (loadingFileInfos) {
      return loadingFileInfos.map((filesInfo) => {
        return (
          <FileLoading
            key={
              filesInfo.file.webkitRelativePath +
              filesInfo.file.name +
              filesInfo.file.type
            }
            fileInfoObj={filesInfo}
          />
        );
      });
    }
  };

  const fileLoadedComponents = () => {
    if (loadedFileInfos) {
      return loadedFileInfos.map((filesInfo) => {
        return (
          <FileLoaded
            key={
              filesInfo.file.webkitRelativePath +
              filesInfo.file.name +
              filesInfo.file.type
            }
            fileInfoObj={filesInfo}
          />
        );
      });
    }
  };

  return (
    <>
      <title>Загрузить файлы</title>
      <AdminLayout tabName={"Загрузить файлы"}>
        <div className={styles.wrapper}>
          <div
            className={styles.dropPlaceWrapper}
            style={{ display: selectedFileInfos.length > 0 ? "none" : "block" }}
          >
            <form
              className={styles.dropPlace}
              onClick={onClickFileButtonHandler}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStart={handleDragOver}
              onDragLeave={handleDragLeave}
              encType="multipart/form-data"
              method="post"
              style={{
                borderWidth: isDragging ? "3px" : "1px",
                borderStyle: isDragging ? "dashed" : "solid",
              }}
            >
              <div className={styles.dropPlaceText}>
                {isDragging ? (
                  <>Отпустите файлы в данной области</>
                ) : (
                  <>
                    Нажмите на данную область, чтобы выбрать файлы или
                    перетащите файлы в данную область
                  </>
                )}
              </div>
              <input
                type="file"
                multiple
                hidden
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </form>
          </div>
          <div
            className={styles.loadingFiles}
            style={{ display: loadingFileInfos.length > 0 ? "flex" : "none" }}
          >
            {fileLoadingComponents()}
          </div>
          <HrMidi
            style={{
              display:
                loadingFileInfos.length > 0 && loadedFileInfos.length > 0
                  ? "block"
                  : "none",
            }}
          />
          <div
            className={styles.loadedFiles}
            style={{ display: loadedFileInfos.length > 0 ? "flex" : "none" }}
          >
            {fileLoadedComponents()}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
