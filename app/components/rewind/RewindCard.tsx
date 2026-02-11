"use client";
import Image from "next/image";
import type { RewindCardData } from "@/app/components/rewind/Rewind";

type RewindCardProps = RewindCardData;

export default function RewindCard({
  name,
  location,
  date,
  projectName,
  projectDescription,
  image,
}: RewindCardProps) {
  return (
    <div className="space-y-2 py-4">
      <div className="img-container aspect-16:9 w-full">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto w-full object-cover"
        ></Image>
      </div>
      <div className="flex flex-col items-start gap-1">
        <div className="text-tertiary flex w-full justify-between text-xs font-medium uppercase">
          <p>{name}</p>
          <p>{location}</p>
          <p>{date}</p>
        </div>
        <h3 className="text-xl text-neutral-100">{projectName}</h3>
        <p className="text-neutral-300">{projectDescription}</p>
      </div>
    </div>
  );
}
