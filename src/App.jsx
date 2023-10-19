import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "./components/Table";
import Header from "./components/Header";
import SidePanel from "./components/SidePanel";
const App = () => {
  const [blitzData, setBlitzData] = useState([]);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        let response = await axios.get(
          "https://api.chess.com/pub/leaderboards"
        );
        const LeaderboardData = response.data;
        const live_blitzData = LeaderboardData.live_blitz;
        setBlitzData(live_blitzData);
      } catch (err) {
        console.error("Error fetching: ", err);
      }
    };
    fetchLeaderboard();
  }, []);
  return (
    <>
      <Header />
      <Table blitzData={blitzData} />
      <SidePanel blitzData={blitzData} />
    </>
  );
};

export default App;
