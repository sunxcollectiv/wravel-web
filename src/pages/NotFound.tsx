import { Link } from "react-router";

export function NotFound() {
  return (
    <section className="container" style={{ paddingBlock: "var(--space-9)" }}>
      <h1 style={{ font: "var(--text-title)" }}>There's nothing here.</h1>
      <p style={{ marginTop: "var(--space-3)", color: "var(--color-foreground-muted)" }}>
        <Link to="/">Back to the start</Link>
      </p>
    </section>
  );
}
