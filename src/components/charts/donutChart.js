import Chart from "react-apexcharts";

const DonutChart = ({ title, labels, data }) => {
  const config = {
    options: {
      chart: {
        type: "donut", // Changed to "donut" for the hole in the middle
        height: 250,
      },
      labels: labels ?? [], // Labels for each slice
      legend: {
        show: true,
        position: "bottom", // Adjust position if needed
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        text: title ?? "", // Display title if provided
        align: "center",
      },
      colors: ["#21C55D", "#F97316", "#3B82F6", "#EF4444", "#14B8A6"], // Add more colors if needed
      plotOptions: {
        pie: {
          donut: {
            size: "60%", // Adjust the size of the hole
          },
        },
      },
    },
    series: data ?? [], // Array of values for each slice
  };

  return (
    <div>
      <Chart
        type="donut" // Updated type to "donut"
        options={config.options}
        series={config.series}
        height={300}
      />
    </div>
  );
};

export default DonutChart;
