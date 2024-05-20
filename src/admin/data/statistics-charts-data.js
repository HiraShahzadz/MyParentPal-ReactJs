// statistics-charts-data.js
import { chartsConfig } from "@/admin/configs";

export const websiteViewsChart = {
  type: "bar",
  height: 300,
  series: [
    {
      name: "Users",
      data: [],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    chart: {
      background: "#B089BE",
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

export const dailySalesChart = {
  type: "bar",
  height: 300,
  series: [
    {
      name: "Users",
      data: [], // Will be dynamically populated with age group data
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    chart: {
      background: "#B089BE",
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
        "11-20",
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
    color: "MyPurple",
    title: "Geographic Usage",
    footer: "Updates in real time",
    chart: websiteViewsChart,
  },
  {
    color: "MyPurple",
    title: "User Age Group",
    footer: "Updates in real time",
    chart: dailySalesChart,
  },
];

export default statisticsChartsData;
