"use client";
import { useRef } from "react";
import { useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "./projects/project";
import ProjectCard from "./ProjectCard";
import ProjectOverlay from "./ProjectOverlay";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Projects() {
  const projectTitleRef = useRef<HTMLHeadingElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useGSAP(() => {
    if (!projectTitleRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(projectTitleRef.current, {
      y: 24,
      opacity: 0,
      scale: 1.5,
      filter: "blur(16px)",
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: projectTitleRef.current,
        start: "top bottom",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const expandedProject = useMemo(() => {
    if (!expandedId) return null;
    return projects.find((p) => p.id === expandedId) ?? null;
  }, [expandedId]);

  return (
    <section id="projects" className="min-h-screen py-16">
      <div className="site-container">
        <div className="flex flex-col items-center">
          <h2
            ref={projectTitleRef}
            className="text-h1 text-secondary text-center uppercase"
          >
            DỰ ÁN CỦA <br /> <span className="text--blue-600 italic"> YEO</span>{" "}
            VIETNAM
          </h2>
        </div>
      </div>
      <div className="mt-8">
        <Swiper
          spaceBetween={24}
          centeredSlides
          slidesPerView={1.15}
          initialSlide={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 2.6, spaceBetween: 0 },
          }}
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;

            return (
              <SwiperSlide
                key={project.id}
                className="flex justify-center py-8"
              >
                <div
                  className={[
                    "flex justify-center transition-all duration-300 ease-out",
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.84] opacity-75",
                    !isActive ? "blur-[4px]" : "",
                  ].join(" ")}
                >
                  <ProjectCard
                    project={{
                      id: project.id,
                      subtitle: project.subtitle,
                      title: project.title,
                      imageSrc: project.coverImage,
                      imageAlt: project.imageAlt,
                      buttonText: project.buttonText,
                    }}
                    isActive={isActive}
                    onExpand={setExpandedId}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <ProjectOverlay
        project={expandedProject}
        onClose={() => setExpandedId(null)}
      />
    </section>
  );
}
