"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FlipButton } from "./ui/FlipButton";

export type Project = {
  id: string;
  subtitle: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
};

type ProjectCardProps = {
  project: Project;
  isActive: boolean;
  onExpand: (id: string) => void;
};

export default function ProjectCard({
  project,
  isActive,
  onExpand,
}: ProjectCardProps) {
  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      className={[
        "flex h-[60vh] min-h-[560px] w-full flex-col items-center gap-6 rounded-[40px] bg-neutral-50 p-2 pb-6",
        // optional: make active pop a bit
        isActive ? "opacity-100" : "scale-[0.98] opacity-60",
      ].join(" ")}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      <div className="img-container w-full flex-1 overflow-hidden rounded-[32px] shadow-[0_4px_50px_rgba(0,0,0,0.2)]">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={800}
          height={800}
          className="h-full w-full object-cover"
          priority={isActive}
        />
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-md text-tertiary text-center uppercase">
          {project.subtitle}
        </p>
        <h3 className="text-h5 text-primary text-center uppercase italic">
          {project.title}
        </h3>
      </div>

      {/* You can keep FlipButton, just wrap it so we control click/disabled */}
      <div
        className={isActive ? "" : "pointer-events-none opacity-50"}
        onClick={() => {
          if (isActive) onExpand(project.id);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (isActive && (e.key === "Enter" || e.key === " "))
            onExpand(project.id);
        }}
      >
        <FlipButton
          frontText={project.buttonText}
          backText={project.buttonText}
          frontClassName="shadow-[0_12px_40px_-11px_rgba(5,49,198,0.5)]"
        />
      </div>
    </motion.div>
  );
}
