import { getFormStats } from "@/actions/form";
import { StatsCards } from "../statsCards";

export const StatsWrapper = async () => {
  const stats = await getFormStats();
  return <StatsCards loading={false} data={stats} />;
};
