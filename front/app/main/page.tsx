import MainLayout from "@/app/layout/mainLayout";
import type { Metadata } from "next";
import styles from "@/app/main/page.module.css";
import classNames from "classnames";
import PostPreview from "@/components/post/postPreview/postPreview";
import VideoPostPreview from "@/components/post/videoPostPreview/videoPostPreview";
import { montserrat } from "@/fonts/fonts";
import HrMidi from "@/components/hr/hrMidi/hrMidi";

export const metadata: Metadata = {
  title: "Главная",
  description: "",
};

export default function Page() {
  return (
    <MainLayout activeTab={1}>
      <div className={styles.mainWrapper}>
        <div className={styles.lastPost}>
          <PostPreview />
        </div>
        <HrMidi />
        <div className={styles.lastVideoPost}>
          <VideoPostPreview rightsided />
        </div>
        <HrMidi />
        <div className={styles.feedback}>
          <div className={styles.feedbackPrompt}>
            Сайт не содержит форума и возможности вести обсуждения, но Вы можете
            оставить свой вопрос через форму обратной связи
          </div>
          <button className={montserrat.className}>Написать</button>
        </div>
        <HrMidi />
        <div className={styles.about}>
          <div className={styles.icons}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles.yearLabel}>2024 год</div>
        </div>
      </div>
    </MainLayout>
  );
}
