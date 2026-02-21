"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import type { ProjectData } from "./projects/project";
import { FlipButton } from "./ui/FlipButton";

type ProjectOverlayProps = {
  project: ProjectData | null;
  onClose: () => void;
};

export default function ProjectOverlay({
  project,
  onClose,
}: ProjectOverlayProps) {
  const t = useTranslations("Projects");
  const images = project?.images ?? [];
  const rowImages = images.slice(0, 3);

  // Lock scroll + keyboard controls
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Overlay container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 select-none">
            <motion.div
              layoutId={`project-card-${project.id}`}
              className="relative flex h-[92vh] w-full max-w-7xl flex-col items-center justify-between gap-6 overflow-hidden rounded-[40px] bg-neutral-100 p-3 sm:p-4"
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image row */}
              <div className="img-container grid h-3/5 min-h-[220px] w-full grid-cols-1 overflow-hidden rounded-[32px] shadow-[0_4px_50px_rgba(0,0,0,0.2)] sm:grid-cols-3">
                {rowImages.map((src, i) => (
                  <div key={`${project.id}-${src}-${i}`} className="relative">
                    <Image
                      src={src}
                      alt={`${project.imageAlt} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Text */}
              <div className="flex w-full flex-col items-center justify-end gap-4 px-0 md:px-6">
                {/* Header */}
                <div className="flex w-full flex-col items-start gap-2 px-1 md:flex-row md:items-end md:justify-center md:gap-4">
                  <p className="text-md text-tertiary uppercase">
                    {project.subtitle}
                  </p>
                  <h3 className="text-h5 text-primary uppercase italic">
                    {project.title}
                  </h3>
                </div>
                {/* Text content */}
                <div className="flex w-full flex-col items-start gap-2 px-1 pb-2 text-sm md:flex-row md:gap-6 md:text-base">
                  <p className="text-primary flex-1 leading-relaxed">
                    {project.paragraphs[0]}
                  </p>
                  <p className="text-primary flex-1 leading-relaxed">
                    {project.paragraphs[1]}
                  </p>
                </div>
              </div>
              <div>
                <FlipButton
                  onClick={onClose}
                  frontText={t("close")}
                  backText={t("close")}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
