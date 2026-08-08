import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Ecosystem from "@/components/Ecosystem";
import WhyAttend from "@/components/WhyAttend";
import Dignitaries from "@/components/Dignitaries";
import GetInvolved from "@/components/GetInvolved";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Partners />
      <Ecosystem />
      <WhyAttend />
      <Dignitaries />
      <GetInvolved />
    </>
  );
}
