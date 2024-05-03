import CreateFormButton from "@/components/CreateFormButton";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StatsWrapper } from "@/components/dashboard/StatsWrapper";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <StatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <CreateFormButton />
    </div>
  );
}
