import Link from "next/link";
import Image from "next/image";
import { navLinks, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="TEDxHuntingValley home">
              <Image
                src="/logo.png"
                alt="TEDxHuntingValley"
                width={180}
                height={40}
                className="h-8 w-auto object-contain mb-4"
              />
            </Link>
            <p className="text-[#9a9a9a] text-sm leading-relaxed max-w-xs">
              The Invisible Engine: The Forces We Forget.
              <br />
              August 22, 2026 &mdash; Gund Auditorium, University School, Hunting Valley, Ohio.
            </p>
            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TEDxHuntingValley on Instagram"
                className="text-[#9a9a9a] hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href={siteConfig.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TEDxHuntingValley on X (Twitter)"
                className="text-[#9a9a9a] hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email TEDxHuntingValley"
                className="text-[#9a9a9a] hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#9a9a9a] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#e0e0e0] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/apply"
                  className="text-sm text-[#e62b1e] hover:text-[#ff4438] font-semibold transition-colors duration-200"
                >
                  Apply Now &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Event info */}
          <div>
            <h3 className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#9a9a9a] mb-5">
              Event
            </h3>
            <ul className="space-y-3 text-sm text-[#e0e0e0]">
              <li>
                <span className="text-[#9a9a9a] text-xs uppercase tracking-wider block mb-0.5">Date</span>
                August 22, 2026
              </li>
              <li>
                <span className="text-[#9a9a9a] text-xs uppercase tracking-wider block mb-0.5">Venue</span>
                Gund Auditorium, University School
                <br />
                Hunting Valley, Ohio
              </li>
              <li>
                <span className="text-[#9a9a9a] text-xs uppercase tracking-wider block mb-0.5">Contact</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="text-[#9a9a9a] text-xs uppercase tracking-wider block mb-0.5">Application Deadline</span>
                May 11, 2026 at 11:59 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#222222] mt-12 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-[#555555] leading-relaxed max-w-md">
            This independent TEDx event is operated under license from TED. TEDxHuntingValley is independently
            organized and is not affiliated with or sponsored by University School or TED beyond the licensing agreement.
          </p>
          <p className="text-xs text-[#555555] flex-shrink-0">
            &copy; {new Date().getFullYear()} TEDxHuntingValley
          </p>
        </div>
      </div>
    </footer>
  );
}
