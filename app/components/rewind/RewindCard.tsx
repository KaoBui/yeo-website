"use client";
import Image from "next/image";
import type { RewindCardData } from "@/app/components/rewind/Rewind";

type RewindCardProps = RewindCardData;
type RewindCardImageLoadHandler = () => void;

export default function RewindCard({
  name,
  location,
  date,
  projectName,
  projectDescription,
  firstImage,
  image,
  onImageLoad,
}: RewindCardProps & { onImageLoad?: RewindCardImageLoadHandler }) {
  return (
    <div className="relative max-w-4xl space-y-2 overflow-hidden bg-neutral-50 p-4">
      <Image
        src="/noise-on-white.png"
        alt="deco"
        width={firstImage.width}
        height={firstImage.height}
        className="absolute inset-0 h-auto w-full object-cover mix-blend-multiply"
      ></Image>
      <div className="img-container aspect-16:9 relative w-full overflow-hidden">
        <Image
          src={firstImage.src}
          alt={firstImage.alt}
          width={firstImage.width}
          height={firstImage.height}
          className="absolute h-auto w-full object-cover opacity-40 mix-blend-hard-light brightness-200"
          onLoad={onImageLoad}
        ></Image>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto w-full object-cover"
          onLoad={onImageLoad}
        ></Image>
      </div>
      <div className="relative z-1 flex flex-col items-start gap-1">
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
