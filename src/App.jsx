import React, { useState, useEffect } from "react";
import axios from "axios";
import Leaderboard from "./components/Leaderboard";
import Header from "./components/Header";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("https://api.chess.com/pub/leaderboards/");
      const liveBlitzData = response.data["live_blitz"];
      setLeaderboardData(liveBlitzData);
    };
    fetchData();
    console.log(leaderboardData);
  }, []);

  return (
    <>
      <Header />
      <Leaderboard leaderboardData={leaderboardData} />
      <footer className="footer mt-5 mb-5">&#169;Chess.com</footer>
    </>
  );
};

export default App;
