"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: ErrorProps) {
  return (
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
  );
}
