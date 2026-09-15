import { createContext, useContext } from "react";
import en from "./en";
import fr from "./fr";
import he from "./he";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale } from "./types";

export const LOCALES: Locale[] = ["he", "en", "fr"];
export const DEFAULT_LOCALE: Locale = "he";

export const dictionaries: Record<Locale, Dictionary> = { he, en, fr };

/** Path prefix for a locale: "" for the default (Hebrew), "/en", "/fr". */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

/** Resolve the locale from a URL pathname. Returns null for unknown paths. */
export function localeFromPath(pathname: string): Locale | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/") return "he";
  const match = clean.match(/^\/(en|fr)$/);
  return match ? (match[1] as Locale) : null;
}

export const LocaleContext = createContext<Dictionary>(he);

export function useT(): Dictionary {
  return useContext(LocaleContext);
}

export const BUSINESS = {
  name: "שרון מזגנים",
  nameEn: "Sharon AC Service",
  phoneDisplay: "050-644-3344",
  phoneE164: "+972506443344",
  whatsappNumber: "972506443344",
  city: "Netanya",
  region: "Center District",
  country: "IL",
  serviceAreas: [
    "Netanya",
    "Even Yehuda",
    "Tel Mond",
    "Kfar Yona",
    "Herzliya",
    "Ra'anana",
  ],
  geo: { lat: 32.3215, lng: 34.8532 },
  openingHours: "Mo-Th 08:00-20:00, Fr 08:00-14:00, Su 08:00-20:00",
};

export function whatsappLink(text: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
