import { Link, Outlet } from "react-router";
import { WravelMark } from "../brand/WravelMark";
import styles from "./SiteChrome.module.css";

const year = new Date().getFullYear();

/** The default site frame: a slim header with the mark, the page, a footer. */
export function SiteChrome() {
  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link to="/" className={styles.home} aria-label="wravel home">
            <WravelMark className={styles.mark} />
            <span className={styles.wordmark}>wravel</span>
          </Link>
          <nav className={styles.nav} aria-label="Primary">
            <span className={styles.navSoon}>Sign in · coming soon</span>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span>© {year} wravel</span>
          <span className={styles.footerNote}>Plan trips together.</span>
        </div>
      </footer>
    </div>
  );
}
