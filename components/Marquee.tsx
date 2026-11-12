type Item = { label: string; style?: string; tag?: string };

const marks = [
  <circle key="c" cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2.4" />,
  <path key="t" d="M11 3 20 19H2z" fill="currentColor" />,
  <rect key="s" x="4" y="4" width="14" height="14" rx="4" fill="currentColor" />,
  <path key="st" d="M11 2.5l2.6 5.6 6.1.7-4.5 4.1 1.2 6-5.4-3-5.4 3 1.2-6L2.3 8.8l6.1-.7z" fill="currentColor" />,
  <path key="h" d="M11 2l7.8 4.5v9L11 20l-7.8-4.5v-9z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />,
];

export function Marquee({
  items,
  variant = "destinations",
  label,
}: {
  items: Item[];
  variant?: "destinations" | "logos" | "promos";
  label?: string;
}) {
  const row = [...items, ...items];

  return (
    <div className={`marquee marquee--${variant}`} aria-label={label}>
      <div className="marquee__track">
        {row.map((item, i) => (
          <span className={`marquee__item marquee__item--${item.style ?? "sans"}`} key={`${item.label}-${i}`}>
            {variant === "logos" && (
              <svg viewBox="0 0 22 22" className="marquee__mark" aria-hidden="true">
                {marks[i % marks.length]}
              </svg>
            )}
            {variant === "promos" && item.tag && <span className="marquee__tag">{item.tag}</span>}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
