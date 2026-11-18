import { ArrowUpRight, Hammer, Phone } from "lucide-react";
import { business } from "@/lib/business";
import type { ReactNode } from "react";

export function Logo({ light = false }: { light?: boolean }) {
  return <a href="#home" aria-label="Handyman Hafiz home" className={`brand ${light ? "brand-light" : ""}`}>
    <span className="brand-mark"><Hammer size={25} strokeWidth={1.7} /></span>
    <span className="brand-text">HANDYMAN <strong>HAFIZ<span>.</span></strong></span>
  </a>;
}

export function CallButton({ className = "", children }: { className?: string; children?: ReactNode }) {
  return <a className={`button button-amber ${className}`} href={business.telephone}><Phone size={17} />{children ?? `Call ${business.phone}`}</a>;
}

export function QuoteButton({ className = "", children }: { className?: string; children?: ReactNode }) {
  return <a className={`button button-outline ${className}`} href="#contact">{children ?? "Request a Free Quote"}<ArrowUpRight size={18} /></a>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</p>;
}
