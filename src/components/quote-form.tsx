"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ImagePlus, LockKeyhole, X } from "lucide-react";
import { services, business } from "@/lib/business";

type Values = { name: string; phone: string; email: string; postcode: string; service: string; description: string };
type Errors = Partial<Record<keyof Values, string>>;
const blank: Values = { name: "", phone: "", email: "", postcode: "", service: "", description: "" };
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name (at least 2 characters).";
  if (!/^(?:0\d{9,10}|\+44\d{9,10})$/.test(values.phone.replace(/[\s()\-]/g, ""))) errors.phone = "Enter a UK phone number, for example 07863 225508.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address or leave this optional field blank.";
  if (!/^(GIR\s?0AA|[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})$/i.test(values.postcode.trim())) errors.postcode = "Enter a valid UK postcode.";
  if (!values.service) errors.service = "Choose a service so we know what you have in mind.";
  if (values.description.trim().length < 15) errors.description = "Tell us a little more (at least 15 characters).";
  return errors;
}

function PhotoPreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [url, setUrl] = useState("");
  useEffect(() => { const objectUrl = URL.createObjectURL(file); setUrl(objectUrl); return () => URL.revokeObjectURL(objectUrl); }, [file]);
  return <li className="photo-preview">
    {/* Browser-local object URL: never sent to Next.js image optimisation. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {url && <img src={url} alt={`Local preview of ${file.name}`} width={52} height={52} />}
    <span>{file.name}<small>{(file.size / 1024 / 1024).toFixed(1)} MB · local only</small></span>
    <button type="button" onClick={onRemove} aria-label={`Remove ${file.name}`}><X size={17} /></button>
  </li>;
}

export function QuoteForm() {
  const [ready, setReady] = useState(false);
  const [values, setValues] = useState<Values>(blank);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [complete, setComplete] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setReady(true);
    const selectService = () => {
      const id = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("service");
      if (id && (services.some(s => s.id === id) || id === "other")) {
        setValues(current => ({ ...current, service: id }));
        setComplete(false);
        document.getElementById("contact")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }
    };
    selectService();
    window.addEventListener("hashchange", selectService);
    return () => window.removeEventListener("hashchange", selectService);
  }, []);

  useEffect(() => { if (complete) successRef.current?.focus(); }, [complete]);

  function update(field: keyof Values, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
    setComplete(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    if (fileError) { uploadRef.current?.focus(); return; }
    setComplete(true);
  }

  function reset() {
    setValues(blank); setFiles([]); setErrors({}); setFileError(""); setComplete(false);
    if (uploadRef.current) uploadRef.current.value = "";
  }

  function input(field: "name" | "phone" | "email" | "postcode", label: string, placeholder: string, type = "text", autoComplete: string = field) {
    return <div className="form-field"><label htmlFor={field}>{label}{field === "email" ? <span> (optional)</span> : <span aria-hidden="true"> *</span>}</label><input id={field} name={field} type={type} autoComplete={autoComplete} maxLength={field === "postcode" ? 10 : 120} placeholder={placeholder} value={values[field]} required={field !== "email"} onChange={e => update(field, e.target.value)} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${field}-error` : undefined} />{errors[field] && <p id={`${field}-error`} className="field-error">{errors[field]}</p>}</div>;
  }

  return <form ref={formRef} className="quote-form" onSubmit={submit} noValidate autoComplete="off">
    <fieldset disabled={!ready} className="form-fieldset"><legend className="sr-only">Preview a quote request</legend>
    <div className="form-heading"><h3>Tell us what you have in mind.</h3><span className="demo-pill">DEMO FORM</span></div>
    <p className="form-intro">A few details are a good place to start. <span>* Required fields</span></p>
    <div className="form-grid">
      {input("name", "Your name", "Full name", "text", "name")}
      {input("phone", "Phone number", "Your contact number", "tel", "tel")}
      {input("email", "Email address", "you@example.com", "email", "email")}
      {input("postcode", "Postcode", "e.g. IG3 9PW", "text", "postal-code")}
      <div className="form-field full"><label htmlFor="service">Service required <span aria-hidden="true">*</span></label><select id="service" name="service" required value={values.service} onChange={e => update("service", e.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}><option value="">Select a service</option>{services.map(service => <option key={service.id} value={service.id}>{service.title}</option>)}<option value="other">CCTV, lighting or another job</option></select>{errors.service && <p id="service-error" className="field-error">{errors.service}</p>}</div>
      <div className="form-field full"><label htmlFor="description">Tell us about your project <span aria-hidden="true">*</span></label><textarea id="description" name="description" required rows={4} maxLength={3000} placeholder="What needs doing? Include any useful sizes, details or preferred timing…" value={values.description} onChange={e => update("description", e.target.value)} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} />{errors.description && <p id="description-error" className="field-error">{errors.description}</p>}</div>
    </div>
    <label className="upload-zone" htmlFor="photos"><ImagePlus size={24} /><span><strong>Add photos of your job <span>(optional)</span></strong><small>Choose up to 3 JPG, PNG or WebP images · 5 MB each</small></span><span className="upload-plus">+</span></label>
    <input ref={uploadRef} className="file-input" id="photos" type="file" multiple accept="image/jpeg,image/png,image/webp" aria-describedby={fileError ? "photo-error" : "privacy-note"} aria-invalid={Boolean(fileError)} onChange={e => {
      setComplete(false);
      const selected = Array.from(e.target.files ?? []);
      if (selected.length + files.length > 3) { setFileError("Choose no more than 3 photos in total."); e.target.value = ""; return; }
      if (selected.some(file => !allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024)) { setFileError("Use JPG, PNG or WebP images, each no larger than 5 MB."); e.target.value = ""; return; }
      setFiles(current => [...current, ...selected]); setFileError(""); e.target.value = "";
    }} />
    {fileError && <p id="photo-error" role="alert" className="field-error">{fileError}</p>}
    {files.length > 0 && <ul className="photo-list">{files.map((file, index) => <PhotoPreview key={`${file.name}-${file.lastModified}-${index}`} file={file} onRemove={() => { setFiles(current => current.filter((_, i) => i !== index)); setFileError(""); setComplete(false); }} />)}</ul>}
    <p id="privacy-note" className="privacy-note"><LockKeyhole size={15} /><span>Demo only. Details and photos stay in this page’s memory. Nothing is sent or saved by this website; reloading clears the form.</span></p>
    <button className="button button-amber submit-button" type="submit">Preview quote request<ArrowUpRight size={19} /></button>
    <button className="clear-form" type="button" onClick={reset}>Clear form and photos</button>
    {complete && <div className="form-success" role="status" tabIndex={-1} ref={successRef}><Check size={24} /><div><strong>Your demo request is ready.</strong><p>This is a preview only — nothing has been sent. To make a real enquiry, <a href={business.telephone}>call {business.phone}</a>.</p></div></div>}
    </fieldset>
    {!ready && <p>This demo form needs JavaScript. Please call {business.phone} to enquire.</p>}
  </form>;
}
