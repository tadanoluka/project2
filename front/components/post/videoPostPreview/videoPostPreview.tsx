import styles from "./videoPostPreview.module.css";
import Image from "next/image";

export default function VideoPostPreview({
  rightsided,
}: {
  rightsided?: boolean;
}) {
  if (rightsided) {
    return (
      <div className={styles.videoPost}>
        <div className={styles.postText}>
          <div className={styles.postDate}>13.01.2024</div>
          <div className={styles.postTitle}>Заголовок последнего видео</div>
          <div className={styles.postContent}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque egestas quis sapien at ultrices. Fusce dapibus metus
              et felis porttitor molestie. Nunc sagittis massa in velit viverra
              condimentum. Vestibulum massa nulla, ullamcorper sed euismod ut,
              maximus vitae nibh.
            </p>
          </div>
        </div>
        <div className={styles.postImageContainer}>
          <Image
            src={"/testPic.jpg"}
            alt={"Фото публикации"}
            fill={true}
            className={styles.postImage}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.videoPost}>
        <div className={styles.postImageContainer}>
          <Image
            src={"/testPic.jpg"}
            alt={"Фото публикации"}
            fill={true}
            className={styles.postImage}
          />
        </div>
        <div className={styles.postText}>
          <div className={styles.postDate}>13.01.2024</div>
          <div className={styles.postTitle}>Заголовок последнего видео</div>
          <div className={styles.postContent}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque egestas quis sapien at ultrices. Fusce dapibus metus
              et felis porttitor molestie. Nunc sagittis massa in velit viverra
              condimentum. Vestibulum massa nulla, ullamcorper sed euismod ut,
              maximus vitae nibh.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
