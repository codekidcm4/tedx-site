import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/data/site";

const placeholderPosts = [
  {
    type: "instagram",
    caption: "Cleveland doesn't have an independent community TEDx anymore. We noticed. So we built one. TEDxHuntingValley is happening August 22.",
    date: "Apr 11",
    likes: 142,
  },
  {
    type: "instagram",
    caption: "The theme for TEDxHuntingValley: The Invisible Engine: The Forces We Forget. Student applications are open. Deadline May 11.",
    date: "Apr 15",
    likes: 98,
  },
  {
    type: "instagram",
    caption: "Any Cleveland-area high school student can apply. No GPA requirement. No experience requirement. The idea is what gets judged.",
    date: "Apr 17",
    likes: 211,
  },
];

export function SocialSection() {
  return (
    <section className="bg-[#f9f9f9] py-20 md:py-28" aria-labelledby="social-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Follow Along
                </span>
              </span>
              <h2
                id="social-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                {siteConfig.handle}
              </h2>
            </div>
            <div className="flex gap-4">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a0a0a] text-white text-sm font-semibold rounded-sm hover:bg-[#222222] transition-colors duration-200"
                aria-label="Follow on Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                Instagram
              </a>
              <a
                href={siteConfig.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#e0e0e0] text-[#0a0a0a] text-sm font-semibold rounded-sm hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-all duration-200"
                aria-label="Follow on X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow on X
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Post placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {placeholderPosts.map((post, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white border border-[#e0e0e0] p-6 hover:border-[#e62b1e]/30 hover:shadow-md transition-all duration-300 group">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e62b1e] to-[#c9231a] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0a0a0a]">tedxhuntingvalley</p>
                    <p className="text-[0.65rem] text-[#9a9a9a]">{post.date}</p>
                  </div>
                </div>

                {/* Image placeholder */}
                <div className="aspect-square bg-[#f0f0f0] mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#c0c0c0]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>

                {/* Caption */}
                <p className="text-xs text-[#555555] leading-relaxed line-clamp-3">
                  <span className="font-bold text-[#0a0a0a]">tedxhuntingvalley </span>
                  {post.caption}
                </p>

                {/* Likes */}
                <p className="text-xs font-semibold text-[#0a0a0a] mt-3">
                  {post.likes.toLocaleString()} likes
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-xs text-[#9a9a9a] mt-6">
            Live social feed coming soon. Follow {siteConfig.handle} for real-time updates.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
