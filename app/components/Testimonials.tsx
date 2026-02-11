"use client";
import FeedbackCard from "./FeedbackCard";
import { feedback } from "./feedback/Feedback";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const TestimonialsTitleRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!TestimonialsTitleRef.current) return;

    gsap.from(TestimonialsTitleRef.current, {
      y: 24,
      opacity: 0,
      scale: 1.5,
      filter: "blur(16px)",
      ease: "power2.out",
      scrollTrigger: {
        trigger: TestimonialsTitleRef.current,
        start: "top bottom",
        end: "top 75%",
        scrub: 1,
      },
    });

    ScrollTrigger.create({
      trigger: TestimonialsTitleRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
    });
  }, []);

  return (
    <section id="testimonials">
      <div className="site-container flex h-screen items-center justify-center">
        <h2
          ref={TestimonialsTitleRef}
          className="text-h1 text-secondary py-site-margin text-center"
        >
          <span className="text-primary italic"> niềm tin </span>
          <br /> từ cộng đồng
        </h2>
      </div>
      {feedback.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="flex h-screen flex-col items-center justify-center"
        >
          <FeedbackCard {...item} />
        </div>
      ))}
    </section>
  );
}
