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
import { useTranslations } from "next-intl";
import NumberFlow, { continuous } from "@number-flow/react";
import { useState } from "react";

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
  const t = useTranslations("Hero");

  const heroRef = useRef<HTMLElement | null>(null);
  const heroFundRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const subheadingRef = useRef<HTMLDivElement | null>(null);
  const delayDuration = HOLD_DURATION_S + ANIMATION_DURATION_S - 0.5;

  const springEasing = `linear(0, 0.0019 0.48%, 0.008, 0.018 1.51%, 0.0324 2.06%, 0.0731 3.18%, 0.131 4.4%, 0.1881 5.43%, 0.261 6.62%, 0.5554 11.05%, 0.6806 13.04%, 0.7961 15.1%, 0.8901 17.06%, 0.9313, 0.968, 1.0002, 1.0281 21.04%, 1.0524, 1.0725 23.09%, 1.089 24.15%, 1.1019 25.25%, 1.113 26.66%, 1.1187 28.14%, 1.1192 29.71%, 1.1147 31.41%, 1.1078 32.83%, 1.0976 34.43%, 1.0415 41.66%, 1.0172 45.39%, 1.0068 47.44%, 0.9985 49.53%, 0.9925 51.65%, 0.9883 53.9%, 0.9859 56.92%, 0.9863 60.42%, 0.9975 73.75%, 1.001 80.97%, 1.0006 99.99%)`;
  const springDuration = 3000;
  const updatedValue = 15000000;
  const [fundValue, setFundValue] = useState(0);

  useGSAP(() => {
    if (!headingRef.current || !subheadingRef.current) return;

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
      )
      .fromTo(
        heroFundRef.current,
        {
          clipPath: "inset(0 50% round 14px)",
        },
        {
          clipPath: "inset(0 0% round 14px)",
          duration: 0.5,
          ease: "power3.out",
        },
        "<0.4",
      )
      .add(() => setFundValue(updatedValue), "<");

    return () => {
      headingSplit.revert();
      subheadingSplit.revert();
    };
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
        className="site-container flex min-h-[80vh] flex-col items-center justify-center gap-[8%] pt-16 will-change-transform"
        style={{ willChange: "transform, filter" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-center gap-8">
            <Image
              src="/contrast-logo.png"
              alt="Logo Yeo Vietnam"
              width={1000}
              height={1000}
              className="h-auto w-20 object-contain"
            />
            <Image
              src="/rutine-logo.png"
              alt="Rutine Logo"
              width={1000}
              height={1000}
              className="h-auto w-20"
            />
            <Image
              src="/nerdbox-logo.jpg"
              alt="Logo Yeo Vietnam"
              width={1000}
              height={1000}
              className="h-auto w-20 object-contain"
            />
          </div>
          {/* <p className="text-secondary text-center text-xs font-medium uppercase">
            {t.rich("label", {
              em: (chunks) => <span className="">{chunks}</span>,
            })}
          </p> */}
        </div>
        <div className="flex flex-col gap-2">
          <p
            ref={subheadingRef}
            className="text-primary text-h5 leading-head text-center uppercase"
          >
            {t("subheading")}
          </p>
          <h1
            ref={headingRef}
            className="text-display text--blue-600 text-center leading-none tracking-tight uppercase"
          >
            {t("heading")}
          </h1>
        </div>
        <div className="mt-2 flex flex-col items-center gap-4">
          <p className="text-secondary text-xs uppercase max-w-[64ch] text-center">{t("fundText")}</p>
          <div
            ref={heroFundRef}
            className="bg--blue-600 text-h5 shadow--blue-600/40 flex items-center rounded-xl px-8 py-1 text-white shadow-2xl"
          >
            <p>
              <NumberFlow
                trend={1}
                plugins={[continuous]}
                transformTiming={{
                  duration: springDuration,
                  easing: springEasing,
                }}
                format={{ style: "currency", currency: "VND" }}
                value={fundValue}
              />
            </p>
          </div>
        </div>
      </div>{" "}
      <div className="relative -mt-[10vh] h-[35svh] xl:h-[80vh]">
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
