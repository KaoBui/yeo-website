"use client";
import Image from "next/image";
import RewindCard from "@/app/components/rewind/RewindCard";
import { rewindCards } from "@/app/components/rewind/Rewind";
import NumberFlow from "@number-flow/react";
import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useTranslations } from "next-intl";

export default function Rewind() {
  const t = useTranslations("Rewind");
  const rewindKeys = ["ss19", "ss20", "sp21", "ss22", "ivy", "vhbc"] as const;
  const localizedRewindCards = useMemo(
    () =>
      rewindCards.map((card, index) => {
        const key = rewindKeys[index];
        if (!key) return card;
        return {
          ...card,
          projectDescription: t(`${key}.text`),
          image: {
            ...card.image,
            alt: t(`${key}.alt`),
          },
        };
      }),
    [t],
  );
  const rewindTitleRef = useRef<HTMLDivElement | null>(null);
  const rewindRef = useRef<HTMLElement | null>(null);
  const rewindPinRef = useRef<HTMLDivElement | null>(null);
  const rewindBgRef = useRef<HTMLDivElement | null>(null);
  const rewindCardsWrapRef = useRef<HTMLDivElement | null>(null);
  const rewindCardsMoveRef = useRef<HTMLDivElement | null>(null);
  const rewindCardsRef = useRef<HTMLDivElement | null>(null);
  const cardItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeYear, setActiveYear] = useState<number>(
    Number.parseInt(localizedRewindCards[0]?.date ?? "2000", 10) || 2000,
  );
  const springEasing = `linear(0, 0.0019 0.48%, 0.008, 0.018 1.51%, 0.0324 2.06%, 0.0731 3.18%, 0.131 4.4%, 0.1881 5.43%, 0.261 6.62%, 0.5554 11.05%, 0.6806 13.04%, 0.7961 15.1%, 0.8901 17.06%, 0.9313, 0.968, 1.0002, 1.0281 21.04%, 1.0524, 1.0725 23.09%, 1.089 24.15%, 1.1019 25.25%, 1.113 26.66%, 1.1187 28.14%, 1.1192 29.71%, 1.1147 31.41%, 1.1078 32.83%, 1.0976 34.43%, 1.0415 41.66%, 1.0172 45.39%, 1.0068 47.44%, 0.9985 49.53%, 0.9925 51.65%, 0.9883 53.9%, 0.9859 56.92%, 0.9863 60.42%, 0.9975 73.75%, 1.001 80.97%, 1.0006 99.99%)`;
  const springDuration = 500;
  const imageRefreshFrameRef = useRef<number | null>(null);

  const handleCardImageLoad = () => {
    if (imageRefreshFrameRef.current !== null) return;
    imageRefreshFrameRef.current = window.requestAnimationFrame(() => {
      imageRefreshFrameRef.current = null;
      ScrollTrigger.refresh();
    });
  };

  useGSAP(() => {
    if (!rewindTitleRef.current) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const mm = gsap.matchMedia();

    const split = SplitText.create(rewindTitleRef.current, {
      type: "lines",
      mask: "lines",
    });

    mm.add(
      {
        isMobile: "(max-width: 63.999rem)",
        isDesktop: "(min-width: 64rem)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rewindTitleRef.current,
            start: isMobile ? "top 50%" : "top 20%",
            toggleActions: "play none none reverse",
          },
        });
      },
    );

    return () => {
      mm.revert();
      split.revert();
    };
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
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
      const cardsHeight = rewindCardsRef.current?.scrollHeight ?? 0;
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

    // Desktop-only heavy interactions.
    mm.add("(min-width: 64rem)", () => {
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

          const year = Number.parseInt(
            localizedRewindCards[activeIndex]?.date ?? "",
            10,
          );
          if (Number.isFinite(year)) {
            setActiveYear((prev) => (prev === year ? prev : year));
          }
        },
      });

      return () => {
        cardsCenterTween.kill();
        activeCardTrigger.kill();
      };
    });

    return () => {
      if (imageRefreshFrameRef.current !== null) {
        window.cancelAnimationFrame(imageRefreshFrameRef.current);
        imageRefreshFrameRef.current = null;
      }
      rewindBgTween.kill();
      rewindTrigger.kill();
      mm.revert();
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
        <div className="site-container flex h-screen grid-cols-12 gap-4 lg:grid">
          <div
            id="rewind-text"
            className="xl:pt-site-margin col-start-1 col-end-5 flex h-screen w-full flex-col items-center gap-8 pt-[10svh] lg:items-start lg:justify-between"
          >
            <h2
              ref={rewindTitleRef}
              className="text-h1 text-center text-neutral-200 lg:text-left"
            >
              {t.rich("title", {
                em: (chunks) => (
                  <span className="text-white italic">{chunks}</span>
                ),
              })}
            </h2>
            <p className="text-display hidden text-right text-neutral-400 lg:block">
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
      <div className="site-container relative z-10 grid-cols-12 gap-4 lg:grid">
        <div
          aria-hidden="true"
          className="col-start-1 col-end-2 h-[50svh] lg:h-screen"
        ></div>
        <div
          ref={rewindCardsWrapRef}
          className="col-start-6 col-end-13 flex w-full justify-center"
        >
          <div ref={rewindCardsMoveRef} className="will-change-transform">
            <div
              ref={rewindCardsRef}
              className="rewind-wrapper-bg relative flex w-full origin-top-left flex-col gap-12 px-(--site--margin) py-20 shadow-xl lg:rotate-[1deg]"
            >
              <div className="w-site-margin absolute left-0 flex h-full flex-col items-center justify-around text-sm">
                <p className="text--orange-400 w-max -rotate-90 text-xs font-medium uppercase">
                  YEO VN
                </p>
                <p className="text--orange-400 w-max -rotate-90 text-xs font-medium uppercase">
                  YEO archives
                </p>
                <p className="text--orange-400 w-max -rotate-90 text-xs font-medium uppercase">
                  all rights reserved.
                </p>
              </div>
              <div className="w-site-margin absolute right-0 flex h-full flex-col items-center justify-around">
                <p className="text--orange-400 w-max -rotate-90 text-xs font-medium uppercase">
                  since 2019
                </p>
                <p className="text--orange-400 w-max -rotate-90 text-xs font-medium uppercase">
                  all rights reserved.
                </p>
                <p className="text--orange-400 w-max -rotate-90 text-xs font-medium uppercase">
                  made with love
                </p>
                <p className="text--orange-400 w-max -rotate-90 text-xs font-medium uppercase">
                  all rights reserved.
                </p>
              </div>
              <div className="img-container flex w-full justify-center">
                <Image
                  src="/logo-white.png"
                  alt="yeo logo"
                  width={800}
                  height={800}
                  className="h-auto w-1/2 object-cover"
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
              {localizedRewindCards.map((card, index) => (
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
                    firstImage={card.firstImage}
                    image={card.image}
                    onImageLoad={handleCardImageLoad}
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
