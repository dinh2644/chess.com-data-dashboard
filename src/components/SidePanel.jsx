import React, { useState, useEffect } from "react";
import "../assets/SidePanel.css";

const SidePanel = ({ blitzData }) => {
  const [commonCountry, setCommonCountry] = useState([]);
  const [avgElo, setAvgElo] = useState([]);
  const [mostWins, setMostWins] = useState([]);
  const [mostLosses, setMostLosses] = useState([]);

  useEffect(() => {
    //get most frequent country
    const commonCountry = {};
    let maxElement = blitzData[0];
    let maxCount = 1;
    for (let i = 0; i < blitzData.length; i++) {
      const element = String(blitzData[i].country.slice(-2));
      if (commonCountry[element]) {
        commonCountry[element]++;
      } else {
        commonCountry[element] = 1;
      }
      if (commonCountry[element] > maxCount) {
        maxElement = element;
        maxCount = commonCountry[element];
      }
    }
    setCommonCountry(maxElement);

    // Get average elo
    let avgEloResult = 0;

    for (let i = 0; i < blitzData.length; i++) {
      avgEloResult += blitzData[i].score;
    }
    avgEloResult = avgEloResult / blitzData.length;
    setAvgElo(avgEloResult);

    // Get player w/ most Ws
    let maxWinCount = 0;
    let playerName = "";
    let playerAccount = "";

    for (let i = 0; i < blitzData.length; i++) {
      if (blitzData[i].win_count > maxWinCount) {
        maxWinCount = blitzData[i].win_count;
        playerName = blitzData[i].name;
        playerAccount = blitzData[i].url;
      }
    }
    setMostWins({
      win_count: maxWinCount,
      player: playerName,
      account: playerAccount,
    });

    // Get player w/ most Ls
    let maxLossCount = 0;
    let playerName1 = "";
    let playerAccount1 = "";

    for (let i = 0; i < blitzData.length; i++) {
      if (blitzData[i].loss_count > maxLossCount) {
        maxLossCount = blitzData[i].loss_count;
        playerName1 = blitzData[i].name;
        playerAccount1 = blitzData[i].url;
      }
    }
    setMostLosses({
      loss_count: maxLossCount,
      player: playerName1,
      account: playerAccount1,
    });
  }, [blitzData]);

  return (
    <>
      <div className="card">
        <div className="commonCountry-panel">
          <div className="card-header">Top country 🗺️</div>
          <div className="card-body">{commonCountry}</div>
        </div>
      </div>

      <div className="card">
        <div className="avgElo-panel">
          <div className="card-header">Average ELO 🏆</div>
          <div className="card-body">{String(avgElo)}</div>
        </div>
      </div>

      <div className="card">
        <div className="mostWins-panel">
          <div className="card-header">Most wins 🔥</div>
          <div className="card-body">
            {String(mostWins.win_count)} <br />
            by{" "}
            <a className="playerLink" href={mostWins.account}>
              {mostWins.player}
            </a>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="mostLosses-panel">
          <div className="card-header">Most losses 🗑️</div>
          <div className="card-body">
            {String(mostLosses.loss_count)} <br />
            by{" "}
            <a className="playerLink" href={mostLosses.account}>
              {mostLosses.player}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
