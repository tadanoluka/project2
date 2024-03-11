import MainLayout from "@/app/layout/mainLayout";
import type { Metadata } from "next";
import styles from "./page.module.css";
import PostPreview from "@/components/post/postPreview/postPreview";

export const metadata: Metadata = {
  title: "Публикации",
  description: "",
};

export default function Page() {
  return (
    <MainLayout activeTab={2}>
      <div className={styles.mainWrapper}>
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
      </div>
    </MainLayout>
  );
}
