"use client";
import Image from "next/image";
import yeoWhiteLogo from "@/public/yeo-white.svg";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useSectionRefs } from "./providers/section-refs-provider";

export default function Footer() {
  const t = useTranslations("Footer");
  const footerTextRef = useRef<HTMLParagraphElement | null>(null);
  const { testimonialsRef } = useSectionRefs();

  useGSAP(() => {
    if (!footerTextRef.current || !testimonialsRef.current) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const split = SplitText.create(footerTextRef.current, {
      type: "words",
      mask: "words",
    });

    gsap.from(split.words, {
      yPercent: 120,
      stagger: 0.01,
      duration: 0.7,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "bottom 25%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <footer
      id="contact"
      className="relative h-[80vh] select-none"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="bg--blue-600 fixed bottom-0 h-[80vh] w-full">
        <Image
          src={yeoWhiteLogo}
          alt="YEO Vietnam"
          width={1000}
          height={1000}
          className="absolute -right-1/10 h-[80vh] w-auto opacity-5"
        />
        <div className="site-container relative bottom-0 z-1 flex h-full flex-col justify-between py-4">
          <p
            ref={footerTextRef}
            className="text-h1 leading-head pt-site-margin max-w-[24ch] text-white uppercase"
          >
            {t.rich("text", {
              br: () => <br />,
            })}
          </p>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-12 lg:flex-row">
              <div className="flex flex-col gap-6">
                <p className="text--blue-200 text-sm uppercase">
                  {t("menu-item-1")}
                </p>
                <ul className="space-y-2 text-base text-white">
                  <li>
                    <a href="">contact@yeo.vn</a>
                  </li>
                  <li>
                    <a href="">+84 9 61 35 14 53</a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text--blue-200 text-sm uppercase">
                  {t("menu-item-2")}
                </p>
                <ul className="space-y-2 text-base text-white">
                  <li>
                    <a href="">Facebook</a>
                  </li>
                  <li>
                    <a href="">TikTok</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text--blue-200 flex justify-between border-t border-neutral-50 pt-4 text-sm">
              © {new Date().getFullYear()} {t("footer-rights")}
              <p className="text-xs uppercase">
                Website by{" "}
                <a
                  href="https://kaobui.com/"
                  target="_blank"
                  className="hover:underline"
                >
                  Kao
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
