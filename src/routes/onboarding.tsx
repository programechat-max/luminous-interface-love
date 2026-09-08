import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Mic,
  Sparkles,
  Target,
} from "lucide-react";
import { Logo } from "@/components/lumiere/Logo";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Kurulum — Lumiere Coaching" },
      {
        name: "description",
        content:
          "Hedeflerini ve ölçülerini paylaş, Lumiere sana özel antrenman ve beslenme planını hazırlasın.",
      },
      { property: "og:title", content: "Kurulum — Lumiere Coaching" },
      {
        property: "og:description",
        content: "Birkaç soruyla planını kişiselleştir.",
      },
    ],
  }),
  component: OnboardingPage,
});

const goals = [
  { id: "fat_loss", label: "Yağ yakımı", desc: "Kas koruyarak kilo ver" },
  { id: "muscle", label: "Kas kazanımı", desc: "Güç ve hacim odaklı" },
  { id: "recomp", label: "Form koruma", desc: "Dengeli ve sürdürülebilir" },
];

const levels = ["Başlangıç", "Orta", "İleri"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("fat_loss");
  const [level, setLevel] = useState("Orta");
  const [perms, setPerms] = useState({ camera: true, mic: false });

  const steps = ["Hoş geldin", "Ölçüler", "Hedefin", "İzinler", "Özet"];
  const finish = () => navigate({ to: "/app/flow" });
  const next = () => (step < steps.length - 1 ? setStep(step + 1) : finish());

  return (
    <main className="hero-bg flex min-h-dvh flex-col px-5 pb-8 pad-safe-top">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
        <button
          onClick={() => (step === 0 ? navigate({ to: "/register" }) : setStep(step - 1))}
          aria-label="Geri"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex min-w-0 items-center gap-1.5">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>
        <button
          onClick={finish}
          className="shrink-0 text-xs font-semibold text-muted-foreground"
        >
          Atla
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center py-6">
        {step === 0 && (
          <div className="flex flex-col items-center text-center">
            <Logo size="lg" showText={false} />
            <h1 className="mt-6 text-2xl font-extrabold">Hoş geldin!</h1>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Birkaç kısa soruyla antrenman ve beslenme planını sana göre
              ayarlayacağız. Bu yaklaşık bir dakika sürer.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h1 className="text-2xl font-extrabold">Temel bilgiler</h1>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Yaş", value: "28", unit: "" },
                { label: "Boy", value: "182", unit: "cm" },
                { label: "Kilo", value: "84.5", unit: "kg" },
                { label: "Hedef kilo", value: "78", unit: "kg" },
              ].map((f) => (
                <label key={f.label} className="surface-card block p-4">
                  <span className="eyebrow text-muted-foreground">{f.label}</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <input
                      defaultValue={f.value}
                      inputMode="decimal"
                      className="w-full min-w-0 bg-transparent font-display text-2xl font-extrabold outline-none"
                    />
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {f.unit}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h1 className="text-2xl font-extrabold">Hedefin ne?</h1>
            <div className="space-y-3">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`surface-card flex w-full items-center gap-3 p-4 text-left transition-colors ${
                    goal === g.id ? "border-primary" : ""
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                      goal === g.id ? "ember" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Target size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{g.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {g.desc}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div>
              <p className="eyebrow mb-2 text-muted-foreground">Deneyim</p>
              <div className="grid grid-cols-3 gap-2">
                {levels.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`h-11 rounded-xl border text-sm font-semibold ${
                      level === l
                        ? "border-primary bg-primary/15 text-primary-glow"
                        : "border-border bg-surface text-muted-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h1 className="text-2xl font-extrabold">İzinler</h1>
            <p className="text-sm text-muted-foreground">
              Form analizi ve sesli koçluk için gerekli. İstediğin zaman
              kapatabilirsin.
            </p>
            {[
              {
                key: "camera" as const,
                Icon: Camera,
                title: "Kamera",
                desc: "Hareket formu ve yemek fotoğrafı analizi",
              },
              {
                key: "mic" as const,
                Icon: Mic,
                title: "Mikrofon",
                desc: "Antrenman sırasında sesli komutlar",
              },
            ].map(({ key, Icon, title, desc }) => (
              <button
                key={key}
                onClick={() => setPerms({ ...perms, [key]: !perms[key] })}
                className="surface-card flex w-full items-center gap-3 p-4 text-left"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary">
                  <Icon size={18} className="text-primary-glow" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{title}</span>
                  <span className="block text-xs text-muted-foreground">{desc}</span>
                </span>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
                    perms[key]
                      ? "border-success bg-success/20 text-success"
                      : "border-border text-transparent"
                  }`}
                >
                  <Check size={15} />
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-primary-glow" />
              <h1 className="text-2xl font-extrabold">Planın hazır</h1>
            </div>
            <div className="surface-card divide-y divide-border p-1">
              {[
                ["Hedef", goals.find((g) => g.id === goal)?.label ?? ""],
                ["Deneyim", level],
                ["Haftalık antrenman", "4 gün"],
                ["Günlük kalori", "2200 kcal"],
                ["Protein", "175 g"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3 p-4">
                  <span className="min-w-0 truncate text-sm text-muted-foreground">
                    {k}
                  </span>
                  <span className="shrink-0 text-sm font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={next}
        className="ember ember-glow flex h-13 w-full items-center justify-center gap-2 rounded-xl text-base font-bold active:scale-[0.99]"
      >
        {step === steps.length - 1 ? "Uygulamaya gir" : "Devam et"}
        <ArrowRight size={18} />
      </button>
    </main>
  );
}
