import { APP_STORE_URL, PLAY_STORE_URL } from "../links";
import styles from "./StoreButtons.module.css";

/** The two download buttons, side by side; they stack on narrow screens. */
export function StoreButtons() {
  return (
    <div className={styles.row}>
      <a className={styles.button} href={APP_STORE_URL} target="_blank" rel="noreferrer">
        <AppleLogo className={styles.icon} />
        <span className={styles.label}>
          <small>Download on the</small>
          App Store
        </span>
      </a>
      <a className={styles.button} href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
        <PlayLogo className={styles.icon} />
        <span className={styles.label}>
          <small>Get it on</small>
          Google Play
        </span>
      </a>
    </div>
  );
}

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.73c.03 2.86 2.51 3.81 2.54 3.82-.02.07-.4 1.36-1.31 2.69-.79 1.15-1.61 2.3-2.9 2.32-1.27.02-1.68-.75-3.13-.75s-1.91.73-3.11.78c-1.25.05-2.2-1.25-2.99-2.4C3.84 16.86 2.6 12.56 4.27 9.68c.83-1.44 2.3-2.35 3.9-2.37 1.22-.02 2.37.82 3.12.82.74 0 2.14-1.01 3.61-.86.62.03 2.34.25 3.45 1.88-.09.06-2.06 1.2-2.04 3.58M13.9 5.72c.66-.8 1.1-1.9.98-3.01-.95.04-2.1.63-2.78 1.43-.61.71-1.14 1.84-1 2.92 1.06.08 2.14-.54 2.8-1.34" />
    </svg>
  );
}

function PlayLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 2.6c-.3.2-.5.6-.5 1.1v16.6c0 .5.2.9.5 1.1l9.3-9.4L4.5 2.6Zm10.7 8 2.8-2.8L6.6 1.6c-.5-.3-1-.3-1.4-.2L15.2 10.6Zm0 2.8L5.2 22.6c.4.1.9.1 1.4-.2L18 16.2l-2.8-2.8Zm4.4-4.1-3 1.7 2.7 2.7-.2.2 3-1.7c1-.6 1-1.6 0-2.2l-2.5-1.4v.7Z" />
    </svg>
  );
}
