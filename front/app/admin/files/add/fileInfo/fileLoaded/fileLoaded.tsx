import styles from "./fileLoaded.module.css";
import Image from "next/image";
import { TFileInfo } from "@/app/admin/files/add/fileInfo/tFileInfo";
import humanFileSize from "@/scripts/utils/humanFileSize";

export default function FileLoaded({
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
          <div className={styles.filename}>{fileInfoObj.file.name}</div>
          <div
            className={styles.fileSize}
          >{`(${humanFileSize(fileInfoObj.file.size)})`}</div>
        </div>
      </div>
      <div className={styles.closeIconWrapper}>
        <Image
          className={styles.closeIcon}
          src="/closeIcon.svg"
          width={16}
          height={16}
          alt="closeIcon"
        />
      </div>
    </div>
  );
}
