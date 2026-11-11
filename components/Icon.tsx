type IconProps = {
  name:
    | "arrow"
    | "chevron"
    | "check"
    | "plus"
    | "menu"
    | "close"
    | "globe"
    | "spark"
    | "shield"
    | "layers"
    | "ledger"
    | "left"
    | "right"
    | "mail"
    | "pin"
    | "cart"
    | "star"
    | "gift"
    | "calendar"
    | "truck"
    | "tag";
  size?: number;
  className?: string;
};

const paths: Record<string, React.ReactNode> = {
  arrow: <path d="M4 10h11.2l-3.6-3.6L13 5l5.5 5.5L13 16l-1.4-1.4 3.6-3.6H4z" fill="currentColor" />,
  chevron: <path d="M5.5 7.5 10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  check: <path d="m4 10.5 3.8 3.8L16 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  plus: <path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  menu: <path d="M3 6h14M3 10h14M3 14h14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />,
  close: <path d="M5 5l10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />,
  globe: (
    <>
      <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 10h14M10 3c2.2 2.2 2.2 11.8 0 14M10 3C7.8 5.2 7.8 14.8 10 17" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  spark: <path d="M10 2.5l1.7 4.6 4.8 1.7-4.8 1.7L10 15.1 8.3 10.5 3.5 8.8l4.8-1.7z" fill="currentColor" />,
  shield: <path d="M10 2.5 16 5v5c0 3.6-2.6 6.5-6 7.5C6.6 16.5 4 13.6 4 10V5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  layers: (
    <>
      <path d="M10 3 3 6.5 10 10l7-3.5z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="m3 10.5 7 3.5 7-3.5M3 14l7 3.5 7-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </>
  ),
  ledger: (
    <>
      <rect x="4" y="3" width="12" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 7h6M7 10h6M7 13h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  left: <path d="M12 5 7 10l5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  right: <path d="m8 5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  mail: (
    <>
      <rect x="3" y="5" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="m4 6.5 6 4.5 6-4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  pin: (
    <>
      <path d="M10 17s5-4.6 5-8a5 5 0 1 0-10 0c0 3.4 5 8 5 8z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="9" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2 9h8l2-7H6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="16" r="1.3" fill="currentColor" />
      <circle cx="14" cy="16" r="1.3" fill="currentColor" />
    </>
  ),
  star: <path d="M10 2.6l2.3 4.7 5.2.8-3.8 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1L2.5 8.1l5.2-.8z" fill="currentColor" />,
  gift: (
    <>
      <rect x="3" y="8" width="14" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 11h14M10 8v9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 8S8.4 4 6.6 4a2 2 0 0 0 0 4M10 8s1.6-4 3.4-4a2 2 0 0 1 0 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="14" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 8h14M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6h9v8H2zM11 9h3.5l2.5 3v2h-6z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="5.5" cy="15" r="1.4" fill="currentColor" />
      <circle cx="14" cy="15" r="1.4" fill="currentColor" />
    </>
  ),
  tag: (
    <>
      <path d="M10 2.5H4.5v5.5L11 14.5l5-5z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="7" cy="6" r="1" fill="currentColor" />
    </>
  ),
};

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
