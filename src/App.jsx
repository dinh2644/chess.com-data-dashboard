import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./pages/MainPage";
import PageNotFound from "./components/PageNotFound";
import Details from "./components/Details";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

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
        //console.log(blitzData);
      } catch (err) {
        console.error("Error fetching: ", err);
      }
    };
    fetchLeaderboard();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Outlet />
              </>
            }
          >
            <Route index={true} element={<MainPage blitzData={blitzData} />} />
            <Route
              path="/:username"
              element={<Details blitzData={blitzData} />}
            />
          </Route>
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
