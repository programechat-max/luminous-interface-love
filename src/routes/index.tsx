import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/lumiere/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Giriş yap — Lumiere Coaching" },
      {
        name: "description",
        content:
          "Lumiere Coaching hesabına giriş yap; antrenman planın, beslenme takibin ve AI koçun seni bekliyor.",
      },
      { property: "og:title", content: "Giriş yap — Lumiere Coaching" },
      {
        property: "og:description",
        content: "Koçun, planların ve ilerlemen tek yerde.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="hero-bg flex min-h-dvh flex-col justify-center px-5 py-10">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" showText={false} />
          <p className="eyebrow mt-5 text-primary-glow">Kişisel performans alanın</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight">
            LUMIERE <span className="text-primary-glow">COACHING</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Koçun, planların ve ilerlemen tek yerde.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email && password) navigate({ to: "/app/flow" });
          }}
          className="surface-card space-y-4 p-5"
        >
          <label className="block">
            <span className="eyebrow text-muted-foreground">E-posta</span>
            <div className="relative mt-2">
              <Mail
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                required
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@eposta.com"
                className="h-13 w-full rounded-xl border border-input bg-surface px-4 py-3.5 pl-11 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
              />
            </div>
          </label>

          <label className="block">
            <span className="eyebrow text-muted-foreground">Şifre</span>
            <div className="relative mt-2">
              <Lock
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-13 w-full rounded-xl border border-input bg-surface px-4 py-3.5 pl-11 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
              />
            </div>
          </label>

          <button
            type="submit"
            className="ember ember-glow flex h-13 w-full items-center justify-center gap-2 rounded-xl text-base font-bold active:scale-[0.99]"
          >
            Giriş yap <ArrowRight size={18} />
          </button>

          <Link
            to="/register"
            className="flex h-13 w-full items-center justify-center rounded-xl border border-border bg-surface text-base font-semibold active:scale-[0.99]"
          >
            Yeni hesap oluştur
          </Link>
        </form>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck size={14} /> Verilerin şifreli saklanır
        </p>
      </div>
    </main>
  );
}
