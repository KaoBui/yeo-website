"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealTitle from "./ui/RevealTItle";

export default function Fund() {
  const t = useTranslations("Fund");
  const fundRef = useRef<HTMLElement | null>(null);
  const fundLeftRef = useRef<HTMLDivElement | null>(null);
  const fundRightRef = useRef<HTMLDivElement | null>(null);
  const fundAmountRef = useRef<HTMLDivElement | null>(null);
  const springEasing = `linear(0, 0.0019 0.48%, 0.008, 0.018 1.51%, 0.0324 2.06%, 0.0731 3.18%, 0.131 4.4%, 0.1881 5.43%, 0.261 6.62%, 0.5554 11.05%, 0.6806 13.04%, 0.7961 15.1%, 0.8901 17.06%, 0.9313, 0.968, 1.0002, 1.0281 21.04%, 1.0524, 1.0725 23.09%, 1.089 24.15%, 1.1019 25.25%, 1.113 26.66%, 1.1187 28.14%, 1.1192 29.71%, 1.1147 31.41%, 1.1078 32.83%, 1.0976 34.43%, 1.0415 41.66%, 1.0172 45.39%, 1.0068 47.44%, 0.9985 49.53%, 0.9925 51.65%, 0.9883 53.9%, 0.9859 56.92%, 0.9863 60.42%, 0.9975 73.75%, 1.001 80.97%, 1.0006 99.99%)`;
  const springDuration = 2500;
  const updatedValue = 15000000;
  const [fundValue, setFundValue] = useState(0);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 64rem)", () => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: fundRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(fundLeftRef.current, { yPercent: 20 })
        .to(fundRightRef.current, { yPercent: -50 }, 0);

      return () => {
        tl.kill();
      };
    });

    gsap.fromTo(
      fundAmountRef.current,
      { xPercent: 100 },
      {
        xPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: fundAmountRef.current,
          start: "bottom 90%",
          once: true,
          onEnter: () => setFundValue(updatedValue),
        },
      },
    );
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={fundRef}>
      <div className="site-container space-y-16 py-[15vh] lg:space-y-6">
        <div ref={fundLeftRef} className="grid-cols-12 gap-6 lg:grid">
          <div className="col-start-1 col-end-7 flex flex-col">
            <h2 className="text-h1 text-secondary mb-4 text-left lg:mb-12 lg:text-right">
              <RevealTitle>
                {t.rich("title", {
                  em: (chunks) => (
                    <span className="text-primary italic">{chunks}</span>
                  ),
                })}
              </RevealTitle>
            </h2>
            <div className="flex flex-col items-start gap-3 overflow-hidden lg:items-end">
              <h3 className="text-secondary text-base">{t("totalLabel")}</h3>
              <div
                ref={fundAmountRef}
                className="bg--blue-600 w-2/3 rounded-md p-3 lg:w-1/2"
              >
                <p className="text--blue-50 text-xl lg:text-right">
                  <NumberFlow
                    trend={0}
                    transformTiming={{
                      duration: springDuration,
                      easing: springEasing,
                    }}
                    format={{ style: "currency", currency: "VND" }}
                    value={fundValue}
                  />
                </p>
              </div>
              <p className="text-tertiary text-xs">{t("lastUpdated")}</p>
            </div>
          </div>
        </div>
        <div ref={fundRightRef} className="grid-cols-12 gap-6 lg:grid">
          <div className="text-secondary col-start-7 col-end-12 flex flex-col gap-12">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <div className="flex w-full gap-8">
              <div className="flex flex-col items-start">
                <div className="">
                  <Image
                    src="/rutine-logo.png"
                    alt={t("logoAlt")}
                    width={60}
                    height={60}
                    className="h-auto w-20 object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="">
                  <Image
                    src="/contrast-logo.png"
                    alt={t("logoAlt")}
                    width={60}
                    height={60}
                    className="h-auto w-20 object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="">
                  <Image
                    src="/nerdbox-logo.jpg"
                    alt={t("logoAlt")}
                    width={60}
                    height={60}
                    className="h-auto w-20 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
