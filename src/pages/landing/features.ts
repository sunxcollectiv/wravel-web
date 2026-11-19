/** The selling points shown under the hero. Copy lives here, not in the markup. */
export interface Feature {
  title: string;
  body: string;
}

export const features: Feature[] = [
  {
    title: "Plan it together",
    body: "One itinerary for everyone on the trip. Invite your group, let each person add their own plans, and post group plans for people to RSVP to.",
  },
  {
    title: "Day by day",
    body: "Stays, flights, trains and activities laid out on the days they happen, so you always know where you're sleeping and what's next.",
  },
  {
    title: "Forward a booking, and it's in",
    body: "Forward a confirmation email or drop in a screenshot. wravel reads the details and adds the stay, flight or reservation to the right day.",
  },
  {
    title: "Real places",
    body: "Search for the restaurant, museum or station and attach it. Every plan carries its place, photo and address.",
  },
  {
    title: "Time zones handled",
    body: "Overnight flights and border crossings don't trip it up. Every time is shown in the local time of where you'll be.",
  },
  {
    title: "Works on the move",
    body: "Your itinerary stays with you without signal, and the group hears about changes as they happen.",
  },
];
