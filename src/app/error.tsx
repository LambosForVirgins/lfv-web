"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <section
      id={"welcome"}
      data-testid={"home"}
      className="grid p-5 gap-9 col-content grid-cols-panels content-center items-center"
    >
      <div data-testid={`home.content`}>
        <div className="grid gap-5">
          <h1>Oops!</h1>
          <h2>
            Something fucked up. Our virginiest virgin is looking into it.
          </h2>
        </div>
      </div>
    </section>
  );
}
