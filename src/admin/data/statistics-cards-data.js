import { UserIcon } from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "MyPurple", // Updated color with hexadecimal value
    icon: UserIcon,
    title: "Total Users",
    value: "25,000",
    footer: {
      color: "purple-400",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "MyPurple", // Updated color with hexadecimal value
    icon: UserIcon,
    title: "Parent User",
    value: "8,000",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "MyPurple", // Updated color with hexadecimal value
    icon: UserIcon,
    title: "Child User",
    value: "17,000",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
