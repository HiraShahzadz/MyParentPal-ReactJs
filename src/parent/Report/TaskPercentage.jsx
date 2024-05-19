import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

function TaskPercentage({ selectedTaskDetails }) {
  const percentage = selectedTaskDetails ? parseInt(selectedTaskDetails) : 0; // Convert to number
  useEffect(() => {
    const getChartOptions = () => {
      return {
        series: [100, percentage],
        colors: ["#d1d5db", "#b089be"],
        chart: {
          height: 290,
          width: "100%",
          type: "donut",
        },
        stroke: {
          colors: ["transparent"],
          lineCap: "",
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontFamily: "Inter, sans-serif",
                  offsetY: 20,
                },
                total: {
                  showAlways: true,
                  show: true,
                  label: "Percentage",
                  fontFamily: "Inter, sans-serif",
                  formatter: function (w) {
                    const sum = w.globals.seriesTotals.reduce((a, b) => {
                      return b;
                    }, 0);
                    return sum + "%";
                  },
                },
                value: {
                  show: true,
                  fontFamily: "Inter, sans-serif",
                  offsetY: -20,
                  formatter: function (value) {
                    return value + "%";
                  },
                },
              },
              size: "80%",
            },
          },
        },
        grid: {
          padding: {
            top: -2,
          },
        },
        labels: ["Total", "Obtained"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: "bottom",

          fontFamily: "Inter, sans-serif",
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value + "%";
            },
          },
        },
        xaxis: {
          labels: {
            formatter: function (value) {
              return value + "%";
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      };
    };
    if (
      document.getElementById("donut-chart") &&
      typeof ApexCharts !== "undefined"
    ) {
      const chart = new ApexCharts(
        document.getElementById("donut-chart"),
        getChartOptions()
      );
      chart.render();

      // Cleanup function to destroy the chart instance when the component unmounts
      return () => {
        chart.destroy();
      };
    }
  }, [percentage]);

  return (
    <div className="w-full max-w-sm rounded-lg bg-white pt-3 shadow dark:bg-gray-800 md:p-3">
      <div className="mb-1 justify-between">
        <div className=" items-center justify-center">
          <h5 className="pe-1 text-center text-lg font-bold leading-none text-gray-900 dark:text-white">
            Task Percentage
          </h5>
          <h5 className="m-2 text-center leading-none text-gray-900 dark:text-white">
            percentage assigned to this task
          </h5>
        </div>
      </div>

      <div className="py-1" id="donut-chart"></div>
    </div>
  );
}

export default TaskPercentage;
