"use client";
import { useTranslations } from "next-intl";
import FeedbackCard from "./FeedbackCard";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PartnerLogos from "./PartnerLogos";
import RevealTitle from "./ui/RevealTItle";
import { useSectionRefs } from "../providers/section-refs-provider";

gsap.registerPlugin(ScrollTrigger);

type FeedbackItem = {
  img: string;
  shortText: string;
  longText: string;
  name: string;
  className?: string;
  quoteClassName?: string;
};

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const { testimonialsRef } = useSectionRefs();
  const testimonialsTitleRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const feedback: FeedbackItem[] = [
    {
      img: "",
      shortText: t("cards.0.shortText"),
      longText: t("cards.0.longText"),
      name: t("cards.0.name"),
      className: "bg--blue-100",
      quoteClassName: "text--blue-600",
    },
    {
      img: "",
      shortText: t("cards.1.shortText"),
      longText: t("cards.1.longText"),
      name: t("cards.1.name"),
      className: "bg--orange-100",
      quoteClassName: "text--orange-600",
    },
    {
      img: "",
      shortText: t("cards.2.shortText"),
      longText: t("cards.2.longText"),
      name: t("cards.2.name"),
      className: "bg--red-100",
      quoteClassName: "text--red-600",
    },
    {
      img: "",
      shortText: t("cards.3.shortText"),
      longText: t("cards.3.longText"),
      name: t("cards.3.name"),
      className: "bg--blue-100",
      quoteClassName: "text--blue-600",
    },
  ];

  useGSAP(() => {
    if (!testimonialsRef.current || !testimonialsTitleRef.current) return;

    const validCards = cardRefs.current.filter((card): card is HTMLDivElement =>
      Boolean(card),
    );
    const lastCard = validCards.at(-1);
    if (!lastCard) return;

    ScrollTrigger.create({
      trigger: testimonialsRef.current,
      start: "top top",
      endTrigger: lastCard,
      end: "top top",
      pin: testimonialsTitleRef.current,
      pinSpacing: false,
    });

    validCards.forEach((card, index) => {
      const cardContent = card.querySelector(".feedback-card") as HTMLElement | null;
      const rotateTarget = cardContent ?? card;

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
          gsap.to(rotateTarget, {
            rotation: rotateTo,
            duration: 0.35,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(rotateTarget, {
            rotation: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });
    });
  }, []);

  return (
    <section id="testimonials" ref={testimonialsRef}>
      <div className="site-container flex h-screen items-center justify-center">
        <h2
          ref={testimonialsTitleRef}
          className="text-h1 text-secondary py-site-margin text-center"
        >
          <RevealTitle>
            {t.rich("title", {
              em: (chunks) => <span className="text-primary italic">{chunks}</span>,
              br: () => <br />,
            })}
          </RevealTitle>
        </h2>
      </div>
      {feedback.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="mx-4 flex h-screen flex-col items-center justify-center overflow-hidden"
        >
          <FeedbackCard {...item} />
        </div>
      ))}
      <div className="flex flex-col items-center py-[15vh]">
        <p className="text-h3 leading-head text-secondary max-w-sm py-12 text-center uppercase md:max-w-3xl">
          <RevealTitle>
            {t.rich("partnersTitle", {
              em: (chunks) => <span className="text-primary italic">{chunks}</span>,
            })}
          </RevealTitle>
        </p>
        <PartnerLogos
          direction="left"
          logos={[
            { src: "/schools/buv.png", alt: "Partner A" },
            { src: "/schools/swinburne.jpg", alt: "Partner B" },
            { src: "/schools/demontfort.png", alt: "Partner C" },
            { src: "/schools/fullbright.jpg", alt: "Partner D" },
            { src: "/schools/greenwich.jpg", alt: "Partner E" },
            { src: "/schools/hbu.png", alt: "Partner D" },
            { src: "/schools/vlu.png", alt: "Van Lang University" },
            { src: "/schools/hanu.jpg", alt: "Hanoi University" },
            { src: "/schools/everest.jpg", alt: "Everest School" },
            { src: "/schools/hsu.png", alt: "Hoa Sen University" },
          ]}
        />
        <PartnerLogos
          direction="right"
          logos={[
            {
              src: "/schools/imc.png",
              alt: "IMC University of Applied Sciences Krems",
            },
            {
              src: "/schools/latrobe.jpg",
              alt: "La Trobe University",
            },
            {
              src: "/schools/ltv.jpg",
              alt: "Luong The Vinh School",
            },
            {
              src: "/schools/neu.png",
              alt: "National Economics University",
            },
            {
              src: "/schools/naem.png",
              alt: "National Academy of Education Management",
            },
            {
              src: "/schools/vinschool.png",
              alt: "VinSchool",
            },
            {
              src: "/schools/vinuni.png",
              alt: "VinUni",
            },
            {
              src: "/schools/waikato.jpg",
              alt: "University of Waikato",
            },
            {
              src: "/schools/wellspring.jpg",
              alt: "Wellspring International Bilingual School",
            },
          ]}
        />
        <PartnerLogos
          direction="left"
          logos={[
            {
              src: "/business/baemin.png",
              alt: "Baemin",
            },
            {
              src: "/business/colorMe.png",
              alt: "colorMe",
            },
            {
              src: "/business/hoahoctro.jpg",
              alt: "Hoa Hoc Tro",
            },
            {
              src: "/business/vch.jpg",
              alt: "Vietnam Coaching Hub",
            },
            {
              src: "/business/thetraineeclub.jpeg",
              alt: "The Trainee Club",
            },
            {
              src: "/business/ybox.png",
              alt: "Ybox Vietnam",
            },
            {
              src: "/business/tuoitre.png",
              alt: "Tuoi Tre Newspaper",
            },
            {
              src: "/schools/waikato.jpg",
              alt: "University of Waikato",
            },
            {
              src: "/schools/wellspring.jpg",
              alt: "Wellspring International Bilingual School",
            },
          ]}
        />
      </div>
    </section>
  );
}
