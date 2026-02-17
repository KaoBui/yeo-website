"use client";
import Image from "next/image";

type FeedbackCardProps = {
  img: string;
  shortText: string;
  longText: string;
  name: string;
  className?: string;
  quoteClassName?: string;
};

export default function FeedbackCard({
  img,
  shortText,
  longText,
  name,
  className,
  quoteClassName,
}: FeedbackCardProps) {
  return (
    <div
      className={[
        "feedback-card relative flex min-h-[60vh] w-full flex-col justify-end gap-4 rounded-[24px] p-8 3xl:p-16 shadow-lg/5 lg:w-2/5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p
        className={[
          "absolute top-8 left-8 text-[200px] leading-none",
          quoteClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        &ldquo;
      </p>
      <div className="flex justify-end">
        <div className="img-container relative aspect-square w-1/5 overflow-hidden rounded-[24px]">
          {img ? (
            <Image src={img} alt={name} fill className="object-cover" />
          ) : null}
        </div>
      </div>
      <div className="flex w-5/6 items-end">
        <p
          className={["text-xl leading-[1.2]", quoteClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {shortText}
        </p>
      </div>
      <p className="text-primary leading-body text-base">{longText}</p>
      <div className="flex w-full justify-end">
        <p className="text-right text-tertiary text-sm italic">{name}</p>
      </div>
    </div>
  );
}
