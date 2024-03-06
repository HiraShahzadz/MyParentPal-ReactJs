import { UserIcon } from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "MyPurple",
    icon: UserIcon,
    title: "Total Users",
    value: "", // Placeholder for total users count
    footer: {
      color: "purple-400",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "MyPurple",
    icon: UserIcon,
    title: "Parent User",
    value: "", // Placeholder for parent users count
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "MyPurple",
    icon: UserIcon,
    title: "Child User",
    value: "", // Placeholder for child users count
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
];
