import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/lumiere/BottomNav";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto min-h-dvh w-full max-w-md px-5 pb-28">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
