import Chart from "react-apexcharts";

const DoubleTimeseriesChart = ({
  title,
  description,
  xaxis,
  yaxis1,
  yaxis2,
  ylabel1,
  ylabel2,
  chartType,
  ylabel,
  setYear,
  xlabel,
}) => {
  const config = {
    options: {
      chart: {
        height: 70,
        toolbar: {
          show: true, // Enable the toolbar to show zoom options
        },
        zoom: {
          enabled: true, // Enable zoom functionality
        },
      },
      xaxis: {
        categories: xaxis ?? [],
        type: "datetime",
      },
      yaxis: [
        {
          title: {
            text: ylabel1 ?? "",
          },
          labels: {
            formatter: function (value) {
              return value.toFixed(2); // Format the value for the first y-axis
            },
          },
        },
        {
          opposite: true, // This places the second y-axis on the right side
          title: {
            text: ylabel2 ?? "",
          },
          labels: {
            formatter: function (value) {
              return value.toFixed(2); // Format the value for the second y-axis
            },
          },
        },
      ],
      legend: {
        show: true, // Enable legends to differentiate between the lines
      },
      colors: ["#21C55D", "#F97316"], // Colors for the two lines
      tooltip: {
        enabled: true,
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: ylabel1 ?? "",
        data: yaxis1 ?? [],
      },
      {
        name: ylabel2 ?? "",
        data: yaxis2 ?? [],
      },
    ],
  };

  return (
    <div>
      <Chart
        type={chartType || "line"}
        height={380}
        options={config.options}
        series={config.series}
      />
    </div>
  );
};

export default DoubleTimeseriesChart;
