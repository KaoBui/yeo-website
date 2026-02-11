"use client";
import Image from "next/image";
import CircularGallery from "./CircularGallery";
const items = [
  { image: "/hero-1.jpg", text: "" },
  { image: "/hero-2.jpg", text: "" },
  { image: "/hero-3.jpg", text: "" },
  { image: "/hero-4.jpg", text: "" },
  { image: "/hero-5.jpg", text: "" },
  { image: "/hero-6.jpg", text: "" },
  { image: "/hero-7.jpg", text: "" },
  { image: "/hero-8.jpg", text: "" },
];
export default function Hero() {
  return (
    <section id="hero" className="relative mt-0 h-[100vh] min-h-[1200px]">
      <div className="flex h-full flex-col">
        <div className="site-container flex flex-col items-center justify-center">
          <p className="text-m text-center">Cùng kiến tạo</p>
          <Image
            src="/logo-blue.png"
            alt="Logo Yeo Vietnam"
            width={100}
            height={100}
            className="pb-4"
          />
          <p className="text-h5 text-tertiary uppercase">
            Vì thế hệ trẻ Việt Nam
          </p>
          <h1 className="text-display text-primary text-center leading-none tracking-tight uppercase">
            vươn mình
            <br />
            rực rỡ
          </h1>
        </div>{" "}
        <div
          style={{ height: "100vh", position: "relative", marginTop: "-10vh" }}
        >
          <CircularGallery
            items={items}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            bend={2}
            scrollSpeed={0.6}
          />
        </div>
      </div>
    </section>
  );
}
