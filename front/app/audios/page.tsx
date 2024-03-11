import MainLayout from "@/app/layout/mainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Аудио",
  description: "",
};

export default function Page() {
  return (
    <MainLayout activeTab={4}>
      <div></div>
    </MainLayout>
  );
}
