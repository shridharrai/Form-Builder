import { StatsCards } from "@/components/dashboard/StatsCards";
import { StatsWrapper } from "@/components/dashboard/StatsWrapper";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <StatsWrapper />
      </Suspense>
    </div>
  );
}
