"use client";
import Image from "next/image";
import RewindCard from "@/app/components/rewind/RewindCard";
import { rewindCards } from "@/app/components/rewind/Rewind";
import NumberFlow from "@number-flow/react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Rewind() {
  const RewindTitleRef = useRef<HTMLDivElement | null>(null);
  const rewindRef = useRef<HTMLElement | null>(null);
  const rewindPinRef = useRef<HTMLDivElement | null>(null);
  const rewindBgRef = useRef<HTMLDivElement | null>(null);
  const rewindCardsWrapRef = useRef<HTMLDivElement | null>(null);
  const rewindCardsMoveRef = useRef<HTMLDivElement | null>(null);
  const rewindCardsRef = useRef<HTMLDivElement | null>(null);
  const cardItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeYear, setActiveYear] = useState<number>(
    Number.parseInt(rewindCards[0]?.date ?? "2000", 10) || 2000,
  );
  const springEasing = `linear(0, 0.0019 0.48%, 0.008, 0.018 1.51%, 0.0324 2.06%, 0.0731 3.18%, 0.131 4.4%, 0.1881 5.43%, 0.261 6.62%, 0.5554 11.05%, 0.6806 13.04%, 0.7961 15.1%, 0.8901 17.06%, 0.9313, 0.968, 1.0002, 1.0281 21.04%, 1.0524, 1.0725 23.09%, 1.089 24.15%, 1.1019 25.25%, 1.113 26.66%, 1.1187 28.14%, 1.1192 29.71%, 1.1147 31.41%, 1.1078 32.83%, 1.0976 34.43%, 1.0415 41.66%, 1.0172 45.39%, 1.0068 47.44%, 0.9985 49.53%, 0.9925 51.65%, 0.9883 53.9%, 0.9859 56.92%, 0.9863 60.42%, 0.9975 73.75%, 1.001 80.97%, 1.0006 99.99%)`;
  const springDuration = 500;

  useGSAP(() => {
    if (!RewindTitleRef.current) return;
    gsap.from(RewindTitleRef.current, {
      y: 24,
      opacity: 0,
      scale: 1.5,
      filter: "blur(16px)",
      ease: "power2.out",
      scrollTrigger: {
        trigger: RewindTitleRef.current,
        start: "top 65%",
        end: "top 45%",
        scrub: 1,
      },
    });
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (
      !rewindRef.current ||
      !rewindPinRef.current ||
      !rewindBgRef.current ||
      !rewindCardsWrapRef.current ||
      !rewindCardsRef.current
    )
      return;

    const getPinEnd = () => {
      const cardsHeight = rewindCardsRef.current?.offsetHeight ?? 0;
      const pinDistance = Math.max(
        cardsHeight - window.innerHeight,
        window.innerHeight,
      );
      return `+=${pinDistance}`;
    };

    gsap.from(rewindCardsMoveRef.current, {
      y: "100vh",
      ease: "none",
      duration: 0.3,
      scrollTrigger: {
        trigger: rewindRef.current,
        start: "top top",
        once: true,
        toggleActions: "play none none reverse",
      },
    });

    const rewindBgTween = gsap.fromTo(
      rewindBgRef.current,
      { scaleX: 0.9, transformOrigin: "top center" },
      {
        scaleX: 1,
        borderRadius: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: rewindRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      },
    );

    const rewindTrigger = ScrollTrigger.create({
      trigger: rewindRef.current,
      start: "top top",
      end: getPinEnd,
      pin: rewindPinRef.current,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

    const degToRad = (d: number) => (d * Math.PI) / 180;
    const getLeftOffset = () => {
      const el = rewindCardsRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const theta = degToRad(0.5);
      const minX = Math.min(
        0,
        w * Math.cos(theta),
        -h * Math.sin(theta),
        w * Math.cos(theta) - h * Math.sin(theta),
      );
      return -minX;
    };
    const cardsCenterTween = gsap.to(rewindCardsMoveRef.current, {
      x: getLeftOffset,
      ease: "none",
      scrollTrigger: {
        trigger: rewindRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    const activeCardTrigger = ScrollTrigger.create({
      trigger: rewindRef.current,
      start: "top top",
      end: getPinEnd,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: () => {
        const threshold = window.innerHeight * 0.5;
        let activeIndex = 0;

        cardItemRefs.current.forEach((el, index) => {
          if (!el) return;
          const top = el.getBoundingClientRect().top;
          if (top <= threshold) activeIndex = index;
        });

        const year = Number.parseInt(rewindCards[activeIndex]?.date ?? "", 10);
        if (Number.isFinite(year)) {
          setActiveYear((prev) => (prev === year ? prev : year));
        }
      },
    });

    return () => {
      rewindBgTween.kill();
      rewindTrigger.kill();
      cardsCenterTween.kill();
      activeCardTrigger.kill();
    };
  }, []);

  return (
    <section id="rewind" ref={rewindRef} className="relative">
      <div ref={rewindPinRef} className="absolute inset-0 h-screen w-full">
        <div
          id="rewind-grid"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-9 grid w-full grid-cols-6"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-full w-px justify-self-center bg-neutral-800"
            />
          ))}
        </div>
        <div
          ref={rewindBgRef}
          id="rewind-bg"
          className="absolute inset-0 -z-10 w-full rounded-[40px] bg-neutral-900"
        ></div>
        <div className="site-container grid h-screen grid-cols-12 gap-4">
          <div
            id="rewind-text"
            className="pt-site-margin col-start-1 col-end-5 flex h-screen flex-col items-start justify-between gap-8"
          >
            <h2 ref={RewindTitleRef} className="text-h1 text-white">
              hành trình đã qua
            </h2>
            <p className="text-h1 text-right text-neutral-400">
              <NumberFlow
                trend={-1}
                transformTiming={{
                  duration: springDuration,
                  easing: springEasing,
                }}
                format={{ notation: "standard", useGrouping: false }}
                value={activeYear}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="site-container relative z-10 grid grid-cols-12 gap-4">
        <div
          aria-hidden="true"
          className="col-start-1 col-end-2 h-screen"
        ></div>
        <div
          ref={rewindCardsWrapRef}
          className="col-start-6 col-end-13 flex w-full justify-center"
        >
          <div ref={rewindCardsMoveRef} className="will-change-transform">
            <div
              ref={rewindCardsRef}
              className="flex w-full origin-top-left rotate-[1deg] flex-col gap-12 bg-neutral-800 px-(--site--margin) py-20 shadow-xl"
            >
              <div className="img-container flex w-full justify-center">
                <Image
                  src="/logo-white.png"
                  alt="yeo logo"
                  width={800}
                  height={800}
                  className="h-auto w-1/2 object-cover"
                />
              </div>
              {rewindCards.map((card, index) => (
                <div
                  key={`${card.projectName}-${card.date}-${index}`}
                  ref={(el) => {
                    cardItemRefs.current[index] = el;
                  }}
                >
                  <RewindCard
                    name={card.name}
                    location={card.location}
                    date={card.date}
                    projectName={card.projectName}
                    projectDescription={card.projectDescription}
                    image={card.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
