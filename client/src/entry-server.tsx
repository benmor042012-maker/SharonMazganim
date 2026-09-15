import { renderToString } from "react-dom/server";
import App from "./App";
import { dictionaries, LOCALES, localeFromPath, localePath } from "./i18n";
import { headTags, SITE_URL, absoluteUrl } from "./seo";

export { LOCALES, localePath, absoluteUrl, SITE_URL };

export function render(url: string): {
  html: string;
  head: string;
  lang: string;
  dir: string;
} {
  const locale = localeFromPath(url);
  const clean = locale ? localePath(locale) : url;
  const html = renderToString(<App ssrPath={clean} />);
  if (!locale) {
    return {
      html,
      head: `<title>404</title><meta name="robots" content="noindex" />`,
      lang: "he",
      dir: "rtl",
    };
  }
  const t = dictionaries[locale];
  return { html, head: headTags(locale), lang: locale, dir: t.dir };
}
