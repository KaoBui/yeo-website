"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type PartnerLogo = {
  src: string;
  alt: string;
};

type PartnerLogosProps = {
  logos: PartnerLogo[];
  direction?: "left" | "right";
  className?: string;
};

export default function PartnerLogos({
  logos,
  direction = "left",
  className,
}: PartnerLogosProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  const loopedLogos = logos.length > 0 ? [...logos, ...logos] : [];

  useGSAP(() => {
    if (!sectionRef.current || !rowRef.current) return;

    const fromX = direction === "left" ? 12 : -12;
    const toX = direction === "left" ? -12 : 12;

    gsap.fromTo(
      rowRef.current,
      { xPercent: fromX },
      {
        xPercent: toX,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, [direction]);

  if (logos.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={["w-full overflow-hidden py-16", className]
        .filter(Boolean)
        .join(" ")}
      aria-label="Partner logos"
    >
      <div className="w-full overflow-hidden">
        <div
          ref={rowRef}
          className="flex min-w-max items-center gap-6 px-6 will-change-transform md:gap-8"
        >
          {loopedLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 md:h-24 md:w-56"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
