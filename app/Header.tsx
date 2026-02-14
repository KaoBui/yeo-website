"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;

    if (isMenuOpen) {
      lenis.stop();
      return () => {
        lenis.start();
      };
    }

    lenis.start();
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const showAfter = window.innerHeight * 0.15;
      setIsHeaderVisible(window.scrollY >= showAfter);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="flex justify-center">
      <button
        type="button"
        aria-hidden={!isMenuOpen}
        tabIndex={isMenuOpen ? 0 : -1}
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-90 bg-black/35 transition-opacity duration-300 ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`site-container fixed top-4 z-100 mx-auto w-full max-w-md transition-transform duration-500 ease-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-[140%]"
        }`}
      >
        <div className="bg--blue-50 overflow-hidden rounded-xl mx-4 lg:mx-0">
          <div className="flex h-12 items-center justify-between px-4 py-2">
            <Link href="/" className="h-full font-semibold tracking-tight">
              <Image
                src="/logo-blue-icon.png"
                alt="Logo Yeo Vietnam"
                width={600}
                height={600}
                className="h-full w-auto object-cover object-center"
              />
            </Link>

            <p className="text--blue-600 font-medium uppercase">YEO VIETNAM</p>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="header-nav-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text--blue-600 hover:text--blue-700 relative flex h-8 w-8 items-center justify-center"
            >
              <span className="sr-only">Open navigation menu</span>
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
          <nav
            id="header-nav-menu"
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              isMenuOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <ul className="flex flex-col gap-1 px-3 py-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text--blue-600 hover:bg--blue-100 block rounded-md px-3 py-2 uppercase"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
