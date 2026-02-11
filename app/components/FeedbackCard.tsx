"use client";
import Image from "next/image";

type FeedbackCardProps = {
  img: string;
  shortText: string;
  longText: string;
  name: string;
  className?: string;
};

export default function FeedbackCard({
  img,
  shortText,
  longText,
  name,
  className,
}: FeedbackCardProps) {
  return (
    <div
      className={[
        "feedback-card relative flex w-2/5 flex-col gap-4 rounded-[40px] p-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text--blue-600 absolute top-8 left-8 text-[200px] leading-none">
        &ldquo;
      </p>
      <div className="flex justify-end">
        <div className="img-container relative aspect-square w-1/5 overflow-hidden rounded-[24px] bg-neutral-100">
          {img ? <Image src={img} alt={name} fill className="object-cover" /> : null}
        </div>
      </div>
      <div className="flex w-5/6 items-end">
        <p className="text-primary text-xl leading-[1.2]">{shortText}</p>
      </div>
      <p className="text-secondary leading-body text-base">{longText}</p>
      <div className="flex w-full justify-end">
        <p className="text-right text-sm italic">{name}</p>
      </div>
    </div>
  );
}
