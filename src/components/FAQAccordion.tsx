"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ as FAQType } from "@/lib/data";

export default function FAQAccordion({ faqs }: { faqs: FAQType[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-0 border-t border-[#E8E8E2]">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border-b border-[#E8E8E2]">
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between text-left py-6 gap-4 group"
          >
            <span className="text-[14px] font-light text-[#1A1A1A] leading-snug group-hover:text-[#6B8F71] transition-colors duration-200">
              {faq.question}
            </span>
            <span className="shrink-0 text-[#9A9A8A] group-hover:text-[#6B8F71] transition-colors duration-200">
              {open === idx ? <Minus size={14} /> : <Plus size={14} />}
            </span>
          </button>
          {open === idx && (
            <div className="pb-6 pr-8">
              <p className="text-[14px] leading-[1.9] text-[#4A4A4A]">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
