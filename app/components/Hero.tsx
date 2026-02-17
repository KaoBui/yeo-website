"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CircularGallery from "./CircularGallery";
import { HOLD_DURATION_S } from "@/app/components/IntroOverlay";
import { ANIMATION_DURATION_S } from "@/app/components/IntroOverlay";
import { SplitText } from "gsap/SplitText";

const items = [
  { image: "/hero-1.jpg", text: "" },
  { image: "/hero-2.jpg", text: "" },
  { image: "/hero-3.jpg", text: "" },
  { image: "/hero-4.jpg", text: "" },
  { image: "/hero-5.jpg", text: "" },
  { image: "/hero-6.jpg", text: "" },
  { image: "/hero-7.jpg", text: "" },
  { image: "/hero-8.jpg", text: "" },
];
export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const subheadingRef = useRef<HTMLDivElement | null>(null);
  const delayDuration = HOLD_DURATION_S + ANIMATION_DURATION_S - 0.5;

  useGSAP(() => {
    if (!headingRef.current || !subheadingRef) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const headingSplit = SplitText.create(headingRef.current, {
      type: "lines",
      mask: "lines",
    });
    const subheadingSplit = SplitText.create(subheadingRef.current, {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap
      .timeline()
      .from(subheadingSplit.lines, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        delay: delayDuration,
        ease: "power3.out",
      })
      .from(
        headingSplit.lines,
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
        },
        "<0.1",
      );

    return () => headingSplit.revert();
  }, []);

  useGSAP(() => {
    if (!heroRef.current || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(containerRef.current, {
      transformOrigin: "center center",
      filter: "blur(0px)",
      scale: 1,
    });

    gsap.to(containerRef.current, {
      scale: 0.9,
      filter: "blur(8px)",
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=65%",
        pin: containerRef.current,
        pinSpacing: false,
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative mt-0">
      <div
        ref={containerRef}
        className="site-container flex min-h-[65vh] flex-col items-center justify-center gap-2 pt-6 will-change-transform"
        style={{ willChange: "transform, filter" }}
      >
        {" "}
        <p className="text-secondary text-center text-base font-medium uppercase">
          Cùng kiến tạo
        </p>
        <Image
          src="/logo-blue.png"
          alt="Logo Yeo Vietnam"
          width={100}
          height={100}
          className="mb-4 aspect-square h-20 w-20"
        />{" "}
        <p ref={subheadingRef} className="text-primary text-h5 uppercase">
          Vì thế hệ trẻ Việt Nam
        </p>
        <h1
          ref={headingRef}
          className="text-display text--blue-600 text-center leading-none tracking-tight uppercase"
        >
          vươn mình rực rỡ
        </h1>
        <div className="flex items-center p-2 rounded-xl shadow-sm gap-2 pl-4 mt-2">
          <p className="text-xs uppercase text-primary">giá trị quỹ YEO VIETNAM</p>
          <div className="bg--blue-600 px-4 py-2 rounded-lg text-sm text-white">
            <p>15,000,000</p>
          </div>
        </div>
      </div>{" "}
      <div className="h-[35svh] xl:h-[80vh] relative -mt-[10vh]">
        <CircularGallery
          items={items}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
          bend={2}
          scrollSpeed={0.6}
        />
      </div>
    </section>
  );
}
