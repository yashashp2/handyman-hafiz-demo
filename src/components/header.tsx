"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { Logo } from "./ui";

const links = ["Home", "Services", "About", "Projects", "Contact"];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); toggleRef.current?.focus(); }
    };
    const resize = () => { if (window.innerWidth >= 900) setOpen(false); };
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("keydown", escape); window.removeEventListener("resize", resize); };
  }, [open]);
  return <header className="site-header">
    <div className="container header-inner">
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}</nav>
      <a className="header-phone" href={business.telephone} aria-label={`Call ${business.phone}`}><Phone size={17} /><span>{business.phone}</span></a>
      <button ref={toggleRef} className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>{links.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}<a href={business.telephone} onClick={() => setOpen(false)}><Phone size={17} />Call {business.phone}</a></nav>
  </header>;
}
