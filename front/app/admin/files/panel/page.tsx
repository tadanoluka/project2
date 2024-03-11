import AdminLayout from "@/app/admin/layout/adminLayout";
import styles from "./page.module.css";
import classNames from "classnames";
import { montserrat } from "@/fonts/fonts";
import Link from "next/link";
import type { Metadata } from "next";
import FilesTable from "@/app/admin/files/panel/filesTable";

export const metadata: Metadata = {
  title: "Управление файлами",
  description: "",
};

export default function Home() {
  return (
    <AdminLayout tabName={"Управление файлами"}>
      <section className={styles.filesPanelContent}>
        <section className={styles.filesPanelControls}>
          <input
            type="text"
            className={classNames(montserrat.className, styles.searchBar)}
            placeholder="Поиск по названию"
          />
          <Link href="/admin/files/add" className={styles.createNewButton}>
            Добавить файл
          </Link>
        </section>
        <hr className={styles.controlHrTable} />
        <FilesTable />
      </section>
    </AdminLayout>
  );
}
