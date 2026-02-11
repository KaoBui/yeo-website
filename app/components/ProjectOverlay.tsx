"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [index, setIndex] = useState(0);

  const images = project?.images ?? [];
  const total = images.length;

  // Reset carousel when opening a new project
  useEffect(() => {
    setIndex(0);
  }, [project?.id]);

  // Lock scroll + keyboard controls
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose, total]);

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
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              layoutId={`project-card-${project.id}`}
              className="relative flex h-[92vh] w-full max-w-7xl flex-col gap-6 overflow-hidden rounded-[40px] bg-neutral-100 p-3 sm:p-4"
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image carousel */}
              <div className="img-container relative flex-1 overflow-hidden rounded-[32px] shadow-[0_4px_50px_rgba(0,0,0,0.4)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={images[index]}
                    className="absolute inset-0"
                    initial={{ opacity: 1, scale: 0.995 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 1, scale: 0.995 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={images[index]}
                      alt={project.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                {total > 1 && (
                  <>
                    <button
                      onClick={() => setIndex((i) => (i - 1 + total) % total)}
                      className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer rounded-2xl bg-black/40 px-3 py-2 text-white backdrop-blur-sm transition hover:bg-black/55"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setIndex((i) => (i + 1) % total)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-2xl bg-black/40 px-3 py-2 text-white backdrop-blur-sm transition hover:bg-black/55"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </>
                )}

                {/* Dots */}
                {total > 1 && (
                  <div className="absolute right-0 bottom-3 left-0 flex justify-center gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          i === index
                            ? "bg-white"
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col items-center justify-end gap-4 px-6">
                {/* Header */}
                <div className="flex flex-col items-center px-1">
                  <p className="text-md text-tertiary uppercase">
                    {project.subtitle}
                  </p>
                  <h3 className="text-h5 text-primary uppercase italic">
                    {project.title}
                  </h3>
                </div>
                {/* Text content */}
                <div className="flex w-full items-center gap-6 gap-8 px-1 pb-2">
                  <p className="text-primary flex-1 leading-relaxed">
                    {project.paragraphs[0]}
                  </p>
                  <p className="text-primary flex-1 leading-relaxed">
                    {project.paragraphs[1]}
                  </p>
                </div>
                <div>
                  <FlipButton
                    onClick={onClose}
                    frontText="Close"
                    backText="Close"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
