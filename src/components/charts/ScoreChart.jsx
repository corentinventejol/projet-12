import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const ScoreChart = ({ score }) => {
  // score doit être entre 0 et 1
  const data = [
    { name: "Score", value: score },
    { name: "Reste", value: 1 - score },
  ];

  const COLORS = ["#FF0000", "#FBFBFB"]; // Rouge pour le score, gris clair pour le reste

  return (
    <div style={{ width: "100%", height: 293, position: "relative", backgroundColor: "rgba(0, 0, 0, 0.02)", borderRadius: "5px" }}>
        <p style={{ paddingLeft: "16px" }}>score</p>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={90}
            startAngle={90}
            endAngle={450}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="score-card-center">
        <span className="score-card-percent">{score * 100}%</span>
        <span className="score-card-objectif">de votre<br />objectif</span>
      </div>
    </div>
  );
};

export default ScoreChart;