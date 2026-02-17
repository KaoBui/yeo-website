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

    const fromX = direction === "left" ? 0 : -15;
    const toX = direction === "left" ? -15 : 0;

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
          scrub: 1,
        },
      },
    );
  }, [direction]);

  if (logos.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={["my-2 w-full overflow-hidden py-2", className]
        .filter(Boolean)
        .join(" ")}
      aria-label="Partner logos"
    >
      <div className="w-full overflow-hidden">
        <div
          ref={rowRef}
          className="flex min-w-max items-center gap-4 px-6 will-change-transform md:gap-6"
        >
          {loopedLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex h-18 w-32 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-2 md:p-4 md:h-24 md:w-48"
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
