import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Dumbbell,
  Flame,
  Camera,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import { PageHeader } from "@/components/lumiere/PageHeader";
import { ProgressRing } from "@/components/lumiere/ProgressRing";
import { dailyRings, profile, weekProgram, weekHistory } from "@/lib/lumiere";

export const Route = createFileRoute("/app/flow")({
  head: () => ({
    meta: [
      { title: "Akış — Lumiere Coaching" },
      {
        name: "description",
        content:
          "Bugünün antrenmanı, günlük hedeflerin ve koçundan gelen öneriler tek ekranda.",
      },
      { property: "og:title", content: "Akış — Lumiere Coaching" },
      {
        property: "og:description",
        content: "Bugünün odağı, hedef halkaların ve hızlı işlemler.",
      },
    ],
  }),
  component: FlowPage,
});

function FlowPage() {
  const today = weekProgram[3]!;

  return (
    <main>
      <PageHeader eyebrow={`Merhaba ${profile.fullName.split(" ")[0]}`} title="Bugünün akışı" />

      <section className="surface-card relative overflow-hidden p-5">
        <div className="hero-bg absolute inset-0 opacity-90" aria-hidden />
        <div className="relative">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="min-w-0">
              <p className="eyebrow text-primary-glow">Bugünün odağı</p>
              <h2 className="mt-1 truncate text-2xl font-extrabold">
                Perşembe · {today.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {today.exercises.length} hareket · ~55 dk
              </p>
            </div>
            <span className="ember grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
              <Dumbbell size={22} />
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="ember h-full w-[15%] rounded-full" />
          </div>

          <Link
            to="/app/workout"
            className="ember ember-glow mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-xl text-sm font-bold active:scale-[0.99]"
          >
            Antrenmanı başlat <ChevronRight size={17} />
          </Link>
        </div>
      </section>

      <section className="surface-card mt-4 p-5">
        <p className="eyebrow mb-4 text-muted-foreground">Günlük durum</p>
        <div className="grid grid-cols-3 gap-2">
          {dailyRings.map((r) => (
            <ProgressRing
              key={r.label}
              value={r.current}
              target={r.target}
              label={r.label}
              unit={r.unit}
              tone={r.tone}
              size={84}
            />
          ))}
        </div>
      </section>

      <section className="surface-card mt-4 p-5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <span className="ember grid h-11 w-11 shrink-0 place-items-center rounded-2xl">
            <Sparkles size={19} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Lumiere yanında</p>
            <p className="truncate text-xs text-muted-foreground">
              Bugün nasıl hissediyorsun?
            </p>
          </div>
        </div>
        <Link
          to="/app/chat"
          className="mt-4 flex h-12 w-full items-center justify-between rounded-xl border border-border bg-surface px-4 text-sm text-muted-foreground"
        >
          Koçuna bir şey sor... <ChevronRight size={17} />
        </Link>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/app/nutrition" className="surface-card p-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary-glow">
            <Flame size={18} />
          </span>
          <p className="mt-3 text-sm font-bold">Öğün ekle</p>
          <p className="text-xs text-muted-foreground">1130 / 2200 kcal</p>
        </Link>
        <Link to="/app/nutrition" className="surface-card p-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
            <Camera size={18} />
          </span>
          <p className="mt-3 text-sm font-bold">Foto analizi</p>
          <p className="text-xs text-muted-foreground">Makroları otomatik bul</p>
        </Link>
      </section>

      <section className="surface-card mt-4 p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="eyebrow text-muted-foreground">Bu hafta</p>
            <p className="mt-1 text-sm font-bold">4 / 7 gün tamamlandı</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-success/15 px-3 py-1.5 text-xs font-bold text-success">
            <TrendingDown size={14} /> -2.7 kg
          </span>
        </div>
        <div className="mt-4 flex justify-between gap-1.5">
          {weekHistory.map((d) => (
            <div key={d.day} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <div
                className={`h-10 w-full rounded-lg ${d.done ? "ember" : "bg-secondary"}`}
              />
              <span className="text-[10px] font-semibold text-muted-foreground">
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
