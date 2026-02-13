"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CircularGallery from "./CircularGallery";
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
    <section
      id="hero"
      ref={heroRef}
      className="relative mt-0 h-[100vh] min-h-[1200px]"
    >
      <div className="flex h-full flex-col">
        <div
          ref={containerRef}
          className="site-container flex min-h-[65vh] flex-col items-center justify-center gap-2 pt-6 will-change-transform"
          style={{ willChange: "transform, filter" }}
        >
          <Image
            src="/logo-blue.png"
            alt="Logo Yeo Vietnam"
            width={100}
            height={100}
            className="my-2 aspect-square h-20 w-20"
          />{" "}
          <p className="text-secondary mb-4 text-center text-base font-medium uppercase">
            Cùng kiến tạo
          </p>
          <p className="text-primary text-h5 uppercase">
            Vì thế hệ trẻ Việt Nam
          </p>
          <h1 className="text-display text--blue-600 text-center leading-none tracking-tight uppercase">
            vươn mình rực rỡ
          </h1>
        </div>{" "}
        <div
          style={{ height: "100vh", position: "relative", marginTop: "-10vh" }}
        >
          <CircularGallery
            items={items}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            bend={2}
            scrollSpeed={0.6}
          />
        </div>
      </div>
    </section>
  );
}
