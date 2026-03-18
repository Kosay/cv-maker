
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Layout, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth } from "@/lib/firebase/auth-context";

export default function LandingPage() {
  const { user } = useAuth();
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-cv");

  return (
    <div className="min-h-screen flex flex-col selection:bg-accent/30">
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
            <span className="text-xl font-bold tracking-tight">Profolio</span>
          </div>
          <div className="flex gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/editor/new">
                  <Button className="bg-primary hover:bg-primary/90">Build My CV</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90">Sign Up Free</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-background overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                AI-Powered CV Creation
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-primary">
                Land your dream job with <span className="text-accent underline decoration-4 underline-offset-8">AI-Optimized</span> resumes.
              </h1>
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                Profolio uses cutting-edge AI to transform your work history into high-impact bullet points that get you hired.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={user ? "/editor/new" : "/signup"}>
                  <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/20 bg-primary group">
                    Create My Resume <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                {!user && (
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl border-primary/20 hover:bg-accent/5">
                      Log In
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2 font-medium"><CheckCircle2 className="h-4 w-4 text-green-500" /> ATS-Friendly</div>
                <div className="flex items-center gap-2 font-medium"><CheckCircle2 className="h-4 w-4 text-green-500" /> Professional Templates</div>
                <div className="flex items-center gap-2 font-medium"><CheckCircle2 className="h-4 w-4 text-green-500" /> AI Bullet Enhancer</div>
              </div>
            </div>
            <div className="relative lg:ml-12">
              <div className="absolute -inset-4 bg-accent/30 rounded-[2rem] blur-3xl -z-10 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full border border-white/20 blur-xl"></div>
              {heroImage && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur-sm"></div>
                  <Image 
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={1200}
                    height={800}
                    data-ai-hint={heroImage.imageHint}
                    className="rounded-2xl shadow-2xl border border-white relative"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl font-bold text-primary tracking-tight">Everything you need to land your dream job</h2>
              <p className="text-lg text-slate-600">Powerful tools designed for modern professionals who want to stand out.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <div className="p-3 bg-accent/10 rounded-xl inline-block"><Layout className="h-8 w-8 text-accent" /></div>,
                  title: "Real-time Editor",
                  description: "See your resume take shape instantly as you type. Our seamless split-pane experience removes all guesswork."
                },
                {
                  icon: <div className="p-3 bg-primary/10 rounded-xl inline-block"><Sparkles className="h-8 w-8 text-primary" /></div>,
                  title: "AI Optimization",
                  description: "Struggling to describe your impact? Our AI bullet points enhancer rewrites your history for maximum professional impact."
                },
                {
                  icon: <div className="p-3 bg-accent/10 rounded-xl inline-block"><Clock className="h-8 w-8 text-accent" /></div>,
                  title: "ATS-Ready Designs",
                  description: "All our templates are engineered to pass Applicant Tracking Systems while looking stunning to human recruiters."
                }
              ].map((feature, i) => (
                <div key={i} className="p-10 rounded-3xl bg-background hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 group">
                  <div className="mb-8 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center font-bold text-xl">P</div>
                <span className="text-2xl font-bold tracking-tight">Profolio</span>
              </div>
              <p className="text-slate-300 max-w-sm text-lg">
                Empowering professionals to build their future with AI-assisted resume building and career optimization tools.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/dashboard" className="hover:text-accent transition-colors">My Dashboard</Link></li>
                <li><Link href="/editor/new" className="hover:text-accent transition-colors">Create CV</Link></li>
                <li><Link href="/login" className="hover:text-accent transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>&copy; 2024 Profolio Inc. All rights reserved. Crafted for modern careers.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
