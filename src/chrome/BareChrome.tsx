import { Outlet } from "react-router";

/** No chrome at all: the page fills the viewport. */
export function BareChrome() {
  return <Outlet />;
}
