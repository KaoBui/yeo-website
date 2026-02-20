import Hero from "../components/Hero";
import GridBackground from "../components/GridBackground";
import About from "../components/About";
import NumbersCol from "../components/NumbersCol";
import Projects from "../components/Projects";
import Rewind from "../components/Rewind";
import Testimonials from "../components/Testimonials";
import Fund from "../components/Fund";

export default function Home() {
  return (
    <>
      <main>
        <GridBackground />
        <Hero />
        <About />
        <NumbersCol />
        <Projects />
        <Fund />
        <Rewind />
        <Testimonials />
      </main>
    </>
  );
}
