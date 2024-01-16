import { chartsConfig } from "@/child/configs";
import defaultColors from "tailwindcss/colors";

const websiteViewsChart = {
  type: "bar",
  height: 300,
  series: [
    {
      name: "Users",
      data: [90, 40, 50, 22, 60],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    chart: {
      background: "#B089BE", // Add this line to set the background color
    },
    plotOptions: {
      bar: {
        columnWidth: "9%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Punjab", "KPK", "Sindh", "Balochistan", "Islamabad"],
    },
  },
};

const dailySalesChart = {
  type: "bar",
  height: 300,
  series: [
    {
      name: "Users",
      data: [90, 50, 20, 22, 50, 20, 40, 70, 20],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    chart: {
      background: "#B089BE", // Add this line to set the background color
    },
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "1-10",
        "12-20",
        "21-30",
        "31-40",
        "41-50",
        "51-60",
        "61-70",
        "71-80",
        "81-90",
      ],
    },
  },
};

export const statisticsChartsData = [
  {
    color: "MuPurple",
    title: "User Age Group",
    footer: "Updates in real time",
    chart: websiteViewsChart,
  },
  {
    color: "MyPurple",
    title: "Geographic Usage",
    footer: "Updates in real time",
    chart: dailySalesChart,
  },
];

export default statisticsChartsData;