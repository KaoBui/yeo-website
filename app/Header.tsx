import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-center py-4">
      <div className="site-container bg--blue-50 fixed z-100 mx-auto flex h-12 max-w-md items-center justify-between rounded-xl px-4 py-2">
        <Link href="/" className="font-semibold tracking-tight h-full">
          <Image
            src="/logo-blue-icon.png"
            alt="Logo Yeo Vietnam"
            width={900}
            height={600}
            className="h-full w-auto object-cover object-center"
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/work" className="hover:underline">
            Work
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
