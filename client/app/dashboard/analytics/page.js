import { StatsGrid } from "../../../features/dashboard/StatsGrid";

export default function AnalyticsPage() {
  return (
    <div className="grid gap-5">
      <h1 className="text-2xl font-black">Analytics</h1>
      <StatsGrid />
    </div>
  );
}
