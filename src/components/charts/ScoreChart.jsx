import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const ScoreChart = ({ score }) => {
  const data = [
    { name: "Score", value: score },
    { name: "Reste", value: 1 - score },
  ];

  const COLORS = ["#FF0000", "#FBFBFB"];

  return (
    <div className="score-card">
      <p style={{ paddingLeft: "16px", margin: 0, fontWeight: 600 }}>Score</p>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[{ value: 1 }]}
              innerRadius="0%"
              outerRadius="70%"
              fill="white"
              dataKey="value"
            />
            <Pie
              data={data}
              innerRadius="70%"
              outerRadius="90%"
              startAngle={90}
              endAngle={450}
              dataKey="value"
              cornerRadius={10}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="score-card-center">
        <span className="score-card-percent">{score * 100}%</span>
        <span className="score-card-objectif">de votre<br />objectif</span>
      </div>
    </div>
  );
};

export default ScoreChart;