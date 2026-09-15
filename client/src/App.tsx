import {
  dictionaries,
  LocaleContext,
  localeFromPath,
  type Locale,
} from "@/i18n";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";

function LocalizedHome({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = t.dir;
    document.title = t.meta.title;
  }, [locale, t]);
  return (
    <LocaleContext.Provider value={t}>
      <Home />
    </LocaleContext.Provider>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/">{() => <LocalizedHome locale="he" />}</Route>
      <Route path="/en">{() => <LocalizedHome locale="en" />}</Route>
      <Route path="/fr">{() => <LocalizedHome locale="fr" />}</Route>
      <Route>
        {params => {
          // Trailing-slash variants (/en/, /fr/) resolve to the same page.
          const loc =
            typeof window !== "undefined"
              ? localeFromPath(window.location.pathname)
              : null;
          void params;
          return loc ? <LocalizedHome locale={loc} /> : <NotFound />;
        }}
      </Route>
    </Switch>
  );
}

export default function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <ErrorBoundary>
      <Router ssrPath={ssrPath}>
        <AppRoutes />
      </Router>
    </ErrorBoundary>
  );
}
