import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Crown,
  LogOut,
  Moon,
  Shield,
  User,
} from "lucide-react";
import { profile } from "@/lib/lumiere";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Ayarlar — Lumiere Coaching" },
      {
        name: "description",
        content:
          "Hesabını, üyeliğini, bildirim ve gizlilik tercihlerini Lumiere Coaching ayarlarından yönet.",
      },
      { property: "og:title", content: "Ayarlar — Lumiere Coaching" },
      {
        property: "og:description",
        content: "Hesap, üyelik, bildirim ve gizlilik tercihleri.",
      },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        on ? "bg-primary" : "bg-secondary"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-foreground transition-all ${
          on ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function SettingsPage() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({
    reminders: true,
    weekly: true,
    quiet: false,
    analytics: true,
  });

  const set = (k: keyof typeof prefs) => () => setPrefs({ ...prefs, [k]: !prefs[k] });

  return (
    <main>
      <header className="sticky top-0 z-30 -mx-5 mb-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border bg-background/85 px-5 pb-3 pad-safe-top backdrop-blur-xl">
        <Link
          to="/app/flow"
          aria-label="Geri"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-surface"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="min-w-0">
          <p className="eyebrow text-primary-glow">Hesabın</p>
          <h1 className="truncate text-xl font-extrabold">Ayarlar</h1>
        </div>
      </header>

      <section className="surface-card flex items-center gap-3 p-4">
        <span className="ember grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-extrabold">
          {profile.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold">{profile.fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{profile.email}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-warning/15 px-3 py-1.5 text-[11px] font-bold text-warning">
          <Crown size={13} /> {profile.membership}
        </span>
      </section>

      <section className="surface-card mt-4 divide-y divide-border">
        {[
          { Icon: Bell, title: "Günlük hatırlatmalar", desc: "Antrenman ve öğün bildirimleri", key: "reminders" as const },
          { Icon: Bell, title: "Haftalık özet", desc: "Pazar akşamı ilerleme raporu", key: "weekly" as const },
          { Icon: Moon, title: "Sessiz saatler", desc: "22:00 - 08:00 arası bildirim yok", key: "quiet" as const },
        ].map(({ Icon, title, desc, key }) => (
          <div key={key} className="flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary-glow">
              <Icon size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{title}</p>
              <p className="truncate text-xs text-muted-foreground">{desc}</p>
            </div>
            <Toggle on={prefs[key]} onClick={set(key)} />
          </div>
        ))}
      </section>

      <section className="surface-card mt-4 divide-y divide-border">
        <div className="flex items-center gap-3 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary-glow">
            <Shield size={17} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">Kullanım verisi paylaşımı</p>
            <p className="truncate text-xs text-muted-foreground">
              Anonim istatistiklerle deneyimi geliştir
            </p>
          </div>
          <Toggle on={prefs.analytics} onClick={set("analytics")} />
        </div>
        {[
          { Icon: User, title: "Profil ve ölçüler" },
          { Icon: Crown, title: "Üyelik planları" },
          { Icon: Shield, title: "Gizlilik ve verilerim" },
        ].map(({ Icon, title }) => (
          <button key={title} className="flex w-full items-center gap-3 p-4 text-left">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary-glow">
              <Icon size={17} />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-bold">{title}</span>
            <ChevronRight size={17} className="shrink-0 text-muted-foreground" />
          </button>
        ))}
      </section>

      <button
        onClick={() => navigate({ to: "/" })}
        className="mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface text-sm font-bold text-primary-glow active:scale-[0.99]"
      >
        <LogOut size={17} /> Çıkış yap
      </button>

      <p className="mt-4 text-center text-[11px] text-muted-foreground">
        Lumiere Coaching · Üyelik: {profile.memberSince}
      </p>
    </main>
  );
}
