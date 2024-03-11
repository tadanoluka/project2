import MainLayout from "@/app/layout/mainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Файлы",
  description: "",
};

export default function Page() {
  return (
    <MainLayout activeTab={5}>
      <div></div>
    </MainLayout>
  );
}
