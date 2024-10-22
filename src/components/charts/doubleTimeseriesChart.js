import Chart from "react-apexcharts";

const DoubleTimeseriesChart = ({
  title,
  description,
  xaxis,
  yaxis1,
  yaxis2,
  ylabel1,
  ylabel2,
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
      colors: ["#21C55D", "#F97316"], // Colors for the two charts
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "50%", // Adjust the bar width
        },
      },
    },
    series: [
      {
        name: ylabel1 ?? "",
        type: "bar", // First series as a bar chart
        data: yaxis1 ?? [],
      },
      {
        name: ylabel2 ?? "",
        type: "bar", // Second series as a line chart
        data: yaxis2 ?? [],
      },
    ],
  };

  return (
    <div>
      <Chart height={380} options={config.options} series={config.series} />
    </div>
  );
};

export default DoubleTimeseriesChart;
