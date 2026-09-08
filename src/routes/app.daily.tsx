import { createFileRoute } from "@tanstack/react-router";
import { Check, Droplets, Moon, Scale } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/lumiere/PageHeader";
import { ProgressRing } from "@/components/lumiere/ProgressRing";
import { dailyRings, weekHistory, weightData } from "@/lib/lumiere";

export const Route = createFileRoute("/app/daily")({
  head: () => ({
    meta: [
      { title: "Günlük — Lumiere Coaching" },
      {
        name: "description",
        content:
          "Kalori, protein, su, uyku ve kilo takibini günlük olarak izle; haftalık grafiklerle ilerlemeni gör.",
      },
      { property: "og:title", content: "Günlük — Lumiere Coaching" },
      {
        property: "og:description",
        content: "Hedef halkaların, kilo grafiğin ve günlük alışkanlıkların.",
      },
    ],
  }),
  component: DailyPage,
});

const habits = [
  { Icon: Droplets, label: "Su", value: "2.1 / 3.0 L", done: false },
  { Icon: Moon, label: "Uyku", value: "7s 20dk", done: true },
  { Icon: Scale, label: "Tartı", value: "84.5 kg", done: true },
];

function DailyPage() {
  return (
    <main>
      <PageHeader eyebrow="Günlük takip" title="İlerlemen" />

      <section className="surface-card p-5">
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
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="eyebrow text-muted-foreground">Kilo değişimi</p>
            <p className="mt-1 text-2xl font-extrabold">84.5 kg</p>
          </div>
          <span className="shrink-0 rounded-full bg-success/15 px-3 py-1.5 text-xs font-bold text-success">
            Hedefe 6.5 kg
          </span>
        </div>
        <div className="-ml-2 mt-4 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightData} margin={{ top: 6, right: 6, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="w" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                width={34}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  color: "var(--foreground)",
                  fontSize: 12,
                }}
                labelStyle={{ color: "var(--muted-foreground)" }}
              />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="var(--primary)"
                strokeWidth={2.5}
                fill="url(#w)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="surface-card mt-4 p-5">
        <p className="eyebrow mb-3 text-muted-foreground">Alışkanlıklar</p>
        <div className="space-y-3">
          {habits.map(({ Icon, label, value, done }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary-glow">
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{label}</p>
                <p className="truncate text-xs text-muted-foreground">{value}</p>
              </div>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
                  done
                    ? "border-success bg-success/20 text-success"
                    : "border-border text-transparent"
                }`}
              >
                <Check size={14} />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-card mt-4 p-5">
        <p className="eyebrow mb-3 text-muted-foreground">Haftalık antrenman</p>
        <div className="flex justify-between gap-1.5">
          {weekHistory.map((d) => (
            <div key={d.day} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <div
                className={`grid h-11 w-full place-items-center rounded-lg ${
                  d.done ? "ember" : "bg-secondary text-muted-foreground"
                }`}
              >
                {d.done && <Check size={15} />}
              </div>
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
