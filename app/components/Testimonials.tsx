"use client";
import FeedbackCard from "./FeedbackCard";
import { feedback } from "./feedback/Feedback";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PartnerLogos from "./PartnerLogos";
import RevealTitle from "./ui/RevealTItle";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const testimonialsRef = useRef<HTMLElement | null>(null);
  const TestimonialsTitleRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(() => {
    if (!testimonialsRef.current || !TestimonialsTitleRef.current) return;

    const validCards = cardRefs.current.filter((card): card is HTMLDivElement =>
      Boolean(card),
    );
    const lastCard = validCards.at(-1);
    if (!lastCard) return;

    validCards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        endTrigger: lastCard,
        end: "top top",
        pin: true,
        pinSpacing: false,
      });

      const nextCard = validCards[index + 1];
      if (!nextCard) return;

      const rotateTo = index % 2 === 0 ? 5 : -5;

      ScrollTrigger.create({
        trigger: nextCard,
        start: "top top",
        onEnter: () => {
          gsap.to(card, {
            rotation: rotateTo,
            duration: 0.35,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(card, { rotation: 0, duration: 0.35, ease: "power2.out" });
        },
      });
    });
  }, []);

  return (
    <section id="testimonials" ref={testimonialsRef}>
      <div className="site-container flex h-screen items-center justify-center">
        <h2
          ref={TestimonialsTitleRef}
          className="text-h1 text-secondary py-site-margin text-center"
        >
          <RevealTitle>
            <span className="text-primary italic"> niềm tin </span>
            <br /> từ cộng đồng
          </RevealTitle>
        </h2>
      </div>
      {feedback.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="flex h-screen flex-col items-center justify-center overflow-hidden mx-4"
        >
          <FeedbackCard {...item} />
        </div>
      ))}
      <PartnerLogos
        direction="left"
        logos={[
          { src: "/schools/buv.png", alt: "Partner A" },
          { src: "/schools/swinburne.jpg", alt: "Partner B" },
          { src: "/schools/demontfort.png", alt: "Partner C" },
          { src: "/schools/fullbright.jpg", alt: "Partner D" },
          { src: "/schools/greenwich.jpg", alt: "Partner E" },
          { src: "/schools/hbu.png", alt: "Partner D" },
        ]}
      />
      <PartnerLogos
        direction="right"
        logos={[
          { src: "/schools/buv.png", alt: "Partner A" },
          { src: "/schools/swinburne.jpg", alt: "Partner B" },
          { src: "/schools/demontfort.png", alt: "Partner C" },
          { src: "/schools/fullbright.jpg", alt: "Partner D" },
          { src: "/schools/greenwich.jpg", alt: "Partner E" },
          { src: "/schools/hbu.png", alt: "Partner D" },
        ]}
      />
    </section>
  );
}
