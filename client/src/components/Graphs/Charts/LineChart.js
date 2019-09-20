import React from "react";
import { Line } from "react-chartjs-2";
import "./LineChart.css";
function LineChart({ timeStamps, values }) {
  const data = {
    labels: timeStamps,
    datasets: [
      {
        label: "Random Number Graph",
        fill: false,
        lineTension: 0.01,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values
      }
    ]
  };
  return (
    <div className="line-chart">
      <Line data={data} />
    </div>
  );
}

export default LineChart;
