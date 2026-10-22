// Icônes SVG décoratives : aria-hidden car le sens est porté par le texte ou l'aria-label du parent.

export function HeartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
      />
    </svg>
  );
}

export function CameraIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
        d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2l1.5-2.5h6L16.5 6h2A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z"
      />
      <circle cx="12" cy="13" r="3.6" fill="none" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

// direction : "up" | "down" | "left" | "right"
const CHEVRON_ROTATION = { down: 0, left: 90, up: 180, right: 270 };

export function ChevronIcon({ direction = 'down', className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${CHEVRON_ROTATION[direction]}deg)` }}
    >
      <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="m5 9 7 7 7-7" />
    </svg>
  );
}

export function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
      <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}
