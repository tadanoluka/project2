import styles from "./postPreview.module.css";
import Image from "next/image";

export default function PostPreview() {
  return (
    <div className={styles.post}>
      <div className={styles.postImageContainer}>
        <Image
          src={"/testPic.jpg"}
          alt={"Фото публикации"}
          fill={true}
          className={styles.postImage}
        />
      </div>
      <div className={styles.postText}>
        <div className={styles.postDate}>15.01.2024</div>
        <div className={styles.postTitle}>Заголовок последнего поста</div>
        <div className={styles.postContent}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque egestas quis sapien at ultrices. Fusce dapibus metus et
            felis porttitor molestie. Nunc sagittis massa in velit viverra
            condimentum. Vestibulum massa nulla, ullamcorper sed euismod ut,
            maximus vitae nibh. Nam pellentesque diam et nisl sodales cursus.
            Morbi id tellus non neque posuere tincidunt id eget tortor.
          </p>
        </div>
      </div>
    </div>
  );
}
