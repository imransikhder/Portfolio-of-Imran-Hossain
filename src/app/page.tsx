import Scene3D from "@/components/three/Scene3D";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import MouseFollowLight from "@/components/ui/MouseFollowLight";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050816]">
      {/* ── 3D Background (fixed behind everything) ── */}
      <Scene3D />

      {/* ── Mouse follow light effect ── */}
      <MouseFollowLight />

      {/* ── Scroll progress bar ── */}
      <ScrollProgress />

      {/* ── Sticky navigation ── */}
      <Navbar />

      {/* ── Page sections ── */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
