
import { useEffect} from 'react';
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";


gsap.registerPlugin(CSSPlugin);
const SplashScreen = () => {

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".splash-screen",
      { y: "100vh" },
      { y: 0, duration: 1, ease: "power3.inout" },
    )
    .to(
      ".splash-screen",
      { y: "-100vh", duration: 1.5, ease: "power3.inOut", delay: 0.8 },
    )
  }, []);

  return (
    // <motion.div
    // initial={{ y: '100vh' }}
    // animate={{ y: 0 }}
    // exit={{ y: '-100vh' }}
    //   transition={{ duration: 1}}
      <div className="splash-screen">
        <h1>Roooms</h1>
      </div>
  );
};

export default SplashScreen;
