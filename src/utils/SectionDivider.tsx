
export function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 100"
      className={`w-full h-12 md:h-20 ${flip ? 'rotate-180' : ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z"
        fill="url(#gradient-romantic)"
      />
      <defs>
        <linearGradient id="gradient-romantic" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f7d6e0" />
          <stop offset="1" stopColor="#f9e7c3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
