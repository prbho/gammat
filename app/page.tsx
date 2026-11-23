import About from "@/components/About";
import Ecosystem from "@/components/Ecosystem";
import WhyAttend from "@/components/WhyAttend";
import Dignitaries from "@/components/Dignitaries";
import GetInvolved from "@/components/GetInvolved";
import Hero from "@/components/recap/hero";
import Events from "@/components/recap/events";
import Partners from "@/components/recap/Partners";
import GalleryStrip from "@/components/gallery/GalleryStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <GalleryStrip />
      <Partners />
      <Ecosystem />
      <WhyAttend />
      <Dignitaries />
      <GetInvolved />
    </>
  );
}
