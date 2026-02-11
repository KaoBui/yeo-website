"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "./ui/RevealText";
import { useRef } from "react";
import Image from "next/image";

export default function About() {
  const aboutImgRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const aboutTitleRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!aboutImgRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(aboutImgRef.current, {
      scale: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: aboutImgRef.current,
        start: "top bottom",
        end: "50% 50%",
        scrub: 1,
      },
    });

    // ScrollTrigger.create({
    //   trigger: aboutImgRef.current,
    //   start: "top 16px",
    //   end: "+=100%",
    //   pin: true,
    // });
  }, []);

  return (
    <section ref={aboutRef} id="about" className="">
      <div className="site-container flex h-full flex-col items-center justify-center gap-6">
        <h2
          ref={aboutTitleRef}
          className="text-h1 text-secondary leading-head text-center uppercase"
        >
          Về
          <span className="text--blue-600 italic"> YEO </span>
          <br></br>
          VIETNAM
        </h2>
        <div
          ref={aboutImgRef}
          className="img-container my-10 aspect-16/9 w-1/2 overflow-hidden rounded-2xl rounded-3xl bg-neutral-100"
        >
          <Image
            src="/yeo-team.jpg"
            alt="Logo Yeo Vietnam"
            width={900}
            height={600}
            className="h-full object-cover"
          />
        </div>
        <div className="flex max-w-4xl flex-col justify-center gap-[25vh] pt-[25vh]">
          <p>
            <RevealText className="text-secondary max-w-[40ch] text-center text-xl">
              <span className="text-primary font-medium uppercase">
                Youth Empowerment Organization (YEO) Vietnam
              </span>{" "}
              là Tổ chức Định hướng và Phát triển Tiềm năng trẻ Việt Nam.
            </RevealText>
          </p>
          <p>
            <RevealText className="text-secondary max-w-[48ch] text-center text-xl">
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
