"use client";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "./ui/RevealText";
import { useRef } from "react";
import Image from "next/image";
import { SplitText } from "gsap/SplitText";

export default function About() {
  const t = useTranslations("About");
  const aboutImgRef = useRef<HTMLDivElement | null>(null);
  const aboutLeftImgRef = useRef<HTMLDivElement | null>(null);
  const aboutRightImgRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const aboutTitleRef = useRef<HTMLDivElement | null>(null);
  const firstTextWrapRef = useRef<HTMLDivElement | null>(null);
  const secondTextWrapRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (
      !aboutImgRef.current ||
      !aboutRef.current ||
      !firstTextWrapRef.current ||
      !secondTextWrapRef.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutImgRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(
      aboutImgRef.current,
      {
        scale: 1.5,
        filter: "blur(12px)",
        transformOrigin: "top center",
      },
      {
        scale: 1,
        filter: "blur(0px)",
        ease: "none",
        duration: 0.3,
      },
    )
      .from(
        aboutLeftImgRef.current,
        {
          xPercent: -55,
          ease: "none",
          duration: 0.3,
        },
        0,
      )
      .from(
        aboutLeftImgRef.current,
        {
          yPercent: 30,
          ease: "none",
          duration: 1,
        },
        "<0",
      )
      .from(
        aboutRightImgRef.current,
        {
          xPercent: 55,
          ease: "none",
          duration: 0.3,
        },
        0,
      )
      .from(
        aboutRightImgRef.current,
        {
          yPercent: 30,
          ease: "none",
          duration: 1,
        },
        "<0",
      );
  }, []);

  useGSAP(() => {
    if (!aboutTitleRef.current) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const split = SplitText.create(aboutTitleRef.current, {
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
        trigger: aboutTitleRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section ref={aboutRef} id="about" className="pt-[15vh]">
      <div className="site-container flex h-full flex-col items-center justify-center gap-6">
        <h2
          ref={aboutTitleRef}
          className="text-h1 text-secondary leading-head text-center uppercase"
        >
          {t.rich("title", {
            em: (chunks) => <span className="text-primary italic">{chunks}</span>,
            br: () => <br />,
          })}
        </h2>
        <div
          ref={aboutImgRef}
          className="pt-site-margin grid grid-cols-12 gap-4 py-10"
        >
          <div className="col-start-4 col-end-10 row-start-1 py-6">
            <Image
              src="/yeo-team-3.jpg"
              alt="Logo Yeo Vietnam"
              width={900}
              height={600}
              className="aspect-16/9 h-auto w-full rounded-xl object-cover object-center"
            />
          </div>
          <div
            ref={aboutLeftImgRef}
            className="col-start-2 col-end-5 row-start-1 flex items-start"
          >
            <Image
              src="/hero-8.jpg"
              alt="Logo Yeo Vietnam"
              width={900}
              height={600}
              className="aspect-16/9 h-auto w-full rounded-lg object-cover object-center shadow-xl"
            />
          </div>
          <div
            ref={aboutRightImgRef}
            className="col-start-9 col-end-12 row-start-1 flex items-end"
          >
            <Image
              src="/yeo-team-2.jpg"
              alt="Logo Yeo Vietnam"
              width={900}
              height={600}
              className="aspect-16/9 h-auto w-full rounded-lg object-cover object-center shadow-xl"
            />
          </div>
        </div>
        <div
          ref={firstTextWrapRef}
          className="mt-[25vh] flex max-w-4xl flex-col justify-center gap-[25vh] pt-6"
        >
          <p>
            <RevealText className="text-secondary text-center text-xl">
              {t.rich("p1", {
                strong: (chunks) => (
                  <span className="text-primary font-medium uppercase">{chunks}</span>
                ),
              })}
            </RevealText>
          </p>
        </div>
        <div
          ref={secondTextWrapRef}
          className="mt-[25vh] flex max-w-4xl flex-col justify-center gap-[25vh] pt-6"
        >
          <p>
            <RevealText className="text-secondary text-center text-xl">
              {t.rich("p2", {
                strong: (chunks) => (
                  <span className="text-primary font-medium uppercase">{chunks}</span>
                ),
              })}
            </RevealText>
          </p>
        </div>
      </div>
    </section>
  );
}
