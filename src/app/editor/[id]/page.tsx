
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CVData } from "@/types/cv";
import { EditorContainer } from "@/components/editor/editor-container";
import { Loader2 } from "lucide-react";

export default function EditEditorPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("profolio_cvs");
    if (saved) {
      const cvs = JSON.parse(saved);
      const cv = cvs.find((c: CVData) => c.id === id);
      if (cv) {
        setInitialData(cv);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <EditorContainer initialData={initialData || undefined} />;
}
