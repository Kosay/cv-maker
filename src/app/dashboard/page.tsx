"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, FileText, MoreVertical, Edit2, Trash2, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { CVData } from "@/types/cv";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/firebase/auth-context";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [cvs, setCvs] = useState<CVData[]>([]);
  const [mounted, setMounted] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem("profolio_cvs");
      if (saved) {
        const allCvs = JSON.parse(saved);
        // Filter by user ID if available
        setCvs(allCvs.filter((cv: CVData) => !cv.userId || cv.userId === user.uid));
      }
    }
  }, [user]);

  const deleteCv = (id: string) => {
    const updated = cvs.filter(c => c.id !== id);
    setCvs(updated);
    const allSaved = JSON.parse(localStorage.getItem("profolio_cvs") || "[]");
    const updatedAll = allSaved.filter((c: CVData) => c.id !== id);
    localStorage.setItem("profolio_cvs", JSON.stringify(updatedAll));
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const formatDate = (timestamp: number) => {
    if (!mounted) return ""; // Prevent hydration mismatch for locale-dependent dates
    return new Date(timestamp).toLocaleDateString();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="text-xl font-bold">Profolio</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-slate-400">Logged in as</span>
              <span className="text-sm font-semibold">{user.email}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-accent/10 hover:bg-accent/20">
                  <UserIcon className="h-5 w-5 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
              <LayoutDashboard className="h-7 w-7" />
              My Resumes
            </h1>
            <p className="text-slate-500 mt-2">Manage and edit all your professional documents.</p>
          </div>
          <Link href="/editor/new">
            <Button size="lg" className="gap-2 rounded-xl h-12 shadow-lg hover:shadow-primary/20 bg-primary w-full sm:w-auto">
              <Plus className="h-5 w-5" /> Create New CV
            </Button>
          </Link>
        </header>

        {cvs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <FileText className="h-16 w-16 text-slate-200 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800">No resumes found</h2>
            <p className="text-slate-500 mt-2 mb-8">You haven't created any resumes yet. Start your journey today!</p>
            <Link href="/editor/new">
              <Button size="lg" variant="outline" className="rounded-xl border-accent text-accent hover:bg-accent/5">
                Build your first CV
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cvs.map((cv) => (
              <Card key={cv.id} className="group hover:shadow-2xl transition-all duration-300 border-none bg-white overflow-hidden flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/editor/${cv.id}`} className="flex items-center gap-2">
                            <Edit2 className="h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => deleteCv(cv.id!)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-xl mt-4 group-hover:text-accent transition-colors line-clamp-1">
                    {cv.title}
                  </CardTitle>
                  <p className="text-sm text-slate-500">
                    Last updated: {formatDate(cv.lastUpdated)}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-sm text-slate-600 line-clamp-3 italic">
                    {cv.summary || "No professional summary provided yet."}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href={`/editor/${cv.id}`} className="w-full">
                    <Button variant="secondary" className="w-full rounded-lg font-semibold group-hover:bg-accent group-hover:text-white transition-all">
                      Continue Editing
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
