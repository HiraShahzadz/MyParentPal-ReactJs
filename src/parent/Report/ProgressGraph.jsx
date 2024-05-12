import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const ProgressGraph = ({
  totalTasks,
  todoCount,
  completedCount,
  reviewedCount,
  rewardedCount,
  taskPercentages,
}) => {
  const chartRef = useRef(null);

  const getChartOptions = () => {
    return {
      series: [
        taskPercentages.Todo,
        taskPercentages.Completed,
        taskPercentages.Reviewed,
        taskPercentages.Rewarded,
      ],

      colors: ["#b089be", "#5bb85e", "#FD8552", "#4E9AD0"],
      chart: {
        height: "380px",
        width: "100%",
        type: "radialBar",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          track: {
            background: "#E5E7EB",
          },
          dataLabels: {
            show: false,
          },
          hollow: {
            margin: 0,
            size: "32%",
          },
        },
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -23,
          bottom: -20,
        },
      },
      labels: ["Todo", "Done", "Reviewed", "Rewarded"],
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: function (value) {
            return value + "%";
          },
        },
      },
    };
  };
  const renderChart = () => {
    const chartElement = document.getElementById("radial-chart");

    if (chartElement && typeof ApexCharts !== "undefined") {
      const chartOptions = getChartOptions();

      if (chartOptions) {
        // Check if the chart instance already exists
        if (chartRef.current) {
          // If it exists, destroy it before creating a new one
          chartRef.current.destroy();
        }

        // Create a new chart instance
        const chart = new ApexCharts(chartElement, chartOptions);
        chart.render();

        // Save the chart instance in the ref for future reference
        chartRef.current = chart;
      } else {
        console.error("Error: Unable to get chart options.");
      }
    } else {
      console.error(
        "Error: Unable to find chart element or ApexCharts library."
      );
    }
  };

  useEffect(() => {
    renderChart();

    // Cleanup chart instance when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [taskPercentages]);

  return (
    <div className="flex items-center justify-center">
      <div class="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 ">
        <div class="rounded-lg bg-white p-3 dark:bg-gray-700">
          <div class="grid grid-cols-4 gap-3">
            <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-[#b089be] dark:bg-gray-600">
              <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-MyPurple-400 dark:bg-gray-500 dark:text-white">
                {totalTasks}
              </dt>
              <dd class="text-sm font-medium text-white dark:text-white">
                Total
              </dd>
            </dl>
            <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-[#b089be] dark:bg-gray-600">
              <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-MyPurple-400 dark:bg-gray-500 dark:text-white">
                {todoCount}
              </dt>
              <dd class="text-sm font-medium text-white dark:text-white">
                Todo
              </dd>
            </dl>
            <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-[#5bb85e] dark:bg-gray-600">
              <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-[#5bb85e] dark:bg-gray-500 dark:text-white">
                {completedCount}
              </dt>
              <dd class="text-sm font-medium text-white dark:text-blue-300">
                Completed
              </dd>
            </dl>
            <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-[#FD8552] dark:bg-gray-600">
              <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-[#FD8552] dark:bg-gray-500 dark:text-white">
                {reviewedCount}
              </dt>
              <dd class="text-sm font-medium text-white dark:text-blue-300">
                Reviewed
              </dd>
            </dl>
            <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-[#4E9AD0] dark:bg-gray-600">
              <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-[#4E9AD0] dark:bg-gray-500 dark:text-white">
                {rewardedCount}
              </dt>
              <dd class="text-sm font-medium text-white dark:text-blue-300">
                Rewarded
              </dd>
            </dl>
          </div>

          <div
            id="more-details"
            class="hidden border-t border-gray-200 dark:border-gray-600"
          >
            <dl class="flex items-center justify-between">
              <dt class="text-sm font-normal text-gray-500 dark:text-gray-400">
                Average task completion rate:
              </dt>
              <dd class="inline-flex items-center rounded-md bg-[#b089be] px-2.5 py-1 text-xs font-medium text-white dark:bg-green-900 dark:text-green-300">
                <svg
                  class="me-1.5 h-2.5 w-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13V1m0 0L1 5m4-4 4 4"
                  />
                </svg>{" "}
                57%
              </dd>
            </dl>
            <dl class="flex items-center justify-between">
              <dt class="text-sm font-normal text-gray-500 dark:text-gray-400">
                Days until sprint ends:
              </dt>
              <dd class="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-600 dark:text-gray-300">
                13 days
              </dd>
            </dl>
            <dl class="flex items-center justify-between">
              <dt class="text-sm font-normal text-gray-500 dark:text-gray-400">
                Next meeting:
              </dt>
              <dd class="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-600 dark:text-gray-300">
                Thursday
              </dd>
            </dl>
          </div>
        </div>

        <div class="pb-2" id="radial-chart"></div>

        <div class="grid grid-cols-1 items-center justify-between">
          <div class="flex items-center justify-between pt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressGraph;
