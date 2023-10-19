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
      <div className="d-flex">
        <div className="d-flex flex-column align-items-center cardContainer">
          <SidePanel blitzData={blitzData} />
        </div>

        <Table blitzData={blitzData} />
      </div>
    </>
  );
};

export default App;
