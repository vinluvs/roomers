/* eslint-disable react/prop-types */
import { useEffect} from "react";
import { gsap } from "gsap";


const PageTransition = ({children}) => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".page-transition",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    return () => {
      gsap.to(".page-transition", {
        opacity: 0,
        y: -50,
        duration: 0.4,
        ease: "power2.in",
      });
    };
  }, []);

  return <div className="page-transition">{children}</div>;
};

export default PageTransition;
