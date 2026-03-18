"use client";

import { useState, useEffect } from "react";
import { CVData, emptyCV } from "@/types/cv";
import { CVForm } from "@/components/editor/cv-form";
import { CVPreview } from "@/components/editor/cv-preview";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Eye, Layout, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/firebase/auth-context";

interface EditorContainerProps {
  initialData?: CVData;
}

export function EditorContainer({ initialData }: EditorContainerProps) {
  const [data, setData] = useState<CVData>(initialData || emptyCV);
  const [saving, setSaving] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    // If no initial data is provided, generate a stable ID and timestamp on the client
    if (!initialData && data.lastUpdated === 0) {
      setData(prev => ({
        ...prev,
        id: Math.random().toString(36).substr(2, 9),
        lastUpdated: Date.now(),
      }));
    }
  }, [initialData, data.lastUpdated]);

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const existing = JSON.parse(localStorage.getItem("profolio_cvs") || "[]");
      const currentData = { ...data, lastUpdated: Date.now(), userId: user.uid };
      const updated = [currentData, ...existing.filter((c: CVData) => c.id !== data.id)];
      localStorage.setItem("profolio_cvs", JSON.stringify(updated));
      
      toast({
        title: "Success",
        description: "Your resume has been saved successfully.",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save resume. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <div className="flex flex-col">
            <input 
              className="font-bold text-primary bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-accent rounded px-1 transition-all"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <span className="text-[10px] text-slate-400 font-medium px-1 flex items-center gap-1">
              <CheckCircle2 className="h-2.5 w-2.5 text-green-500" /> Auto-saved to local draft
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 hidden sm:flex">
            <Layout className="h-4 w-4" /> Change Template
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Resume
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className={`flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-background ${showMobilePreview ? 'hidden' : 'block lg:block'}`}>
          <div className="max-w-3xl mx-auto">
            <CVForm data={data} onChange={setData} />
          </div>
        </div>

        <div className={`flex-1 border-l bg-slate-100 ${showMobilePreview ? 'block' : 'hidden lg:flex'}`}>
          <CVPreview data={data} />
        </div>
      </main>

      <div className="lg:hidden fixed bottom-6 right-6">
        <Button 
          size="lg" 
          className="rounded-full shadow-2xl h-14 w-14 p-0"
          onClick={() => setShowMobilePreview(!showMobilePreview)}
        >
          {showMobilePreview ? <Layout className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
}
