export type Locale = "he" | "en" | "fr";

export interface Service {
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Dictionary {
  locale: Locale;
  dir: "rtl" | "ltr";
  langName: string;
  ogLocale: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogImageAlt: string;
  };
  topbar: { area: string; hours: string; call: string };
  brand: { first: string; second: string; homeLabel: string };
  nav: {
    label: string;
    services: string;
    process: string;
    about: string;
    faq: string;
    skip: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    h1a: string;
    h1em: string;
    h1b: string;
    lede: string;
    cta: string;
    whatsapp: string;
    note: string;
    imgAlt: string;
    cardTopB: string;
    cardTopS: string;
    cardBottomB: string;
    cardBottomS: string;
    captionA: string;
    captionB: string;
    stat1: string;
    stat2: string;
    stat3: string;
    scroll: string;
  };
  services: {
    kicker: string;
    h2a: string;
    h2b: string;
    intro: string;
    items: Service[];
    footer: string;
    footerCta: string;
  };
  process: {
    kicker: string;
    h2a: string;
    h2b: string;
    text: string;
    videoLink: string;
    steps: { title: string; text: string }[];
  };
  about: {
    kicker: string;
    h2a: string;
    h2b: string;
    h2c: string;
    text: string;
    imgAlt: string;
    labelA: string;
    labelB: string;
    points: string[];
    cta: string;
  };
  faq: {
    kicker: string;
    h2a: string;
    h2b: string;
    text: string;
    link: string;
    items: Faq[];
  };
  contact: {
    kicker: string;
    h2a: string;
    h2em: string;
    text: string;
    callSmall: string;
    waSmall: string;
    waStrong: string;
    formTitle: string;
    formSub: string;
    name: string;
    namePh: string;
    phone: string;
    phonePh: string;
    message: string;
    messagePh: string;
    submit: string;
    privacy: string;
    successTitle: string;
    successText: string;
    successWa: string;
    required: string;
  };
  footer: {
    tagline: string;
    navLabel: string;
    services: string;
    process: string;
    whatsapp: string;
    rights: string;
  };
  floatingWa: string;
  whatsappText: string;
  notFound: { title: string; text: string; home: string };
}
