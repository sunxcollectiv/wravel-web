import { createBrowserRouter } from "react-router";
import { Chrome } from "./chrome";
import { Landing } from "./pages/landing/Landing";
import { NotFound } from "./pages/NotFound";

/**
 * The route tree. Pages are grouped by the chrome they get: everything under
 * the `Chrome` layout route has the site header and footer. A route that wants
 * no chrome (or a different one) goes under its own layout group instead, e.g.
 *   { element: <BareChrome />, children: [{ path: "embed/:id", element: ... }] }
 */
export const router = createBrowserRouter([
  {
    element: <Chrome />,
    children: [
      { index: true, element: <Landing /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
