import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const ProgressGraph = () => {
  const chartRef = useRef(null);

  const getChartOptions = () => {
    return {
      series: [40, 85, 80, 95],
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
      labels: ["To do", "Done", "Reviewed", "Rewarded"],
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
  }, []);

  return (
    <div class="w-full max-w-md rounded-lg bg-white  dark:bg-gray-800 ">
      <div class="mb-3  flex">
        <div class="flex ">
          <div class="flex ">
            <h5 class="pe-1 text-xl font-bold leading-none text-gray-900 dark:text-white">
              Your progress
            </h5>
            <svg
              data-popover-target="chart-info"
              data-popover-placement="bottom"
              class="ms-1 h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
            <div
              data-popover
              id="chart-info"
              role="tooltip"
              class="invisible absolute z-10 inline-block w-72 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              <div class="space-y-2 p-3">
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  Activity growth - Incremental
                </h3>
                <p>
                  Report helps navigate cumulative growth of community
                  activities. Ideally, the chart should have a growing trend, as
                  stagnating chart signifies a significant decrease of community
                  activity.
                </p>
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  Calculation
                </h3>
                <p>
                  For each date bucket, the all-time volume of activities is
                  calculated. This means that activities in period n contain all
                  activities up to period n, plus the activities generated by
                  your community in period.
                </p>
                <a
                  href="#"
                  class="flex items-center font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-600"
                >
                  Read more{" "}
                  <svg
                    class="ms-1.5 h-2 w-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
              <div data-popper-arrow></div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-3 dark:bg-gray-700">
        <div class="mb-2 grid grid-cols-4 gap-3">
          <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-[#b089be] dark:bg-gray-600">
            <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-MyPurple-400 dark:bg-gray-500 dark:text-white">
              12
            </dt>
            <dd class="text-sm font-medium text-white dark:text-white">
              To do
            </dd>
          </dl>
          <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-[#5bb85e] dark:bg-gray-600">
            <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-[#5bb85e] dark:bg-gray-500 dark:text-white">
              64
            </dt>
            <dd class="text-sm font-medium text-white dark:text-blue-300">
              Done
            </dd>
          </dl>
          <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-[#FD8552] dark:bg-gray-600">
            <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-[#FD8552] dark:bg-gray-500 dark:text-white">
              64
            </dt>
            <dd class="text-sm font-medium text-white dark:text-blue-300">
              Reviewed
            </dd>
          </dl>
          <dl class="flex h-[78px] flex-col items-center justify-center rounded-lg bg-[#4E9AD0] dark:bg-gray-600">
            <dt class="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-[#4E9AD0] dark:bg-gray-500 dark:text-white">
              64
            </dt>
            <dd class="text-sm font-medium text-white dark:text-blue-300">
              Rewarded
            </dd>
          </dl>
        </div>
        <button
          data-collapse-toggle="more-details"
          type="button"
          class="inline-flex items-center text-xs font-medium text-gray-500 hover:underline dark:text-gray-400"
        >
          Show more details{" "}
          <svg
            class="ms-1 h-2 w-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="more-details"
          class="mt-3 hidden space-y-2 border-t border-gray-200 pt-3 dark:border-gray-600"
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

      <div class="py-6" id="radial-chart"></div>

      <div class="grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between pt-5"></div>
      </div>
    </div>
  );
};

export default ProgressGraph;