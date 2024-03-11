import MainLayout from "@/app/layout/mainLayout";
import type { Metadata } from "next";
import styles from "./page.module.css";
import PostPreview from "@/components/post/postPreview/postPreview";
import VideoPostPreview from "@/components/post/videoPostPreview/videoPostPreview";

export const metadata: Metadata = {
  title: "Видео",
  description: "",
};

export default function Page() {
  return (
    <MainLayout activeTab={3}>
      <div className={styles.mainWrapper}>
        <VideoPostPreview />
        <VideoPostPreview />
        <VideoPostPreview />
        <VideoPostPreview />
        <VideoPostPreview />
        <VideoPostPreview />
      </div>
    </MainLayout>
  );
}
