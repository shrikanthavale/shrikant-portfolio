import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Projects from "@/app/components/Projects";
import TechStack from "@/app/components/TechStack";
import BlogPreview from "@/app/components/BlogPreview";
import Footer from "@/app/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <Hero />
      <Projects />
      <TechStack />
      <BlogPreview />
      <Footer />
    </main>
  );
}
