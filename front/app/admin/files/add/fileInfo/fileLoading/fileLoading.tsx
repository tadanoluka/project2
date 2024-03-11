import styles from "./fileLoading.module.css";
import Image from "next/image";
import { TFileInfo } from "@/app/admin/files/add/fileInfo/tFileInfo";
import humanFileSize from "@/scripts/utils/humanFileSize";

export default function FileLoading({
  fileInfoObj,
}: {
  fileInfoObj: TFileInfo;
}) {
  return (
    <div className={styles.file}>
      <Image
        className={styles.fileIcon}
        src="/fileIcon.svg"
        width={30}
        height={39}
        alt="fileIcon"
      />
      <div className={styles.wrapper}>
        <div className={styles.fileInfo}>
          <div className={styles.fileInfoWrapper}>
            <div className={styles.filename}>{fileInfoObj.file.name}</div>
            <div
              className={styles.fileSize}
            >{`(${humanFileSize(fileInfoObj.file.size)})`}</div>
          </div>
          <div
            className={styles.percent}
          >{`${fileInfoObj.uploadPercent}%`}</div>
        </div>
        <div className={styles.progressBarBack}>
          <div
            className={styles.progressBarFront}
            style={{ width: `${fileInfoObj.uploadPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
