import { getFormStats } from "@/actions/form";
import React from "react";
import StatsCard from "./StatsCard";
import { statsCards } from "@/lib/helper";

interface Props {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}

export const StatsCards: React.FC<Props> = ({ data, loading }) => {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((card) => {
        const value = data
          ? `${data[card.name as keyof typeof data].toLocaleString()}${
              card.isPercentageData ? "%" : ""
            }`
          : "";
        return (
          <StatsCard
            key={card.id}
            title={card.title}
            icon={card.icon}
            helperText={card.helperText}
            value={value}
            loading={loading}
            className={`shadow-md ${card.shadow}`}
          />
        );
      })}
    </div>
  );
};
