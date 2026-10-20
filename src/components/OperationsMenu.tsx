import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Compass,
  Layers3,
  Mountain,
} from "lucide-react";
const items = [
  {
    slug: "mining",
    title: "Mining & development",
    subtitle: "The Swarnagiri Gold Project",
    icon: Mountain,
  },
  {
    slug: "gold-processing",
    title: "Gold processing",
    subtitle: "From ore to opportunity",
    icon: Layers3,
  },
  {
    slug: "exploration",
    title: "Exploration",
    subtitle: "Understanding what lies beneath",
    icon: Compass,
  },
];
export function OperationsMenu({
  active,
  onNavigate,
}: {
  active: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div
      className="operations-menu"
      ref={rootRef}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        className={`operations-trigger ${active ? "active" : ""}`}
        aria-expanded={open}
        aria-controls="operations-popover"
        onClick={() => setOpen(!open)}
      >
        Our operations{" "}
        <ChevronDown size={13} className={open ? "rotated" : ""} />
      </button>
      {open && (
        <div
          className="operations-popover"
          id="operations-popover"
          role="region"
          aria-label="Operations menu"
        >
          <span className="popover-heading">ONE CONNECTED VISION</span>
          {items.map(({ slug, title, subtitle, icon: Icon }) => (
            <Link
              key={slug}
              to={`/operations/${slug}`}
              onClick={() => {
                setOpen(false);
                onNavigate();
              }}
            >
              <span className="popover-icon">
                <Icon size={21} strokeWidth={1.4} />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{subtitle}</small>
              </span>
              <ArrowUpRight size={17} />
            </Link>
          ))}
          <Link
            className="popover-all"
            to="/#projects"
            onClick={() => {
              setOpen(false);
              onNavigate();
            }}
          >
            Explore all operations <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
