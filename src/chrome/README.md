# Chrome

The "chrome" is everything around a page: header, footer, and the frame they sit
in. It is a layout route, so pages never import it and never know whether they
have one.

- `SiteChrome` is the default: a header with the mark and a footer.
- `BareChrome` renders the page and nothing else, for routes that want the
  whole viewport (an embedded itinerary, a print view).
- `index.ts` picks which chrome `routes.tsx` wraps pages in. To swap the site's
  chrome, point the export at a different component; to give one route a
  different chrome, move it under another layout group in `routes.tsx`.

A chrome component renders `<Outlet />` where the page goes.
