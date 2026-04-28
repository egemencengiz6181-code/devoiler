import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Devoiler Admin",
  robots: { index: false, follow: false },
};

// Full-screen overlay so the admin panel covers the public Navbar/Footer
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] overflow-auto bg-[#F5F5F3]">
      {children}
    </div>
  );
}
