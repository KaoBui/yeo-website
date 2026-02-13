"use client";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealTitle from "./ui/RevealTItle";

export default function Fund() {
  const fundRef = useRef<HTMLElement | null>(null);
  const fundLeftRef = useRef<HTMLDivElement | null>(null);
  const fundRightRef = useRef<HTMLDivElement | null>(null);
  const fundAmountRef = useRef<HTMLDivElement | null>(null);
  const springEasing = `linear(0, 0.0019 0.48%, 0.008, 0.018 1.51%, 0.0324 2.06%, 0.0731 3.18%, 0.131 4.4%, 0.1881 5.43%, 0.261 6.62%, 0.5554 11.05%, 0.6806 13.04%, 0.7961 15.1%, 0.8901 17.06%, 0.9313, 0.968, 1.0002, 1.0281 21.04%, 1.0524, 1.0725 23.09%, 1.089 24.15%, 1.1019 25.25%, 1.113 26.66%, 1.1187 28.14%, 1.1192 29.71%, 1.1147 31.41%, 1.1078 32.83%, 1.0976 34.43%, 1.0415 41.66%, 1.0172 45.39%, 1.0068 47.44%, 0.9985 49.53%, 0.9925 51.65%, 0.9883 53.9%, 0.9859 56.92%, 0.9863 60.42%, 0.9975 73.75%, 1.001 80.97%, 1.0006 99.99%)`;
  const springDuration = 2500;
  const updatedValue = 15000000;
  const [fundValue, setFundValue] = useState(0);

  useGSAP(() => {
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
      tl.kill();
    };
  }, []);

  return (
    <section ref={fundRef}>
      <div className="site-container space-y-6 py-[10vh]">
        <div ref={fundLeftRef} className="grid grid-cols-12 gap-6">
          <div className="col-start-1 col-end-7 flex flex-col">
            <h2 className="text-h1 text-secondary mb-12 text-right">
              <RevealTitle>
                quỹ <span className="text-primary italic">yeo </span>
                vietnam{" "}
              </RevealTitle>
            </h2>
            <div className="flex flex-col items-end gap-3 overflow-hidden">
              <h3 className="text-secondary text-base">tổng giá trị quỹ</h3>
              <div
                ref={fundAmountRef}
                className="bg--blue-600 w-1/2 rounded-md p-3"
              >
                {" "}
                <p className="text--blue-50 text-right text-xl">
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
              <p className="text-tertiary text-xs">
                cập nhật lần cuối ngày 14/2
              </p>
            </div>
          </div>
        </div>
        <div ref={fundRightRef} className="grid grid-cols-12 gap-6">
          <div className="text-secondary col-start-7 col-end-12 flex flex-col gap-12">
            <p>
              Quỹ YEO Vietnam được thành lập từ sự đồng hành của ba thương hiệu
              Nerd.box, Contrast và Ru:tine, thông qua cơ chế đóng góp 500đ trên
              mỗi hóa đơn. Quỹ ra đời với sứ mệnh trao quyền và mở ra cơ hội
              phát triển cho thế hệ trẻ Việt Nam.
            </p>
            <p>
              Quỹ tập trung triển khai các dự án giáo dục nổi bật: From Beans to
              Dreams, Summer Camp - Định hướng nghề nghiệp, Vietnam High School
              Business Case Competition, và chuỗi talkshow “Chào Safe”. Từ những
              đóng góp nhỏ, Quỹ YEO Vietnam đang từng bước xây dựng một thế hệ
              trẻ tự tin - bản lĩnh - sẵn sàng kiến tạo tương lai.
            </p>
            <div className="flex w-full gap-8">
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-center rounded-2xl bg-neutral-50 p-2">
                  <Image
                    src="/logo-blue.png"
                    alt="Logo Yeo Vietnam"
                    width={60}
                    height={60}
                    className="h-auto w-full rounded-3xl object-cover object-center"
                  />
                </div>
                <p>Yeo Vietnam</p>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-center rounded-2xl bg-neutral-50 p-2">
                  <Image
                    src="/logo-blue.png"
                    alt="Logo Yeo Vietnam"
                    width={60}
                    height={60}
                    className="h-auto w-full rounded-3xl object-cover object-center"
                  />
                </div>
                <p>Yeo Vietnam</p>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-center rounded-2xl bg-neutral-50 p-2">
                  <Image
                    src="/logo-blue.png"
                    alt="Logo Yeo Vietnam"
                    width={60}
                    height={60}
                    className="h-auto w-full rounded-3xl object-cover object-center"
                  />
                </div>
                <p>Yeo Vietnam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
