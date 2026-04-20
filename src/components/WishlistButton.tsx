"use client";

import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function WishlistButton({
  slug,
  size = 16,
  className = "",
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const { user, isInWishlist, toggleWishlist, openAuth } = useAuth();

  const wishlisted = user ? isInWishlist(slug) : false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openAuth("login");
      return;
    }
    toggleWishlist(slug);
  };

  return (
    <button
      onClick={handleClick}
      className={`transition-all duration-300 ${className}`}
      aria-label={wishlisted ? "Favorilerden çıkar" : "Favorilere ekle"}
    >
      <Heart
        size={size}
        className={`transition-all duration-300 ${
          wishlisted
            ? "fill-red-400 text-red-400 scale-110"
            : "fill-transparent text-[#9A9A8A] hover:text-red-400"
        }`}
      />
    </button>
  );
}
