import { Link } from "react-router";
import { TextPage } from "../../components/TextPage";
import { SUPPORT_EMAIL } from "../../links";

const mailto = (subject: string) => `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export function Support() {
  return (
    <TextPage title="Support" subtitle={<>Questions, problems, or feedback: <a href={mailto("wravel support")}>{SUPPORT_EMAIL}</a></>}>
      <p>
        The fastest way to reach us is email. Write to{" "}
        <a href={mailto("wravel support")}>{SUPPORT_EMAIL}</a> and we'll get back to you
        within two business days, usually sooner. Include the email address you signed up
        with, your phone and its OS version, and what you were doing when the problem came up.
        Screenshots help a lot.
      </p>

      <h2>Getting started</h2>
      <ul>
        <li>
          <strong>Create a trip.</strong> Give it a name and dates. You can change both later,
          and extend a trip once it's underway.
        </li>
        <li>
          <strong>Invite your group.</strong> Share the invite from the trip's menu. Everyone
          who joins sees the same itinerary and can add their own plans.
        </li>
        <li>
          <strong>Add plans.</strong> Stays, flights, trains, and activities go on the day they
          happen. Search for a place to attach its address and photo.
        </li>
        <li>
          <strong>Forward a booking.</strong> Forward a confirmation email to the address shown
          in the app, or share a screenshot of it, and wravel adds the booking to the right day.
        </li>
      </ul>

      <h2>Credits and pricing</h2>
      <p>
        wravel uses credits to unlock trips. Credits are bought in packs inside the app, through
        the App Store on iPhone and Google Play on Android, and stay on your account until you
        use them.
      </p>
      <p>
        A trip costs credits based on how long it is and how many people are on it. Longer trips
        cost less per day, and larger groups cost less per person. The exact amount is shown in
        the app before you confirm any change that affects it, and your balance and history are
        always available from your profile.
      </p>
      <p>
        If a trip gets shorter or smaller, the difference is returned to the trip's owner as
        credits, up to 24 hours after the trip starts. After that, changes are free but nothing
        is refunded. Credits aren't exchanged for cash. If you think you were charged credits
        in error, email <a href={mailto("Credits question")}>{SUPPORT_EMAIL}</a> with the trip's
        name and we'll look into it.
      </p>
      <p>
        Refunds for the purchase of a credit pack itself are handled by Apple or Google, since
        they processed the payment. Request one through your App Store or Google Play purchase
        history, and let us know if you need help finding it.
      </p>

      <h2>Your account</h2>
      <ul>
        <li>
          <strong>Can't sign in?</strong> Check that you're using the email address you signed up
          with. If you're still stuck, email us from that address and we'll sort it out.
        </li>
        <li>
          <strong>Deleting your account.</strong> Email{" "}
          <a href={mailto("Delete my account")}>{SUPPORT_EMAIL}</a> from the address on the
          account and we'll delete it, along with your trips and data, within 30 days. Trips
          you organize that other people are on will be handed over or removed; we'll confirm
          which with you first.
        </li>
        <li>
          <strong>Your data.</strong> To ask for a copy of the data we hold about you, email us.
          Our <Link to="/privacy">privacy policy</Link> describes what we collect and why.
        </li>
      </ul>

      <h2>Beta testing</h2>
      <p>
        If you're trying wravel through TestFlight or a Google Play test track, thank you.
        Things will occasionally break. When they do, email{" "}
        <a href={mailto("Beta bug report")}>{SUPPORT_EMAIL}</a> with what you expected, what
        happened, and the app version from the profile screen. Feature ideas are just as welcome.
      </p>

      <h2>Anything else</h2>
      <p>
        If it isn't covered here, email{" "}
        <a href={mailto("wravel support")}>{SUPPORT_EMAIL}</a>. A person reads every message.
      </p>
    </TextPage>
  );
}
