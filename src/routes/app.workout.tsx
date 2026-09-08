import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ChevronRight, Dumbbell, Timer } from "lucide-react";
import { PageHeader } from "@/components/lumiere/PageHeader";
import { weekProgram, type WorkoutDay } from "@/lib/lumiere";

export const Route = createFileRoute("/app/workout")({
  head: () => ({
    meta: [
      { title: "Antrenman — Lumiere Coaching" },
      {
        name: "description",
        content:
          "Haftalık antrenman programını gör, hareketleri işaretle ve set takibini telefonundan yap.",
      },
      { property: "og:title", content: "Antrenman — Lumiere Coaching" },
      {
        property: "og:description",
        content: "Haftalık planın ve gün gün hareket listen.",
      },
    ],
  }),
  component: WorkoutPage,
});

function WorkoutPage() {
  const [selected, setSelected] = useState<WorkoutDay | null>(null);
  const [done, setDone] = useState<number[]>([]);

  if (selected) {
    const progress = selected.exercises.length
      ? Math.round((done.length / selected.exercises.length) * 100)
      : 0;

    return (
      <main>
        <header className="sticky top-0 z-30 -mx-5 mb-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border bg-background/85 px-5 pb-3 pad-safe-top backdrop-blur-xl">
          <button
            onClick={() => {
              setSelected(null);
              setDone([]);
            }}
            aria-label="Geri"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-surface"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="min-w-0">
            <p className="eyebrow text-primary-glow">{selected.day} günü</p>
            <h1 className="truncate text-xl font-extrabold">{selected.title}</h1>
          </div>
        </header>

        <section className="surface-card p-5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <p className="text-sm font-bold">
                {done.length} / {selected.exercises.length} hareket
              </p>
              <p className="text-xs text-muted-foreground">Tahmini süre ~55 dk</p>
            </div>
            <span className="font-display shrink-0 text-2xl font-extrabold">
              {progress}%
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="ember h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <div className="mt-4 space-y-3">
          {selected.exercises.map((e, i) => {
            const isDone = done.includes(i);
            return (
              <button
                key={e.name}
                onClick={() =>
                  setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))
                }
                className={`surface-card flex w-full items-center gap-3 p-4 text-left transition-colors ${
                  isDone ? "border-success/50" : ""
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${
                    isDone
                      ? "border-success bg-success/20 text-success"
                      : "border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  {isDone ? <Check size={16} /> : <span className="text-xs font-bold">{i + 1}</span>}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-bold ${
                      isDone ? "text-muted-foreground line-through" : ""
                    }`}
                  >
                    {e.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {e.sets} set · {e.reps} tekrar · {e.weight}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                  <Timer size={13} /> {e.rest}
                </span>
              </button>
            );
          })}
        </div>

        <button className="ember ember-glow mt-5 flex h-13 w-full items-center justify-center rounded-xl text-base font-bold active:scale-[0.99]">
          Antrenmanı tamamla
        </button>
      </main>
    );
  }

  return (
    <main>
      <PageHeader eyebrow="Antrenman programı" title="Haftalık plan" />

      <div className="space-y-3">
        {weekProgram.map((d) => {
          const rest = d.exercises.length === 0;
          return (
            <button
              key={d.day}
              disabled={rest}
              onClick={() => setSelected(d)}
              className="surface-card flex w-full items-center gap-3 p-4 text-left disabled:opacity-55"
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
                  d.completed
                    ? "bg-success/15 text-success"
                    : rest
                      ? "bg-secondary text-muted-foreground"
                      : "ember"
                }`}
              >
                {d.completed ? <Check size={19} /> : <Dumbbell size={19} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">
                  {d.day} · {d.title}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {rest ? "Dinlenme günü" : `${d.exercises.length} hareket · ~55 dk`}
                </span>
              </span>
              {!rest && <ChevronRight size={18} className="shrink-0 text-muted-foreground" />}
            </button>
          );
        })}
      </div>
    </main>
  );
}
