import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link href="/" className="font-semibold tracking-tight">
          YEO
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
