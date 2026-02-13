import Image from "next/image";
import yeoWhiteLogo from "@/public/yeo-white.svg";

export default function Footer() {
  return (
    <footer
      className="relative h-[80vh]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="bg--blue-600 fixed bottom-0 h-[80vh] w-full">
        <Image
          src={yeoWhiteLogo}
          alt="YEO Vietnam"
          width={1000}
          height={1000}
          className="absolute -right-1/10 h-[80vh] w-auto opacity-5"
        />
        <div className="site-container bottom-0 flex h-full flex-col justify-between py-4">
          <p className="text-h1 leading-head pt-site-margin text-white uppercase">
            đồng hành cùng <br></br> thế hệ trẻ việt nam
          </p>
          <div className="flex gap-12">
            <div className="flex flex-col gap-6">
              <p className="text--blue-200 text-sm uppercase">Liên hệ</p>
              <ul className="space-y-2 text-base text-white">
                <li>
                  <a href="">contact@yeo.vn</a>
                </li>
                <li>
                  <a href="">+84 9 61 35 14 53</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text--blue-200 text-sm uppercase">
                theo dõi yeo vietnam
              </p>
              <ul className="space-y-2 text-base text-white">
                <li>
                  <a href="">Facebook</a>
                </li>
                <li>
                  <a href="">TikTok</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text--blue-200 flex justify-between border-t border-neutral-50 pt-4 text-sm">
            © {new Date().getFullYear()} YEO. All rights reserved.
            <p className="text-xs uppercase">
              Website by{" "}
              <a href="https://kaobui.com/" target="_blank">
                Kao
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
