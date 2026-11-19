import { WravelMark } from "../../brand/WravelMark";
import { StoreButtons } from "../../components/StoreButtons";
import { features } from "./features";
import styles from "./Landing.module.css";

export function Landing() {
  return (
    <>
      <title>wravel — plan trips together</title>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <WravelMark className={styles.heroMark} />
          <h1 className={styles.headline}>Plan trips together.</h1>
          <p className={styles.lede}>
            A shared itinerary for everyone on the trip. Stays, flights, trains and plans,
            day by day, in one place the whole group can see.
          </p>
          <StoreButtons />
          <p className={styles.soon}>
            <span className={styles.soonBadge}>Coming soon</span>
            The web version and sign-in are on their way. For now, wravel lives on your
            phone.
          </p>
        </div>
      </section>

      <section className={styles.features} aria-labelledby="features-heading">
        <div className="container">
          <h2 id="features-heading" className={styles.sectionTitle}>
            Everything the trip needs, in one itinerary
          </h2>
          <ul className={styles.grid}>
            {features.map((feature) => (
              <li key={feature.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardBody}>{feature.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.about} aria-labelledby="about-heading">
        <div className={`container ${styles.aboutInner}`}>
          <h2 id="about-heading" className={styles.sectionTitle}>
            What wravel is
          </h2>
          <div className={styles.aboutText}>
            <p>
              Group trips come together in a dozen places at once: a chat thread, a few
              forwarded emails, screenshots of bookings, someone's notes app. wravel pulls
              all of that into a single itinerary that everyone on the trip shares.
            </p>
            <p>
              One person starts the trip and invites the others. From there everyone adds
              what they've booked and what they want to do, and the group sees it laid out
              by day: where you're staying, how you're getting from one place to the next,
              and what's planned once you're there. Trips can be extended, so a weekend
              that grows into a week stays one itinerary.
            </p>
            <p>
              wravel is available today for iPhone and Android. A web version, with
              sign-in and more room to plan on a bigger screen, is coming.
            </p>
          </div>
          <StoreButtons />
        </div>
      </section>
    </>
  );
}
