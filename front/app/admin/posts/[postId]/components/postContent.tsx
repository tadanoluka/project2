import { IPost } from "@/tsTypes/data/post/iPost";
import styles from "@/app/admin/posts/[postId]/page.module.css";
import { ChangeEvent, useEffect, useRef } from "react";
import classNames from "classnames";
import { montserrat } from "@/fonts/fonts";

export default function PostContent({
  localPost,
  setLocalPost,
  isEditing,
}: {
  localPost: IPost;
  setLocalPost: (post: IPost) => void;
  isEditing: boolean;
}) {
  const postContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localPost && postContentRef.current && !isEditing) {
      postContentRef.current.innerHTML = localPost.content;
    }
  }, [isEditing, localPost]);

  function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (localPost) {
      const copy: IPost = { ...localPost };
      copy.content = event.target.value;
      setLocalPost(copy);
    }
  }

  if (!isEditing) {
    return <div className={styles.postContent} ref={postContentRef}></div>;
  } else {
    return (
      <textarea
        onChange={handleOnChange}
        value={localPost.content}
        className={classNames(montserrat.className, styles.postContentTextarea)}
      ></textarea>
    );
  }
}
