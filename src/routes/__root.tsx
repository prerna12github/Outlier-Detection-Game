import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center paper-bg px-4">
      <div className="retro-card max-w-md p-8 text-center">
        <h1 className="serif text-6xl font-bold text-[#242830]">404</h1>
        <h2 className="serif mt-3 text-xl font-semibold text-[#242830]">Data Point Missing</h2>
        <p className="mt-2 text-sm text-[#6B7280]">
          The page or dataset you are seeking cannot be located in the current distribution.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="retro-btn retro-btn-primary"
          >
            Back to Outlier Hunt
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center paper-bg px-4">
      <div className="retro-card max-w-md p-8 text-center">
        <h1 className="serif text-2xl font-bold text-[#242830]">
          Calculation Anomaly
        </h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          An unexpected error occurred while parsing the dataset. Please refresh or return to the main dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="retro-btn retro-btn-primary"
          >
            Try again
          </button>
          <a
            href="/"
            className="retro-btn"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OUTLIER HUNT — Spot the Odd. Master the Data." },
      { name: "description", content: "An interactive, educational game for spotting categorical oddities and mastering statistical outlier detection." },
      { property: "og:title", content: "OUTLIER HUNT — Spot the Odd. Master the Data." },
      { property: "og:description", content: "Train your brain to spot anomalies, uncover unusual patterns, and think like a data scientist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=DM+Serif+Display:ital@0;1&family=Fraunces:opsz,wght@9..144,500;9..144,700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
