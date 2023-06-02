import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
);

const VerticalBarChart = () => {
  // Sample data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sold",
        data: [45, 55, 50, 48, 55, 50],
        backgroundColor: (context) => {
          const gradient = context.chart.canvas
            .getContext("2d")
            .createLinearGradient(0, 0, 0, 200); // Adjust gradient direction and size as needed
          gradient.addColorStop(0.5, "rgba(108, 92, 231, 1)"); // Starting color
          gradient.addColorStop(1, "rgba(162, 155, 254, 1)"); // Ending color
          return gradient;
        },
        barPercentage: 0.5, // Reduce the width of bars
        borderRadius: 2,
        categoryPercentage: 0.7, // Reduce the space between bars
        pointBorderColor: "#6c5ce7",
        tension: 0.3,
      },
    ],
  };

  return (
    <div
      style={{
        backgroundColor: "#FDFDFD",
        padding: "10px",
        borderRadius: "5px",
        boxShadow:" 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)"
      }}
    >
      <h5>Sold by Ads</h5>
      <Bar
        data={data}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default VerticalBarChart;
