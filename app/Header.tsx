"use client";
import { useLocale, useTranslations } from "next-intl";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nextLocale = locale === "vi" ? "en" : "vi";

  const navLinks = [
    { href: "#hero", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#projects", label: t("nav.programs") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const handleNavClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setIsMenuOpen(false);

      if (!href.startsWith("#")) return;

      const lenis = window.__lenis;
      if (!lenis) {
        window.location.hash = href;
        return;
      }

      lenis.start();
      window.requestAnimationFrame(() => {
        lenis.scrollTo(href, {
          offset: -80,
          duration: 1.2,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
        window.history.pushState(null, "", href);
      });
    };

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
      <div className="site-container fixed top-4 z-100 mx-auto w-full max-w-md">
        <div className="mx-4 overflow-hidden rounded-xl bg-white shadow-sm lg:mx-0">
          <div className="relative flex h-12 items-center justify-between px-4 py-2">
            <Link href="/" className="h-full font-semibold tracking-tight">
              <Image
                src="/logo-blue-icon.png"
                alt={t("logoAlt")}
                width={600}
                height={600}
                className="h-full w-auto object-cover object-center"
              />
            </Link>

            <p className="text--blue-600 pointer-events-none absolute left-1/2 -translate-x-1/2 font-medium uppercase">
              {t("brand")}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={t("switchLocale", {
                  locale: nextLocale.toUpperCase(),
                })}
                onClick={() => router.replace(pathname, { locale: nextLocale })}
                className="text--blue-600 hover:bg--blue-100 cursor-pointer rounded px-2 py-1 text-xs font-semibold"
              >
                {nextLocale.toUpperCase()}
              </button>
              <button
                type="button"
                aria-label={t("toggleMenu")}
                aria-expanded={isMenuOpen}
                aria-controls="header-nav-menu"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="text--blue-600 hover:text--blue-700 relative flex h-8 w-8 items-center justify-center"
              >
                <span className="sr-only">{t("openNavigationMenu")}</span>
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
                    <a
                      href={link.href}
                      onClick={handleNavClick(link.href)}
                      className="text-primary hover:text--blue-600 hover:bg--blue-100 block rounded-md px-3 py-2 text-center uppercase"
                    >
                      {link.label}
                    </a>
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
