import React from "react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";

interface StatsCard {
  name: string;
  title: string;
  icon: JSX.Element;
  helperText: string;
  shadow: string;
  isPercentageData: boolean;
}

export const statsCards: StatsCard[] = [
  {
    name: "visits",
    title: "Total visits",
    icon: React.createElement(LuView, { className: "text-blue-600" }),
    helperText: "All time form visits",
    shadow: "shadow-blue-600",
    isPercentageData: false,
  },
  {
    name: "submissions",
    title: "Total submissions",
    icon: React.createElement(FaWpforms, { className: "text-yellow-600" }),
    helperText: "All time form submissions",
    shadow: "shadow-yellow-600",
    isPercentageData: false,
  },
  {
    name: "submissionRate",
    title: "Submission rate",
    icon: React.createElement(HiCursorClick, { className: "text-green-600" }),
    helperText: "Visits that result in form submissions",
    shadow: "shadow-green-600",
    isPercentageData: true,
  },
  {
    name: "bounceRate",
    title: "Bounce rate",
    icon: React.createElement(TbArrowBounce, { className: "text-red-600" }),
    helperText: "Visits that leaves without interacting",
    shadow: "shadow-red-600",
    isPercentageData: true,
  },
];
