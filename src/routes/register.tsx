import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { Logo } from "@/components/lumiere/Logo";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Hesap oluştur — Lumiere Coaching" },
      {
        name: "description",
        content:
          "Dakikalar içinde Lumiere Coaching hesabını oluştur ve kişiye özel antrenman planına başla.",
      },
      { property: "og:title", content: "Hesap oluştur — Lumiere Coaching" },
      {
        property: "og:description",
        content: "Kişiye özel antrenman ve beslenme planın için yeni bir başlangıç.",
      },
    ],
  }),
  component: RegisterPage,
});

const field =
  "h-13 w-full rounded-xl border border-input bg-surface px-4 py-3.5 pl-11 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  return (
    <main className="hero-bg flex min-h-dvh flex-col justify-center px-5 py-10">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" showText={false} />
          <p className="eyebrow mt-5 text-primary-glow">Hesap oluştur</p>
          <h1 className="mt-2 text-3xl font-extrabold">Yeni başlangıç</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Birkaç adımda planın hazır olacak.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/onboarding" });
          }}
          className="surface-card space-y-4 p-5"
        >
          <div className="relative">
            <User
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ad Soyad"
              autoComplete="name"
              className={field}
            />
          </div>
          <div className="relative">
            <Mail
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              required
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="E-posta"
              className={field}
            />
          </div>
          <div className="relative">
            <Lock
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              required
              minLength={8}
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Şifre (en az 8 karakter)"
              className={field}
            />
          </div>

          <button
            type="submit"
            className="ember ember-glow flex h-13 w-full items-center justify-center gap-2 rounded-xl text-base font-bold active:scale-[0.99]"
          >
            Devam et <ArrowRight size={18} />
          </button>

          <Link
            to="/"
            className="flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-muted-foreground"
          >
            Zaten hesabın var mı? Giriş yap
          </Link>
        </form>
      </div>
    </main>
  );
}
