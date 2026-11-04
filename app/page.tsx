import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Packages } from "@/components/sections/packages";
import { Portfolio } from "@/components/sections/portfolio";

export default function Home() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Packages />
      <About />
      <Contact />
    </main>
  );
}
