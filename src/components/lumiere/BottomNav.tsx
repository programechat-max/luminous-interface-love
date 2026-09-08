import { Link } from "@tanstack/react-router";
import {
  Radar,
  Sparkles,
  CalendarDays,
  Dumbbell,
  UtensilsCrossed,
} from "lucide-react";

const items = [
  { to: "/app/flow", label: "Akış", Icon: Radar },
  { to: "/app/chat", label: "Lumiere", Icon: Sparkles },
  { to: "/app/daily", label: "Günlük", Icon: CalendarDays },
  { to: "/app/workout", label: "Antrenman", Icon: Dumbbell },
  { to: "/app/nutrition", label: "Beslenme", Icon: UtensilsCrossed },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 pad-safe-bottom backdrop-blur-xl">
      <ul className="mx-auto grid max-w-md grid-cols-5 px-1 pt-1.5">
        {items.map(({ to, label, Icon }) => (
          <li key={to} className="min-w-0">
            <Link
              to={to}
              className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-muted-foreground transition-colors"
              activeProps={{ className: "text-primary-glow" }}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`grid h-8 w-12 shrink-0 place-items-center rounded-full transition-colors ${
                      isActive ? "bg-primary/15" : ""
                    }`}
                  >
                    <Icon size={19} strokeWidth={isActive ? 2.6 : 2} />
                  </span>
                  <span className="w-full truncate text-center text-[10px] font-bold tracking-tight">
                    {label}
                  </span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
