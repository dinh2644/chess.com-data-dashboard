import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>
          <strong>Name: </strong>
          {data.name}
        </p>
        <p>
          <strong>Win Count: </strong>
          {data.win_count}
        </p>
      </div>
    );
  }

  return null;
};

const PlayerWinChart = ({ playerData }) => {
  return (
    <>
      <h4>Win Leaderboard</h4>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={playerData}>
          <XAxis dataKey="rank" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="win_count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PlayerWinChart;
