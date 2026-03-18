
"use client";

import { CVData } from "@/types/cv";
import { renderTemplate } from "@/lib/templates/renderer";
import { defaultTemplate } from "@/lib/templates/default-template";
import { useEffect, useState } from "react";

interface CVPreviewProps {
  data: CVData;
}

export function CVPreview({ data }: CVPreviewProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const rendered = renderTemplate(defaultTemplate, data);
    setHtml(rendered);
  }, [data]);

  return (
    <div className="h-full w-full overflow-auto bg-slate-200 p-8 flex justify-center">
      <div 
        className="w-full max-w-[800px] min-h-[1056px] bg-white shadow-2xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
