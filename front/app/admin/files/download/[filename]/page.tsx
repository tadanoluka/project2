"use client";

import { downloadFileURI } from "@/apiDomain/apiDomain";
import { useEffect } from "react";

export default function Page({ params }: { params: { filename: string } }) {
  useEffect(() => {
    async function download(filename: string) {
      const response = await fetch(downloadFileURI(filename), {
        cache: "no-cache",
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
    }
    download(params.filename).then(() => window.close());
  }, [params.filename]);

  return <></>;
}
