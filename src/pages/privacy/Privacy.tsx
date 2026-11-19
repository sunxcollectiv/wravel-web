import { Link } from "react-router";
import { TextPage } from "../../components/TextPage";
import { SUPPORT_EMAIL } from "../../links";

const LAST_UPDATED = "November 19, 2026";

export function Privacy() {
  return (
    <TextPage title="Privacy Policy" subtitle={`Last updated ${LAST_UPDATED}`}>
      <p>
        This policy explains what wravel collects, why, and what you can do about it. It
        applies to the wravel apps for iPhone and Android and to this website. The short
        version: we collect what the app needs to work, we use some of it to make wravel
        better, and we never sell any of it.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Your account.</strong> Your email address, display name, and a password
          (stored hashed, never in plain text).
        </li>
        <li>
          <strong>Your trips.</strong> Everything you and your group put in an itinerary:
          trip names and dates, stays, flights, trains, activities, places, notes, and who is
          on each trip.
        </li>
        <li>
          <strong>Bookings you import.</strong> Confirmation emails you forward to wravel and
          screenshots you share with it, along with the details extracted from them.
        </li>
        <li>
          <strong>Purchases.</strong> When you buy credits, Apple or Google processes the
          payment. We receive a receipt that confirms the purchase, not your card or bank
          details. We keep a record of credits bought, spent, and refunded.
        </li>
        <li>
          <strong>Device and usage data.</strong> Your device's push notification token, the
          app version, and how you use wravel: for example which features you use and which
          kinds of places and plans you add to trips.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>
          <strong>To run wravel.</strong> Showing your trips to you and your group, sending
          notifications you've asked for, settling credits, and answering support requests.
        </li>
        <li>
          <strong>To import bookings.</strong> The emails and screenshots you send are read
          by AI services so the booking can be added to your itinerary. See
          "AI processing" below.
        </li>
        <li>
          <strong>To improve recommendations.</strong> We use how people use wravel, in
          aggregate and on your own account, to improve our own recommendations engine, so
          the places and plans wravel suggests get more useful. This is used for wravel only.
        </li>
        <li>
          <strong>To keep the service working.</strong> Diagnosing crashes, errors, and
          performance problems.
        </li>
      </ul>

      <h2>What we don't do</h2>
      <p>
        We don't sell your personal data, and we don't share it with anyone for their own
        marketing. We don't show third-party advertising in wravel.
      </p>

      <h2>AI processing</h2>
      <p>
        To turn a forwarded confirmation or a screenshot into an itinerary item, wravel sends
        its contents to third-party AI services for processing. We use these services under
        terms that do not permit your data to be used to train their models, and we send only
        what's needed to extract the booking. The result is stored with your trip; you can edit
        or delete it like any other plan.
      </p>

      <h2>Who else sees your data</h2>
      <ul>
        <li>
          <strong>People on your trip.</strong> Everyone on a trip sees that trip's itinerary,
          including plans you add to it and your display name.
        </li>
        <li>
          <strong>Service providers.</strong> Companies that help us run wravel, such as
          hosting, email delivery, push notifications, place search and maps, and the AI
          services above. They process data on our behalf and only to provide their service to
          us.
        </li>
        <li>
          <strong>Apple and Google.</strong> They process credit purchases and deliver push
          notifications under their own privacy policies.
        </li>
        <li>
          <strong>When the law requires it.</strong> We may disclose data if required to by
          law, or to protect the rights and safety of wravel and its users.
        </li>
      </ul>

      <h2>Analytics</h2>
      <p>
        This website and the apps use Google Analytics to understand how they are used and how
        they perform. Google Analytics collects information such as the pages or screens you
        visit, how long you spend on them, your approximate location, and your device and
        browser type, using cookies or similar identifiers. Google processes this information
        on our behalf. You can learn how Google uses data from sites and apps that use its
        services at{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">
          policies.google.com/technologies/partner-sites
        </a>
        , and opt out of Google Analytics in your browser with the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
          Google Analytics opt-out add-on
        </a>
        .
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your data for as long as you have an account. Forwarded emails and screenshots
        are kept so you can check what was imported, and are deleted with the trip they belong
        to. When you delete your account, we delete your account data and the trips you own
        within 30 days. Records we're required to keep, such as purchase history, are kept for
        as long as the law requires.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          <strong>See or correct your data.</strong> Your account details and trips are
          editable in the app. For a copy of everything we hold about you, email us.
        </li>
        <li>
          <strong>Delete your account.</strong> Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Delete my account")}`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          from the address on your account. See <Link to="/support">Support</Link> for what
          happens to trips you share with others.
        </li>
        <li>
          <strong>Notifications.</strong> Turn push notifications off in your phone's settings
          at any time.
        </li>
        <li>
          <strong>Depending on where you live</strong>, you may have additional rights, such as
          to object to or restrict certain processing, or to lodge a complaint with a data
          protection authority. Email us and we'll help.
        </li>
      </ul>

      <h2>Security</h2>
      <p>
        Data travels between the apps and our servers over encrypted connections, and
        passwords are stored hashed. No system is perfectly secure, so if you believe your
        account has been accessed without your permission, email us right away.
      </p>

      <h2>Children</h2>
      <p>
        wravel is not directed at children under 13, and we don't knowingly collect personal
        data from them. If you believe a child has given us personal data, email us and we'll
        delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We'll post any changes here and update the date at the top. If a change is
        significant, we'll let you know in the app or by email.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy go to{" "}
        <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Privacy question")}`}>
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </TextPage>
  );
}
