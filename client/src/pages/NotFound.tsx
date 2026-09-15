import { dictionaries, LOCALES, localePath } from "@/i18n";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  const t = dictionaries.he;
  return (
    <main className="not-found" dir="rtl" lang="he">
      <div className="not-found-card">
        <AlertCircle size={52} aria-hidden="true" />
        <h1>404 · {t.notFound.title}</h1>
        <p>{t.notFound.text}</p>
        <p lang="en" dir="ltr">
          {dictionaries.en.notFound.text}
        </p>
        <div className="not-found-links">
          {LOCALES.map(l => (
            <a
              key={l}
              className="arrow-button"
              href={localePath(l)}
              hrefLang={l}
              lang={l}
            >
              <span>
                <Home size={16} aria-hidden="true" />{" "}
                {dictionaries[l].notFound.home}
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
