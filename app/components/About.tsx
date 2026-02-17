"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "./ui/RevealText";
import { useRef } from "react";
import Image from "next/image";
import { SplitText } from "gsap/SplitText";

export default function About() {
  const aboutImgRef = useRef<HTMLDivElement | null>(null);
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

    gsap.fromTo(
      aboutImgRef.current,
      {
        scale: 0.5,
        filter: "blur(12px)",
        transformOrigin: "top center",
      },
      {
        scale: 1,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: aboutImgRef.current,
          start: "top bottom",
          end: "top 50%",
          scrub: true,
        },
      },
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
    <section ref={aboutRef} id="about" className="">
      <div className="site-container flex h-full flex-col items-center justify-center gap-6">
        <h2
          ref={aboutTitleRef}
          className="text-h1 text-secondary leading-head text-center uppercase"
        >
          Về
          <span className="text-primary italic"> YEO </span>
          <br></br>
          VIETNAM
        </h2>
        <div
          ref={aboutImgRef}
          className="img-container pt-site-margin aspect-16/9 w-1/2 py-10"
        >
          <Image
            src="/yeo-team.jpg"
            alt="Logo Yeo Vietnam"
            width={900}
            height={600}
            className="h-auto w-full rounded-3xl object-cover object-center"
          />
        </div>
        <div
          ref={firstTextWrapRef}
          className="mt-[25vh] flex max-w-4xl flex-col justify-center gap-[25vh] pt-6"
        >
          <p>
            <RevealText className="text-secondary text-center text-xl">
              <span className="text-primary font-medium uppercase">
                Youth Empowerment Organization (YEO) Vietnam
              </span>{" "}
              là Tổ chức Định hướng và Phát triển Tiềm năng trẻ Việt Nam.
            </RevealText>
          </p>{" "}
        </div>
        <div
          ref={secondTextWrapRef}
          className="mt-[25vh] flex max-w-4xl flex-col justify-center gap-[25vh] pt-6"
        >
          <p>
            <RevealText className="text-secondary text-center text-xl">
              <span className="text-primary font-medium uppercase">
                YEO Vietnam{" "}
              </span>{" "}
              mang sứ mệnh xây dựng một hệ sinh thái giáo dục hiện đại, nơi mỗi
              cá nhân đều được trao quyền để thấu hiểu bản thân và tự tin kiến
              tạo tương lai.
            </RevealText>
          </p>
        </div>
      </div>
    </section>
  );
}
