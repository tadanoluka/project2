import styles from "./page.module.css";
import Link from "next/link";
import classNames from "classnames";
import { montserrat } from "@/fonts/fonts";
import AdminLayout from "@/app/admin/layout/adminLayout";
import type { Metadata } from "next";
import PostsTable from "@/app/admin/posts/panel/postsTable";

export const metadata: Metadata = {
  title: "Управление публикациями",
  description: "",
};

export default function Home() {
  return (
    <AdminLayout tabName={"Управление публикациями"}>
      <section className={styles.postsPanelContent}>
        <section className={styles.postsPanelControls}>
          <input
            type="text"
            className={classNames(montserrat.className, styles.searchBar)}
            placeholder="Поиск по заголовку"
          />
          <Link href="/admin/posts/create" className={styles.createNewButton}>
            Создать публикацию
          </Link>
        </section>
        <hr className={styles.controlHrTable} />
        <PostsTable />
      </section>
    </AdminLayout>
  );
}
