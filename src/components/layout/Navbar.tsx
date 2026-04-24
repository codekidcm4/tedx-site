"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled || !isHome
            ? "bg-white/95 backdrop-blur-md border-b border-[#e0e0e0] shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo — single transparent PNG, inverted on dark background */}
            <Link href="/" className="flex items-center flex-shrink-0 h-8" aria-label="TEDxHuntingValley home">
              <Image
                src="/logo.png"
                alt="TEDxHuntingValley"
                width={220}
                height={48}
                style={scrolled || !isHome ? { filter: "brightness(0)" } : undefined}
                className="h-8 w-auto object-contain transition-all duration-300"
                priority
                loading="eager"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 group",
                    pathname === link.href
                      ? "text-[#e62b1e]"
                      : scrolled || !isHome
                      ? "text-[#0a0a0a] hover:text-[#e62b1e]"
                      : "text-white hover:text-white/80"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#e62b1e] rounded-full" />
                  )}
                </Link>
              ))}
              <Link
                href="/apply"
                className="ml-3 px-5 py-2.5 bg-[#e62b1e] text-white text-sm font-semibold rounded-sm hover:bg-[#c9231a] transition-colors duration-200 shadow-sm"
              >
                Apply Now
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "md:hidden flex flex-col gap-1.5 p-2 -mr-2",
                scrolled || !isHome ? "text-[#0a0a0a]" : "text-white"
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  "block w-6 h-0.5 bg-current transition-all duration-300",
                  mobileOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-current transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-current transition-all duration-300",
                  mobileOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-white flex flex-col transition-all duration-400 ease-in-out",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="h-16 md:h-18" />
        <nav className="flex flex-col px-6 pt-8 pb-12 gap-1 flex-1" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "py-4 text-2xl font-bold border-b border-[#f0f0f0] transition-colors duration-200",
                pathname === link.href ? "text-[#e62b1e]" : "text-[#0a0a0a] hover:text-[#e62b1e]",
              )}
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center w-full py-4 bg-[#e62b1e] text-white text-lg font-bold rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
            >
              Apply Now
            </Link>
          </div>

          <div className="mt-auto pt-8">
            <p className="text-sm text-[#9a9a9a]">{siteConfig.email}</p>
            <p className="text-sm text-[#9a9a9a] mt-1">{siteConfig.handle}</p>
          </div>
        </nav>
      </div>
    </>
  );
}
