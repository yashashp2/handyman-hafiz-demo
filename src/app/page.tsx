import Image from "next/image";
import { assetPath } from "@/lib/paths";
import { ArrowDown, ArrowRight, ArrowUpRight, Bath, BrickWall, Check, ChevronDown, DoorOpen, Hammer, House, MapPin, MessageSquare, Phone, Ruler, Sofa, Tv, Wrench } from "lucide-react";
import { Header } from "@/components/header";
import { CallButton, Eyebrow, Logo, QuoteButton } from "@/components/ui";
import { QuoteForm } from "@/components/quote-form";
import { business, faqs, services } from "@/lib/business";

const icons = { sofa: Sofa, tv: Tv, door: DoorOpen, bath: Bath, tiles: BrickWall, house: House };
const projects = [
  { src: "/images/kitchen.jpg", title: "Space for everyday living", category: "KITCHEN FITTING", alt: "Illustrative bright kitchen with white cabinets and timber flooring", service: "fitting" },
  { src: "/images/bathroom.jpg", title: "A fresh start", category: "BATHROOMS & TILING", alt: "Illustrative tiled bathroom interior", service: "flooring" },
  { src: "/images/shelving.jpg", title: "The finishing touches", category: "CARPENTRY & SHELVING", alt: "Illustrative interior with shelving and natural materials", service: "carpentry" },
];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="concept-bar">An independent design concept <span>— not the official business website.</span><a href="#demo-details">About this demo <ArrowUpRight size={12} /></a></div>
    <Header />
    <main id="main">
      <section id="home" className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="location-tag"><MapPin size={14} />GOODMAYES · ILFORD · LONDON</div>
            <h1>Reliable Handyman <span>&amp; Home Improvement</span> Services in <span className="accent-word">Ilford<svg viewBox="0 0 200 15" preserveAspectRatio="none" aria-hidden="true"><path d="M2 10 Q95 0 198 7" /></svg></span></h1>
            <p className="hero-description">From furniture assembly and TV mounting to kitchen fitting and home improvements, get help with jobs around your property.</p>
            <div className="hero-actions"><CallButton /><QuoteButton /></div>
            <p className="proposal-note">“Free quote” is a proposed offer, subject to business approval.</p>
            <div className="hero-footnote"><span className="small-icon"><Wrench size={17} /></span><p>Small fixes. Bigger plans.<br /><strong>Let’s talk about your home.</strong></p><a href="#services" aria-label="Explore services"><ArrowDown size={20} /></a></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"><Image src={assetPath("/images/carpentry.jpg")} alt="Illustrative carpenter working with timber in a workshop; not Hafiz or a business project" fill sizes="(max-width: 899px) 100vw, 50vw" preload className="object-cover" /><span className="image-label">ILLUSTRATIVE PHOTOGRAPHY</span></div>
            <div className="hero-stamp"><Hammer size={28} /><span>A LITTLE HELP.<br /><strong>A BETTER HOME.</strong></span></div>
            <div className="photo-caption"><span>Made for the place you call home.</span><span>01 / HOME IMPROVEMENTS</span></div>
            <div className="hero-square" aria-hidden="true" />
          </div>
        </div>
      </section>

      <div className="service-ribbon"><div className="container ribbon-inner"><span><Wrench />Everyday repairs &amp; fitting</span><i /><span><Ruler />Carpentry &amp; improvements</span><i /><span><House />Building &amp; renovation</span><i /><span><MapPin />Local to Goodmayes &amp; Ilford</span></div></div>

      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-heading"><div><Eyebrow>HELP AROUND YOUR HOME</Eyebrow><h2>One home. Plenty of possibilities.</h2></div><p>The jobs on your list. The ideas in your head.<br className="desktop-break" /> Explore how Handyman HAFIZ could help.</p></div>
          <div className="services-grid">{services.map((service, index) => { const Icon = icons[service.icon]; return <a className="service-card" key={service.id} href={`#contact?service=${service.id}`}><div className="service-card-top"><span className="service-icon"><Icon size={29} strokeWidth={1.4} /></span><span className="service-number">0{index + 1}</span></div><h3>{service.title}</h3><p>{service.description}</p><span className="service-link">Enquire about this service <ArrowUpRight size={18} /></span></a>; })}</div>
          <div className="services-note"><p><MessageSquare size={18} /> Something else in mind? Curtain poles, blinds, locks, CCTV and lighting are also advertised.</p><a href="#contact?service=other">Let’s discuss it <ArrowRight size={16} /></a></div>
          <p className="regulated-note">For electrical or other regulated work, confirm the required qualifications, permissions and specialist involvement directly.</p>
        </div>
      </section>

      <section id="about" className="section about-section"><div className="container about-grid">
        <div className="about-visual"><div className="about-photo"><Image src={assetPath("/images/kitchen.jpg")} alt="Illustrative light-filled kitchen, not work completed by Handyman Hafiz" fill sizes="(max-width: 899px) 100vw, 45vw" className="object-cover" /><span className="image-label">ILLUSTRATIVE INTERIOR · NOT A BUSINESS PROJECT</span></div><div className="about-caption"><span>FROM A SMALL FIX</span><ArrowUpRight size={22} /><strong>to a fresh new feel.</strong></div></div>
        <div className="about-copy"><Eyebrow>YOUR LOCAL HANDYMAN</Eyebrow><h2>A familiar name.<br />A practical helping hand.</h2><p>Meet Handyman HAFIZ, a local handyman and building services business based in Goodmayes, Ilford.</p><p>From putting together new furniture to discussing a kitchen refresh, the advertised services cover everyday jobs and larger home improvements. The public profile describes many years of experience, without specifying an exact number.</p><div className="about-facts"><p><Check size={18} />Based in Goodmayes, Ilford</p><p><Check size={18} />A broad range of advertised services</p><p><Check size={18} />Speak directly about your job</p></div><a className="text-link" href={business.profile} target="_blank" rel="noopener noreferrer">View the public Nextdoor profile <ArrowUpRight size={18} /><span className="sr-only"> (opens in a new tab)</span></a></div>
      </div></section>

      <section className="section process-section"><div className="container"><div className="section-heading"><div><Eyebrow>FROM IDEA TO NEXT STEPS</Eyebrow><h2>Let’s get your plans moving.</h2></div><p>A suggested customer journey.<br />Details and arrangements are agreed directly.</p></div><div className="steps-grid">{[
        { title: "Describe your job", text: "Tell Hafiz what needs doing, where you are and any useful details about the space.", Icon: MessageSquare },
        { title: "Discuss requirements", text: "Talk through the scope, materials and whether a visit is needed. Confirm costs and availability.", Icon: Ruler },
        { title: "Arrange the work", text: "If you decide to go ahead, agree the work and a suitable time directly with Hafiz.", Icon: Hammer },
      ].map(({ title, text, Icon }, index) => <div className="step" key={title}><div className="step-top"><span>0{index + 1}</span><Icon size={24} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

      <section id="projects" className="section projects-section"><div className="container"><div className="section-heading"><div><Eyebrow>ROOM FOR INSPIRATION</Eyebrow><h2>Picture the possibilities.</h2></div><a className="text-link" href="#contact">Talk about your project <ArrowUpRight size={19} /></a></div><p className="gallery-disclaimer">An illustrative gallery, not completed Handyman HAFIZ projects. These placeholders can be replaced with the owner’s photographs.</p><div className="projects-grid">{projects.map(project => <a key={project.src} className="project-card" href={`#contact?service=${project.service}`}><div className="project-photo"><Image src={assetPath(project.src)} alt={project.alt} fill sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, 33vw" className="object-cover" /><span className="image-label">ILLUSTRATIVE PLACEHOLDER</span><span className="project-arrow"><ArrowUpRight size={22} /></span></div><p>{project.category}</p><h3>{project.title}</h3></a>)}</div></div></section>

      <section className="areas-section"><div className="container areas-grid"><div><Eyebrow light>CLOSE TO HOME</Eyebrow><h2>Goodmayes. Ilford.<br /><span>Your neighbourhood.</span></h2><p>Local help for your home. Based in Goodmayes, with enquiries welcome from Ilford.</p><p className="areas-small">Live a little further out? Nearby areas are subject to confirmation. Call with your postcode to check.</p><a className="button button-amber" href={business.map} target="_blank" rel="noopener noreferrer"><MapPin size={17} />Explore the area<ArrowUpRight size={17} /><span className="sr-only"> on Google Maps (opens in a new tab)</span></a></div><div className="area-graphic" role="img" aria-label="Decorative location illustration for Goodmayes and Ilford, not a coverage boundary or navigational map"><div className="map-grid" /><div className="map-orbit orbit-one" /><div className="map-orbit orbit-two" /><span className="map-place ilford">ILFORD</span><span className="map-pin"><MapPin size={30} fill="currentColor" /><span>GOODMAYES</span></span><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /><span className="map-caption">BASED LOCALLY. LET’S TALK.<small>Location illustration · not a service boundary</small></span></div></div></section>

      <section id="contact" className="section contact-section"><div className="container contact-grid"><div className="contact-copy"><Eyebrow>LET’S MAKE A START</Eyebrow><h2>What’s on your<br />to-do list?</h2><p>A shelf to put up? A room to rethink?<br />Start with a conversation about your home.</p><a className="contact-phone" href={business.telephone}><span><Phone size={23} /></span><div><small>GIVE HAFIZ A CALL</small><strong>{business.phone}</strong></div><ArrowUpRight size={24} /></a><div className="contact-location"><MapPin size={21} /><p>Goodmayes, Ilford, London<br /><span>Other nearby areas subject to confirmation.</span></p></div><div className="contact-note"><MessageSquare size={22} /><h3>A little detail goes a long way.</h3><p>Measurements and a photo of the space can help explain the job. Please avoid including people or personal documents in photos.</p></div><p className="quote-policy">Quotation terms, including any charges, must be confirmed with the business. A free quotation offer is proposed for this concept only.</p></div><QuoteForm /></div></section>

      <section className="section faq-section"><div className="container faq-grid"><div><Eyebrow>A FEW USEFUL ANSWERS</Eyebrow><h2>Before we<br />get started.</h2><p>Have something else to ask?<br /><a className="text-link" href={business.telephone}>Give Hafiz a call <ArrowUpRight size={17} /></a></p></div><div className="faq-list">{faqs.map(faq => <details className="faq-item" key={faq.question}><summary>{faq.question}<ChevronDown size={20} /></summary><p>{faq.answer}</p></details>)}</div></div></section>

      <section className="closing-section"><div className="container closing-inner"><div><span>SMALL FIXES. FRESH STARTS.</span><h2>Make yourself more at home.</h2></div><CallButton /></div></section>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Logo light /><p>Handyman &amp; home improvement services.<br />Goodmayes, Ilford, London.</p><a href={business.telephone}><Phone size={16} />{business.phone}</a></div><div><h3>EXPLORE</h3><a href="#home">Home</a><a href="#about">About Hafiz</a><a href="#projects">Project inspiration</a><a href="#contact">Contact</a></div><div><h3>HOW HAFIZ CAN HELP</h3><a href="#contact?service=assembly">Furniture &amp; mounting</a><a href="#contact?service=carpentry">Carpentry &amp; fitting</a><a href="#contact?service=flooring">Tiling &amp; flooring</a><a href="#contact?service=building">Home improvements</a></div><div><h3>LET’S TALK</h3><p>Have a job in mind?</p><a className="footer-phone" href={business.telephone}>{business.phone}<ArrowUpRight size={16} /></a><a href={business.profile} target="_blank" rel="noopener noreferrer">Find Hafiz on Nextdoor<ArrowUpRight size={14} /><span className="sr-only"> (opens in a new tab)</span></a></div></div><div id="demo-details" className="footer-bottom"><p>© {new Date().getFullYear()} Handyman HAFIZ · Website design concept</p><p>Independent speculative concept. Not the official business website.<br />Illustrative photography. Demo enquiries are not sent or stored.</p></div></div></footer>
  </>;
}
