import React from "react";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";
function BarChart({ ranges, count }) {
  const data = {
    labels: ranges,
    datasets: [
      {
        label: "Random Number Plot",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: count
      }
    ],
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: count.length
            }
          }
        ]
      }
    }
  };
  return (
    <div className="bar-chart">
      <Bar data={data} />
    </div>
  );
}

export default BarChart;
