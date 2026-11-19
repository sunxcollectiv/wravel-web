import type { SVGProps } from "react";

/**
 * The wravel W ("Fold"): a flat ribbon folded into a W, its four faces
 * alternating half and full opacity so the fold reads in any color. Same
 * geometry as the app icon, wravel-ios's WravelMark and wravel-android's
 * launcher foreground, in a 54 x 27 box. Draw it 2:1 (width:height); it
 * takes the current text color.
 */
export function WravelMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 54 27" fill="currentColor" role="img" aria-label="wravel" {...props}>
      <path opacity="0.5" d="M33.75 27 H42.75 L54 0 H45 Z" />
      <path d="M22.5 0 H31.5 L42.75 27 H33.75 Z" />
      <path opacity="0.5" d="M11.25 27 H20.25 L31.5 0 H22.5 Z" />
      <path d="M0 0 H9 L20.25 27 H11.25 Z" />
    </svg>
  );
}
