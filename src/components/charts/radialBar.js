import Chart from "react-apexcharts";

const RadialBarChart = ({ title, labels, data, chartType }) => {
  const config = {
    options: {
      chart: {
        type: "radialBar",
        height: 250,
      },
      plotOptions: {
        radialBar: {
          track: {
            strokeWidth: "100%", // Makes the base track thicker
          },
          barHeight: "80%", // Increases the radial bar height, making the bars thicker
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                // This will calculate the total of the series data
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
      labels: labels ?? [], // Labels for each section of the radial bar
      legend: {
        show: true,
        position: "bottom", // Adjust position to your preference
      },
      title: {
        text: title ?? "", // Display the title if provided
        align: "center",
      },
      colors: ["#21C55D", "#F97316", "#3B82F6", "#EF4444", "#14B8A6"], // Add more colors if needed
    },
    series: data ?? [], // Array of values corresponding to each label
  };

  return (
    <div>
      <Chart
        type={chartType ?? "radialBar"}
        options={config.options}
        series={config.series}
        height={360}
      />
    </div>
  );
};

export default RadialBarChart;
