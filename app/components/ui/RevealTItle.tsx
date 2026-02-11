"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

type RevealTitleProps = {
  children: string;
  className?: string;
};

export default function RevealTitle({
  children,
  className = "",
}: RevealTitleProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const split = SplitText.create(textRef.current, {
      type: "lines",
      mask: "lines",
    });

    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => split.revert();
  }, []);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
}
