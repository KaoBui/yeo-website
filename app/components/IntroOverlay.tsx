"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import NumberFlow from "@number-flow/react";

export const HOLD_DURATION_S = 4;
export const ANIMATION_DURATION_S = 0.9;
const GROUP_STAGGER_S = 0.12;
const springEasing = `cubic-bezier(0.785, 0.135, 0.15, 0.86)`;
const springDuration = 3000;

export default function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingValue, setLoadingValue] = useState(0);
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.__lenisLocked = true;
    window.__lenis?.stop();
    const columns = columnRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    const groupOrder = [2, 1, 0, 0, 1, 2];

    const counter = { value: 0 };
    const loadingTl = gsap.timeline();
    loadingTl
      .fromTo(
        logoRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: HOLD_DURATION_S,
          ease: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        },
      )
      .to(
        counter,
        {
          value: 100,
          onUpdate: () => setLoadingValue(Math.round(counter.value)),
        },
        0,
      );

    const tl = gsap.timeline({
      delay: HOLD_DURATION_S,
      onComplete: () => {
        setIsVisible(false);
        window.__lenisLocked = false;
        window.__lenis?.start();
      },
    });

    tl.to(columns, {
      yPercent: 100,
      duration: ANIMATION_DURATION_S,
      ease: "power3.inOut",
      stagger: (index) => groupOrder[index] * GROUP_STAGGER_S,
    }).fromTo(
      loadingRef.current,
      {
        clipPath: "inset(0% 0% 0% 0%)",
      },
      {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: ANIMATION_DURATION_S,
        ease: "power3.inOut",
      },
      0,
    );

    return () => {
      tl.kill();
      loadingTl.kill();
      window.__lenisLocked = false;
      window.__lenis?.start();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-auto fixed inset-0 z-[200] grid h-screen w-full grid-cols-6"
    >
      <div className="absolute inset-0 z-[201] grid h-full w-full grid-cols-6">
        <div
          ref={loadingRef}
          className="relative col-start-3 col-end-5 flex items-center justify-center"
        >
          {" "}
          <div
            ref={logoRef}
            className="flex h-full w-full items-center justify-center opacity-0"
          >
            <Image
              src="/logo-white.png"
              alt="yeo logo"
              width={800}
              height={800}
              className="h-auto w-full lg:w-1/2 object-cover"
              loading="eager"
            />
          </div>
          <p className="text-display text--blue-50 absolute bottom-[15svh] lg:bottom-0 text-right">
            <NumberFlow
              trend={1}
              transformTiming={{
                duration: springDuration,
                easing: springEasing,
              }}
              format={{ notation: "standard", useGrouping: false }}
              value={loadingValue}
            />
          </p>
        </div>
      </div>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            columnRefs.current[index] = el;
          }}
          className="bg--blue-600 border--blue-500 h-full w-full border-r"
        />
      ))}
    </div>
  );
}
