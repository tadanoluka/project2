import styles from "./page.module.css";
import Link from "next/link";
import PostTitle from "@/app/admin/posts/[postId]/components/postTitle";
import PostContent from "@/app/admin/posts/[postId]/components/postContent";
import classNames from "classnames";
import { montserrat } from "@/fonts/fonts";
import AdminLayout from "@/app/admin/layout/adminLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пaнель администрирования",
  description: "",
};

export default function Home() {
  return (
    <AdminLayout tabName={"Пaнель администрирования"}>
      <div className={styles.adminPanel}>
        <div>Учетная запись</div>
        <Link href="/admin/posts/panel">Управление публикациями</Link>
        <div>Управление видео</div>
        <div>Управление аудио</div>
        <Link href="/admin/files/panel">Управление файлами</Link>
        <div>Управление выдачи доступов</div>
        <div>Сообщения обратной связи</div>
      </div>
    </AdminLayout>
  );
}
