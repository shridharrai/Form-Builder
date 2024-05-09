import CreateFormButton from "@/components/customButtons/CreateFormButton";
import { FormCardSkeleton } from "@/components/dashboard/FormCardSkeleton";
import { FormCards } from "@/components/dashboard/FormCards";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((item) => (
            <FormCardSkeleton key={item} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
