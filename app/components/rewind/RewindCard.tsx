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
    <div className="space-y-2 bg-neutral-100 p-6">
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
        <div className="text-secondary flex w-full justify-between text-xs font-medium uppercase">
          <p>{name}</p>
          <p>{location}</p>
          <p>{date}</p>
        </div>
        <h3 className="text-xl text-black">{projectName}</h3>
        <p className="text-primary">{projectDescription}</p>
      </div>
    </div>
  );
}
