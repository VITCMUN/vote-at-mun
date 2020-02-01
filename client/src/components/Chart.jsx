import React, { useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import "../styling/Chart.css";

function ResultChart(props) {
  const [chartData, modifyChartData] = useState({
    labels: ["Yes", "No", "NOTA"],
    datasets: [
      {
        label: "Votes",
        data: [55, 23, 22],
        backgroundColor: [
          "rgba(246,219,166,0.8)",
          "rgba(246,219,166,0.6)",
          "rgba(246,219,166,0.3)"
        ]
      }
    ]
  });
  return (
    <div className="chart box">
      <Doughnut
        data={chartData}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: true,
            labels: { fontColor: "#ffffff", fontSize: 20 }
          },
          layout: {
            padding: {
              bottom: 50
            }
          }
        }}
      />
    </div>
  );
}

export { ResultChart };
