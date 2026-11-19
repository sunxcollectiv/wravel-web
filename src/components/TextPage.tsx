import type { ReactNode } from "react";
import styles from "./TextPage.module.css";

interface TextPageProps {
  title: string;
  /** Short line under the title, e.g. a last-updated date. */
  subtitle?: ReactNode;
  children: ReactNode;
}

/** A simple reading layout for plain text pages: title, optional subtitle, prose. */
export function TextPage({ title, subtitle, children }: TextPageProps) {
  return (
    <section className={styles.surface}>
      <title>{`${title} — wravel`}</title>
      <article className={`container ${styles.page}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </header>
        <div className={styles.prose}>{children}</div>
      </article>
    </section>
  );
}
