import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Check, Egg, Flame, Plus } from "lucide-react";
import { PageHeader } from "@/components/lumiere/PageHeader";
import { dailyRings, meals as seedMeals } from "@/lib/lumiere";

export const Route = createFileRoute("/app/nutrition")({
  head: () => ({
    meta: [
      { title: "Beslenme — Lumiere Coaching" },
      {
        name: "description",
        content:
          "Öğünlerini işaretle, kalori ve makro hedeflerini takip et, yemek fotoğrafından otomatik analiz al.",
      },
      { property: "og:title", content: "Beslenme — Lumiere Coaching" },
      {
        property: "og:description",
        content: "Günün öğünleri, kalori ve makro takibi.",
      },
    ],
  }),
  component: NutritionPage,
});

function NutritionPage() {
  const [meals, setMeals] = useState(seedMeals);
  const logged = meals.filter((m) => m.logged);
  const calories = logged.reduce((a, m) => a + m.calories, 0);
  const protein = logged.reduce((a, m) => a + m.protein, 0);
  const carbs = logged.reduce((a, m) => a + m.carbs, 0);
  const fat = logged.reduce((a, m) => a + m.fat, 0);
  const calTarget = dailyRings[0]!.target;
  const proTarget = dailyRings[1]!.target;

  const toggle = (id: string) =>
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, logged: !m.logged } : m)),
    );

  return (
    <main>
      <PageHeader eyebrow="Beslenme takibi" title="Bugünün öğünleri" />

      <section className="surface-card grid grid-cols-2 gap-4 p-5">
        <div className="min-w-0">
          <Flame size={17} className="text-primary-glow" />
          <p className="font-display mt-2 truncate text-2xl font-extrabold">
            {calories}
            <span className="text-xs font-semibold text-muted-foreground">
              {" "}
              / {calTarget}
            </span>
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="ember h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (calories / calTarget) * 100)}%` }}
            />
          </div>
        </div>
        <div className="min-w-0">
          <Egg size={17} className="text-success" />
          <p className="font-display mt-2 truncate text-2xl font-extrabold">
            {protein}
            <span className="text-xs font-semibold text-muted-foreground">
              {" "}
              / {proTarget} g
            </span>
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${Math.min(100, (protein / proTarget) * 100)}%` }}
            />
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-2 border-t border-border pt-4">
          {[
            ["Protein", `${protein} g`],
            ["Karb.", `${carbs} g`],
            ["Yağ", `${fat} g`],
          ].map(([k, v]) => (
            <div key={k} className="min-w-0 text-center">
              <p className="truncate text-sm font-bold">{v}</p>
              <p className="eyebrow text-muted-foreground">{k}</p>
            </div>
          ))}
        </div>
      </section>

      <button className="surface-card mt-4 flex w-full items-center gap-3 p-4 text-left active:scale-[0.99]">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-success/15 text-success">
          <Camera size={19} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">
            Yemek fotoğrafı analizi
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            Kalori ve makroları otomatik hesapla
          </span>
        </span>
      </button>

      <div className="mt-4 space-y-3">
        {meals.map((m) => (
          <div key={m.id} className="surface-card flex items-center gap-3 p-4">
            <button
              onClick={() => toggle(m.id)}
              aria-label={m.logged ? `${m.name} kaydını kaldır` : `${m.name} kaydet`}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors ${
                m.logged ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"
              }`}
            >
              {m.logged ? <Check size={18} /> : <Plus size={18} />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                <p className="truncate text-sm font-bold">{m.name}</p>
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {m.time}
                </span>
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {m.calories} kcal · {m.protein}g protein
              </p>
              <p className="mt-1 truncate text-[11px] text-muted-foreground/80">
                {m.items.join(" · ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
