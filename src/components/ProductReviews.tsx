"use client";

import { Review } from "@/lib/data";

interface ProductReviewsProps {
  reviews: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  // Duplicate reviews for seamless infinite loop
  const duplicated = [...reviews, ...reviews];

  return (
    <section className="py-16 px-6 md:px-12 border-t border-[#E8E8E2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#9A9A8A] font-medium mb-4">
            Kullanıcı Deneyimleri
          </p>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-[#C8A96E]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-[13px] text-[#9A9A8A] font-light">
            {reviews.length} değerlendirme
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden group">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#FAFAF8] to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="flex animate-marquee-reviews group-hover:[animation-play-state:paused]">
            {duplicated.map((review, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[340px] md:w-[400px] mx-3 p-6 bg-white border border-[#E8E8E2] hover:border-[#C8A96E]/30 transition-colors duration-300"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 text-[#C8A96E]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[14px] leading-[1.8] text-[#4A4A4A] italic mb-4 font-light">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <div className="w-px h-3 bg-[#C8A96E]" />
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#9A9A8A] font-medium">
                    {review.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
