import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x axis
  LinearScale, //y axis
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
  Legend
);

const LineChart = () => {
  // Sample data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Rescue",
        data: [45, 55, 50, 48, 55, 50],
        fill: true,
        borderColor: "#333",
        backgroundColor: "#0DDE4C",
        pointBorderColor: "#0DDE4C",
        tension: 0.3,
      },
      {
        label: "Adoption",
        data: [40, 45, 55, 52, 60, 65],
        fill: true,
        borderColor: "#333",
        backgroundColor: "#0474ed",
        pointBorderColor: "#0474ed",
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
        boxShadow:
          " 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)",
      }}
    >
      <h5> Pet Detail </h5>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
