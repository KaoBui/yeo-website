"use client";
import NumberFlow, { continuous } from "@number-flow/react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function NumbersCol() {
  const numberCardsRef = useRef<HTMLDivElement[]>([]);
  const [cardValues, setCardValues] = useState([0, 0, 0, 0]);
  const springEasing = `linear(0, 0.0019 0.48%, 0.008, 0.018 1.51%, 0.0324 2.06%, 0.0731 3.18%, 0.131 4.4%, 0.1881 5.43%, 0.261 6.62%, 0.5554 11.05%, 0.6806 13.04%, 0.7961 15.1%, 0.8901 17.06%, 0.9313, 0.968, 1.0002, 1.0281 21.04%, 1.0524, 1.0725 23.09%, 1.089 24.15%, 1.1019 25.25%, 1.113 26.66%, 1.1187 28.14%, 1.1192 29.71%, 1.1147 31.41%, 1.1078 32.83%, 1.0976 34.43%, 1.0415 41.66%, 1.0172 45.39%, 1.0068 47.44%, 0.9985 49.53%, 0.9925 51.65%, 0.9883 53.9%, 0.9859 56.92%, 0.9863 60.42%, 0.9975 73.75%, 1.001 80.97%, 1.0006 99.99%)`;
  const springDuration = 2500;

  const setNumberCardRef = (el: HTMLDivElement | null) => {
    if (!el || numberCardsRef.current.includes(el)) return;
    numberCardsRef.current.push(el);
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const [card1, card2, card3, card4] = numberCardsRef.current;
    if (!card1 || !card2 || !card3 || !card4) return;
    const cardImpair = [card1, card3];
    const cardPair = [card2, card4];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#numbers",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(
      cardImpair,
      {
        yPercent: 15,
        duration: 1,
      },
      { yPercent: -15 },
      0,
    ).fromTo(cardPair, { yPercent: -15, duration: 1 }, { yPercent: 15 }, 0);

    ScrollTrigger.create({
      trigger: "#numbers",
      start: "top 80%",
      onEnter: () => setCardValues([25, 50, 50, 60]),
      once: true,
    });
  }, []);

  return (
    <section id="numbers" className="">
      <div className="site-container grid grid-cols-12 gap-4 py-[50vh]">
        <div
          ref={setNumberCardRef}
          className="number-card bg--blue-50 col-start-1 col-end-4 flex min-h-[60vh] flex-col justify-between rounded-2xl p-4"
        >
          <p className="text-h1 text--blue-600 leading-none">
            <NumberFlow
              trend={0}
              transformTiming={{
                duration: springDuration,
                easing: springEasing,
              }}
              format={{ notation: "standard" }}
              value={cardValues[0]}
              suffix="+"
            />
          </p>
          <p className="text-secondary text-md pr-[10%] font-medium uppercase">
            CHƯƠNG TRÌNH HƯỚNG NGHIỆP
          </p>
        </div>
        <div
          ref={setNumberCardRef}
          className="number-card bg--blue-600 col-start-4 col-end-7 flex min-h-[60vh] flex-col justify-between rounded-2xl p-4"
        >
          <p className="text-h1 w-full leading-none break-normal text-white">
            <NumberFlow
              trend={0}
              transformTiming={{
                duration: springDuration,
                easing: springEasing,
              }}
              format={{ notation: "standard" }}
              value={cardValues[1]}
              suffix=","
            />
            000+
          </p>
          <p className="text--blue-50 text-md pr-[10%] uppercase">
            người theo dõi trên các nền tảng
          </p>
        </div>
        <div
          ref={setNumberCardRef}
          className="number-card bg--blue-50 col-start-7 col-end-10 flex min-h-[60vh] flex-col justify-between rounded-2xl p-4"
        >
          <p className="text-h1 text--blue-600 leading-none">
            <NumberFlow
              trend={0}
              transformTiming={{
                duration: springDuration,
                easing: springEasing,
              }}
              format={{ notation: "standard" }}
              value={cardValues[2]}
              suffix="+"
            />
          </p>
          <p className="text-secondary text-md pr-[10%] uppercase">
            đối tác đồng hành
          </p>
        </div>
        <div
          ref={setNumberCardRef}
          className="number-card bg--blue-600 col-start-10 col-end-13 flex min-h-[60vh] flex-col justify-between rounded-2xl p-4"
        >
          <p className="text-h1 leading-none text-white">
            <NumberFlow
              plugins={[continuous]}
              trend={1}
              transformTiming={{
                duration: springDuration,
                easing: springEasing,
              }}
              format={{ notation: "standard" }}
              value={cardValues[3]}
              suffix=","
            />
            000+
          </p>
          <p className="text--blue-50 text-md pr-[10%] uppercase">
            phụ huynh, học sinh trên toàn quốc
          </p>
        </div>
      </div>
    </section>
  );
}
