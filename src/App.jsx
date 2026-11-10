import { useEffect, useState } from "react";
import { BRAND, COMPANY, PHONE, EMAIL, ADDRESS, TELEGRAM, services, steps, band } from "./data.js";
import { logoSvg, telegramSvg, heroArt, icons } from "./svgs.js";

// Статичные SVG из исходного сайта; display: contents не ломает вёрстку
const Svg = ({ html }) => <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const s = localStorage.getItem("theme");
      if (s === "light" || s === "dark") return s;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function Header() {
  const [theme, toggle] = useTheme();
  return (
    <header>
      <a className="logo" href="#top"><Svg html={logoSvg} />{BRAND}</a>
      <nav>
        <a className="l" href="#services">Services</a>
        <a className="l" href="#process">How we work</a>
        <a className="l" href="#contacts">Contacts</a>
        <a className="wa" href={TELEGRAM} target="_blank" rel="noopener" aria-label="Message us on Telegram" title="Message us on Telegram">
          <Svg html={telegramSvg} />
        </a>
        <button className="tg" type="button" onClick={toggle} aria-label="Toggle theme" title="Light / dark theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <a className="btn" href="#contacts">Leave a request</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div>
        <h1>We promote your business online while you focus on what matters</h1>
        <p>Full-Cycle Marketing Agency: we run social media, launch ads, create logos and write copy. One team instead of five contractors.</p>
        <small className="co">Company “{COMPANY}”</small>
        <div className="cta">
          <a className="btn" href="#contacts">Get a consultation</a>
          <a className="btn ghost" href="#services">View services</a>
        </div>
      </div>
      <Svg html={heroArt} />
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ n: "", p: "" });
  const [sent, setSent] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const body = `Name: ${form.n}\nPhone: ${form.p}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("New request from website")}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setForm({ n: "", p: "" });
  };
  return (
    <section id="contacts">
      <div className="contact">
        <div>
          <h2>Let’s discuss your project?</h2>
          <p className="lead">Message us or leave a request. We reply within one business day and suggest the first steps for free.</p>
          <div className="links">
            <a className="btn alt" href={TELEGRAM} target="_blank" rel="noopener">Message us on Telegram</a>
            <ul className="info">
              <li><b>Phone:</b> <a href={`tel:${PHONE}`}>{PHONE}</a></li>
              <li><b>Email:</b> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><b>Address:</b> {ADDRESS}</li>
            </ul>
          </div>
        </div>
        <form onSubmit={submit}>
          <label>Your name
            <input name="n" value={form.n} onChange={change} required autoComplete="name" placeholder="Your name" />
          </label>
          <label>Phone
            <input name="p" value={form.p} onChange={change} type="tel" inputMode="tel" required autoComplete="tel"
              pattern="[+0-9 ()\-]{7,20}" title="Enter a valid phone number" placeholder="+971 00 000 0000" />
          </label>
          <button className="btn" type="submit">Send request</button>
          {sent && <p id="ok" role="status" style={{ display: "block" }}>Thank you! Your email app will open so you can send the request.</p>}
        </form>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="wrap">
      <Header />
      <main id="top">
        <Hero />
        <section id="services">
          <h2>Agency services</h2>
          <p className="lead">We take care of all your online marketing: from idea and design to ads and daily posts.</p>
          <div className="grid">
            {services.map(([t, d], i) => (
              <article className="card" key={t}><Svg html={icons[i]} /><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
        </section>
        <section id="process">
          <h2>How we work</h2>
          <p className="lead">Clear stages and reports, so you always know where your budget goes.</p>
          <div className="steps">
            {steps.map(([t, d]) => <div className="step" key={t}><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </section>
        <section>
          <div className="band">
            {band.map(([b, t]) => <div key={b}><b>{b}</b>{t}</div>)}
          </div>
        </section>
        <Contact />
      </main>
      <footer>© 2026 {BRAND} · Company “{COMPANY}”. All rights reserved.</footer>
    </div>
  );
}
