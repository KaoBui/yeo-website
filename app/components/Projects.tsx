"use client";
import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { projects } from "./projects/project";
import ProjectCard from "./ProjectCard";
import ProjectOverlay from "./ProjectOverlay";
import RevealTitle from "./ui/RevealTItle";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Projects() {
  const t = useTranslations("Projects");
  const projectTitleRef = useRef<HTMLHeadingElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const localizedProjects = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        title: t(`${project.id}.title`),
        subtitle: t(`${project.id}.subtitle`),
        imageAlt: t(`${project.id}.imageAlt`),
        buttonText: t("buttonText"),
        paragraphs: [
          t(`${project.id}.paragraphs.0`),
          t(`${project.id}.paragraphs.1`),
        ] as [string, string],
      })),
    [t],
  );

  const expandedProject = useMemo(() => {
    if (!expandedId) return null;
    return localizedProjects.find((p) => p.id === expandedId) ?? null;
  }, [expandedId, localizedProjects]);

  return (
    <section id="projects" className="min-h-screen py-16">
      <div className="site-container">
        <div className="flex flex-col items-center">
          <h2
            ref={projectTitleRef}
            className="text-h1 text-secondary text-center uppercase"
          >
            <RevealTitle>
              {t.rich("title", {
                br: () => <br />,
                em: (chunks) => <span className="text-primary italic">{chunks}</span>,
              })}
            </RevealTitle>
          </h2>
        </div>
      </div>
      <div className="mt-8">
        <Swiper
          spaceBetween={24}
          centeredSlides
          slidesPerView={1.15}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 2.2, spaceBetween: 0 },
          }}
        >
          {localizedProjects.map((project, idx) => {
            const isActive = idx === activeIndex;

            return (
              <SwiperSlide key={project.id} className="flex justify-center py-8">
                <div
                  className={[
                    "flex justify-center transition-all duration-300 ease-out",
                    isActive ? "scale-100 opacity-100" : "scale-[0.84] opacity-75",
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
      <ProjectOverlay project={expandedProject} onClose={() => setExpandedId(null)} />
    </section>
  );
}
