import { IPost } from "@/tsTypes/data/post/iPost";
import { ChangeEvent } from "react";
import styles from "../page.module.css";
import classNames from "classnames";
import { montserrat } from "@/fonts/fonts";

export default function PostTitle({
  localPost,
  setLocalPost,
  isEditing,
}: {
  localPost: IPost;
  setLocalPost: (post: IPost) => void;
  isEditing: boolean;
}) {
  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const copy: IPost = { ...localPost };
    copy.title = event.target.value;
    setLocalPost(copy);
  }

  if (!isEditing) {
    return <h3>{localPost.title}</h3>;
  } else {
    return (
      <input
        type="text"
        value={localPost.title}
        onChange={onChangeHandler}
        className={classNames(montserrat.className, styles.titleInput)}
      />
    );
  }
}
