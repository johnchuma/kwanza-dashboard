import Chart from "react-apexcharts";

const PieChart = ({ title, labels, data, chartType }) => {
  const config = {
    options: {
      chart: {
        type: "pie",
        height: 250,
      },
      labels: labels ?? [], // Labels for each slice of the pie
      legend: {
        show: true,
        position: "bottom", // Adjust position to your preference
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
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
        type={chartType ?? "pie"}
        options={config.options}
        series={config.series}
        height={250}
      />
    </div>
  );
};

export default PieChart;
