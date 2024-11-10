"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <section
          id={"welcome"}
          data-testid={"home"}
          className="grid p-5 gap-9 col-content grid-cols-panels content-center items-center"
        >
          <div data-testid={`home.content`}>
            <div className="grid gap-5">
              <h1>Error</h1>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
