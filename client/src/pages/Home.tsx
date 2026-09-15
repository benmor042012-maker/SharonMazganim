import {
  BUSINESS,
  dictionaries,
  LOCALES,
  localePath,
  useT,
  whatsappLink,
} from "@/i18n";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  Fan,
  Gauge,
  Globe,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Thermometer,
  Wrench,
  Zap,
} from "lucide-react";
import { useId, useState } from "react";

const phoneLink = `tel:${BUSINESS.phoneE164}`;

const serviceMeta = [
  { icon: Wrench, tone: "service-blue" },
  { icon: Snowflake, tone: "service-ice" },
  { icon: Droplets, tone: "service-sand" },
  { icon: Fan, tone: "service-mint" },
  { icon: Zap, tone: "service-lilac" },
  { icon: Gauge, tone: "service-slate" },
];

const stepIcons = [MessageCircle, Gauge, Check];
const aboutIcons = [ShieldCheck, Wrench, Thermometer];

/** Arrow that points "forward" in the reading direction. */
function DirArrow({
  size = 17,
  up = false,
  strokeWidth,
}: {
  size?: number;
  up?: boolean;
  strokeWidth?: number;
}) {
  const t = useT();
  const rtl = t.dir === "rtl";
  const Icon = up
    ? rtl
      ? ArrowUpLeft
      : ArrowUpRight
    : rtl
      ? ArrowLeft
      : ArrowRight;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}

function SectionKicker({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`section-kicker ${light ? "section-kicker-light" : ""}`}>
      <span className="kicker-dot" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

function ArrowButton({
  children,
  href = "#contact",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a className="arrow-button" href={href}>
      <span>{children}</span>
      <span className="arrow-circle">
        <DirArrow size={17} strokeWidth={2.2} />
      </span>
    </a>
  );
}

function LanguageSwitcher() {
  const t = useT();
  return (
    <nav className="lang-switch" aria-label={t.nav.language}>
      <Globe size={14} aria-hidden="true" />
      {LOCALES.map(l => (
        <a
          key={l}
          href={localePath(l)}
          hrefLang={l}
          lang={l}
          aria-current={l === t.locale ? "page" : undefined}
          className={l === t.locale ? "lang-active" : ""}
        >
          {dictionaries[l].langName}
        </a>
      ))}
    </nav>
  );
}

function Home() {
  const t = useT();
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const faqId = useId();
  const wa = whatsappLink(t.whatsappText);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const text = `${t.whatsappText}\n${t.contact.name}: ${name}\n${t.contact.phone}: ${phone}${message ? `\n${t.contact.message} ${message}` : ""}`;
    window.open(whatsappLink(text), "_blank", "noopener");
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <header>
        <div className="topbar">
          <div className="container topbar-inner">
            <span>
              <MapPin size={14} aria-hidden="true" /> {t.topbar.area}
            </span>
            <span className="topbar-separator" aria-hidden="true" />
            <span>
              <Clock3 size={14} aria-hidden="true" /> {t.topbar.hours}
            </span>
            <LanguageSwitcher />
            <a className="topbar-link" href={phoneLink}>
              {t.topbar.call} <DirArrow size={13} up />
            </a>
          </div>
        </div>

        <div className="site-header">
          <div className="container header-inner">
            <a className="brand" href="#top" title={t.brand.homeLabel}>
              <span className="brand-mark" aria-hidden="true">
                <Snowflake size={22} strokeWidth={2.4} />
              </span>
              <span className="brand-copy">
                <strong>{t.brand.first}</strong>
                <span>{t.brand.second}</span>
              </span>
            </a>
            <nav className="main-nav" aria-label={t.nav.label}>
              <a href="#services">{t.nav.services}</a>
              <a href="#process">{t.nav.process}</a>
              <a href="#about">{t.nav.about}</a>
              <a href="#faq">{t.nav.faq}</a>
            </nav>
            <a className="header-phone" href={phoneLink}>
              <Phone size={17} aria-hidden="true" />
              <span dir="ltr">{BUSINESS.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <span id="top" />
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />{" "}
                {t.hero.eyebrow}
              </p>
              <h1 id="hero-title">
                {t.hero.h1a}
                <br />
                <em>{t.hero.h1em}</em> {t.hero.h1b}
              </h1>
              <p className="hero-lede">{t.hero.lede}</p>
              <div className="hero-actions">
                <ArrowButton href="#contact">{t.hero.cta}</ArrowButton>
                <a
                  className="whatsapp-button"
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} aria-hidden="true" />{" "}
                  {t.hero.whatsapp}
                </a>
              </div>
              <p className="hero-note">
                <Check size={15} aria-hidden="true" /> {t.hero.note}
              </p>
            </div>
            <div className="hero-visual">
              <div className="hero-image-wrap">
                <img
                  src="/images/hero-technician.svg"
                  alt={t.hero.imgAlt}
                  width={760}
                  height={500}
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="hero-image-shade" aria-hidden="true" />
                <div className="hero-floating-card hero-floating-card-top">
                  <span className="floating-icon" aria-hidden="true">
                    <ShieldCheck size={17} />
                  </span>
                  <span>
                    <b>{t.hero.cardTopB}</b>
                    <small>{t.hero.cardTopS}</small>
                  </span>
                </div>
                <div className="hero-floating-card hero-floating-card-bottom">
                  <span className="floating-check" aria-hidden="true">
                    <Check size={16} />
                  </span>
                  <span>
                    <b>{t.hero.cardBottomB}</b>
                    <small>{t.hero.cardBottomS}</small>
                  </span>
                </div>
                <div className="hero-image-caption" aria-hidden="true">
                  <span className="caption-dot" /> {t.hero.captionA}{" "}
                  <span className="caption-line" /> {t.hero.captionB}
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bottom container">
            <ul className="hero-stats">
              <li className="hero-stat">
                <strong>15+</strong>
                <span>{t.hero.stat1}</span>
              </li>
              <li className="stat-divider" aria-hidden="true" />
              <li className="hero-stat">
                <strong>
                  4.9<span className="star">★</span>
                </strong>
                <span>{t.hero.stat2}</span>
              </li>
              <li className="stat-divider" aria-hidden="true" />
              <li className="hero-stat">
                <strong>24/7</strong>
                <span>{t.hero.stat3}</span>
              </li>
            </ul>
            <a className="scroll-cue" href="#services">
              <span>{t.hero.scroll}</span>
              <span className="scroll-arrow">
                <DirArrow size={16} />
              </span>
            </a>
          </div>
        </section>

        <section
          id="services"
          className="services-section section-pad"
          aria-labelledby="services-title"
        >
          <div className="container">
            <div className="section-heading-row">
              <div>
                <SectionKicker>{t.services.kicker}</SectionKicker>
                <h2 id="services-title">
                  {t.services.h2a}
                  <br />
                  <span>{t.services.h2b}</span>
                </h2>
              </div>
              <p className="section-intro">{t.services.intro}</p>
            </div>
            <ul className="services-grid">
              {t.services.items.map((service, i) => {
                const { icon: Icon, tone } = serviceMeta[i];
                const number = String(i + 1).padStart(2, "0");
                return (
                  <li key={service.title}>
                    <a className={`service-card ${tone}`} href="#contact">
                      <div className="service-card-top">
                        <span className="service-number" aria-hidden="true">
                          {number}
                        </span>
                        <span className="service-icon" aria-hidden="true">
                          <Icon size={22} strokeWidth={1.7} />
                        </span>
                      </div>
                      <div className="service-card-body">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                      </div>
                      <span className="service-card-arrow">
                        <DirArrow size={17} />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="services-footer">
              <span>
                <Sparkles size={16} aria-hidden="true" /> {t.services.footer}
              </span>
              <ArrowButton href="#contact">{t.services.footerCta}</ArrowButton>
            </div>
          </div>
        </section>

        <section
          id="process"
          className="process-section section-pad"
          aria-labelledby="process-title"
        >
          <div className="container process-grid">
            <div className="process-copy">
              <SectionKicker light>{t.process.kicker}</SectionKicker>
              <h2 id="process-title">
                {t.process.h2a}
                <br />
                <span>{t.process.h2b}</span>
              </h2>
              <p>{t.process.text}</p>
              <a
                className="process-video-link"
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="video-play" aria-hidden="true">
                  <Play size={14} fill="currentColor" />
                </span>
                <span>{t.process.videoLink}</span>
                <DirArrow size={16} />
              </a>
            </div>
            <ol className="process-steps">
              {t.process.steps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <li key={step.title}>
                    {i > 0 && (
                      <div className="process-line" aria-hidden="true" />
                    )}
                    <div className="process-step">
                      <span className="step-number" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                      </div>
                      <span className="step-icon" aria-hidden="true">
                        <Icon size={20} />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section
          id="about"
          className="about-section section-pad"
          aria-labelledby="about-title"
        >
          <div className="container about-grid">
            <div className="about-photo">
              <img
                src="/images/about-detail.svg"
                alt={t.about.imgAlt}
                width={560}
                height={500}
                loading="lazy"
                decoding="async"
              />
              <div className="about-photo-label">
                <span>{t.about.labelA}</span>
                <small>{t.about.labelB}</small>
              </div>
            </div>
            <div className="about-copy">
              <SectionKicker>{t.about.kicker}</SectionKicker>
              <h2 id="about-title">
                {t.about.h2a}
                <br />
                <span>{t.about.h2b}</span>
                <br />
                {t.about.h2c}
              </h2>
              <p>{t.about.text}</p>
              <ul className="about-points">
                {t.about.points.map((point, i) => {
                  const Icon = aboutIcons[i];
                  return (
                    <li key={point}>
                      <Icon size={19} aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  );
                })}
              </ul>
              <ArrowButton href="#process">{t.about.cta}</ArrowButton>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="faq-section section-pad"
          aria-labelledby="faq-title"
        >
          <div className="container faq-grid">
            <div className="faq-title">
              <SectionKicker>{t.faq.kicker}</SectionKicker>
              <h2 id="faq-title">
                {t.faq.h2a}
                <br />
                <span>{t.faq.h2b}</span>
              </h2>
              <p>{t.faq.text}</p>
              <a
                className="text-link"
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.faq.link} <DirArrow size={16} />
              </a>
            </div>
            <div className="faq-list">
              {t.faq.items.map((faq, index) => {
                const open = openFaq === index;
                const panelId = `${faqId}-panel-${index}`;
                const buttonId = `${faqId}-button-${index}`;
                return (
                  <div
                    className={`faq-item ${open ? "faq-open" : ""}`}
                    key={faq.question}
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(open ? -1 : index)}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown size={19} aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="faq-answer"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!open}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section section-pad"
          aria-labelledby="contact-title"
        >
          <div className="container contact-panel">
            <div className="contact-copy">
              <div className="contact-stamp" aria-hidden="true">
                SHARON
                <br />
                <span>AC SERVICE</span>
              </div>
              <SectionKicker light>{t.contact.kicker}</SectionKicker>
              <h2 id="contact-title">
                {t.contact.h2a}
                <br />
                <em>{t.contact.h2em}</em>
              </h2>
              <p>{t.contact.text}</p>
              <div className="contact-direct">
                <a href={phoneLink}>
                  <Phone size={18} aria-hidden="true" />
                  <span>
                    <small>{t.contact.callSmall}</small>
                    <strong dir="ltr">{BUSINESS.phoneDisplay}</strong>
                  </span>
                </a>
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>
                    <small>{t.contact.waSmall}</small>
                    <strong>{t.contact.waStrong}</strong>
                  </span>
                </a>
              </div>
            </div>
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              aria-labelledby="form-title"
            >
              {submitted ? (
                <div className="form-success" role="status" aria-live="polite">
                  <span className="success-badge" aria-hidden="true">
                    <Check size={28} />
                  </span>
                  <h3>{t.contact.successTitle}</h3>
                  <p>{t.contact.successText}</p>
                  <a
                    className="whatsapp-button form-whatsapp"
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={17} aria-hidden="true" />{" "}
                    {t.contact.successWa}
                  </a>
                </div>
              ) : (
                <>
                  <div className="form-heading">
                    <span aria-hidden="true">01</span>
                    <div>
                      <h3 id="form-title">{t.contact.formTitle}</h3>
                      <p>{t.contact.formSub}</p>
                    </div>
                  </div>
                  <label htmlFor="contact-name">
                    {t.contact.name}{" "}
                    <span className="req">({t.contact.required})</span>
                    <input
                      id="contact-name"
                      required
                      name="name"
                      autoComplete="name"
                      placeholder={t.contact.namePh}
                    />
                  </label>
                  <label htmlFor="contact-phone">
                    {t.contact.phone}{" "}
                    <span className="req">({t.contact.required})</span>
                    <input
                      id="contact-phone"
                      required
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      placeholder={t.contact.phonePh}
                    />
                  </label>
                  <label htmlFor="contact-message">
                    {t.contact.message}
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      placeholder={t.contact.messagePh}
                    />
                  </label>
                  <button className="form-submit" type="submit">
                    <span>{t.contact.submit}</span>
                    <span className="arrow-circle">
                      <DirArrow size={17} />
                    </span>
                  </button>
                  <small className="form-privacy">
                    <ShieldCheck size={13} aria-hidden="true" />{" "}
                    {t.contact.privacy}
                  </small>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a
            className="brand footer-brand"
            href="#top"
            title={t.brand.homeLabel}
          >
            <span className="brand-mark" aria-hidden="true">
              <Snowflake size={22} />
            </span>
            <span className="brand-copy">
              <strong>{t.brand.first}</strong>
              <span>{t.brand.second}</span>
            </span>
          </a>
          <p>{t.footer.tagline}</p>
          <nav className="footer-links" aria-label={t.footer.navLabel}>
            <a href="#services">{t.footer.services}</a>
            <a href="#process">{t.footer.process}</a>
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={15} aria-hidden="true" /> {t.footer.whatsapp}
            </a>
          </nav>
          <span className="footer-copy">
            © {new Date().getFullYear()} {t.footer.rights}
          </span>
        </div>
        <a
          className="floating-whatsapp"
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.floatingWa}
        >
          <MessageCircle size={22} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}

export default Home;
