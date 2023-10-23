import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../assets/Chart.css";

const Chart = ({ blitzData }) => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryCounts = {};

        for (const player of blitzData) {
          // get country code i.e "US" from json's url
          let countryCode = player.country.split("/").pop();
          // create new entries if coutry code is not alr in there
          if (!countryCounts[countryCode]) {
            countryCounts[countryCode] = {
              code: countryCode,
              count: 0,
              name: "",
            };
          }
          countryCounts[countryCode].count += 1;
        }

        // populate each country code with its full name from another api
        const countryDataArray = Object.values(countryCounts);

        for (const country of countryDataArray) {
          let countryResponse = await axios.get(
            `https://api.chess.com/pub/country/${country.code}`
          );
          country.name = countryResponse.data.name;
        }

        setCountryData(countryDataArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [blitzData]);

  const COLORS = [
    "red",
    "aqua",
    "blueviolet",
    "coral",
    "cyan",
    "blue",
    "darkgoldenrod",
    "grey",
    "green",
    "deeppink",
    "floralwhite",
    "lightpink",
  ];

  return (
    <>
      <h5 style={{ textAlign: "center" }}>Countries of top players</h5>
      <PieChart width={250} height={325}>
        <Pie
          data={countryData}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="60%"
          outerRadius={120}
          fill="#8884d8"
        >
          {countryData.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend layout="horizontal" height={120} />
        {/* Render legends in a vertical list */}
      </PieChart>
    </>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "black",
          padding: "5px",
          border: "1px solid #cccc",
        }}
      >
        <label>{`${payload[0].name} : ${payload[0].payload.count} players`}</label>
      </div>
    );
  }
  return null;
};

export default Chart;
