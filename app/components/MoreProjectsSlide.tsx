"use client";

type MoreProjectsSlideProps = {
  message: string;
};

export default function MoreProjectsSlide({ message }: MoreProjectsSlideProps) {
  return (
    <div className="flex h-[55vh] min-h-[500px] w-full flex-col items-center justify-center rounded-[40px] bg--blue-600 p-8 text-center select-none 2xl:h-[65vh]">
      <p className="text-primary italic text-md text-white max-w-[40ch]">{message}</p>
    </div>
  );
}
