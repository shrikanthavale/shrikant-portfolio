import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import TechStack from "@/app/components/TechStack";
import Projects from "@/app/components/Projects";
import BlogPreview from "@/app/components/BlogPreview";
import Footer from "@/app/components/Footer";

export default function Page() {
  const intentionalCiFailure: string = 123;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <Hero />
      <TechStack />
      <Projects />
      <BlogPreview />
      <Footer />
    </main>
  );
}
