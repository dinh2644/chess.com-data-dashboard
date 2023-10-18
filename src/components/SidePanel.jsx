import React, { useState, useEffect } from "react";
import "../assets/SidePanel.css";

const SidePanel = ({ blitzData }) => {
  const [commonCountry, setCommonCountry] = useState([]);
  const [avgElo, setAvgElo] = useState([]);
  const [mostWins, setMostWins] = useState([]);
  const [mostLosses, setMostLosses] = useState([]);

  useEffect(() => {
    //get common country
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

    // get average elo
    let avgEloResult = 0;

    for (let i = 0; i < blitzData.length; i++) {
      avgEloResult += blitzData[i].score;
    }
    avgEloResult = avgEloResult / blitzData.length;
    setAvgElo(avgEloResult);

    // get player w/ most Ws
    let maxWinCount = 0;
    let playerName = "";

    for (let i = 0; i < blitzData.length; i++) {
      if (blitzData[i].win_count > maxWinCount) {
        maxWinCount = blitzData[i].win_count;
        playerName = blitzData[i].name;
      }
    }
    setMostWins({ win_count: maxWinCount, player: playerName });

    // get player w/ most Ls
    let maxLossCount = 0;
    let playerName1 = "";

    for (let i = 0; i < blitzData.length; i++) {
      if (blitzData[i].loss_count > maxLossCount) {
        maxLossCount = blitzData[i].loss_count;
        playerName1 = blitzData[i].name;
      }
    }
    setMostLosses({ loss_count: maxLossCount, player: playerName1 });
  }, [blitzData]);

  return (
    <>
      <div className="card">
        <div className="commonCountry-panel">
          <div className="card-header">Most common country</div>
          <div className="card-body">{commonCountry}</div>
        </div>
      </div>

      <div className="card">
        <div className="avgElo-panel">
          <div className="card-header">Average ELO</div>
          <div className="card-body">{String(avgElo)}</div>
        </div>
      </div>

      <div className="card">
        <div className="mostWins-panel">
          <div className="card-header">Most wins</div>
          <div className="card-body">
            {String(mostWins.win_count)} <br />
            by {mostWins.player}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="mostLosses-panel">
          <div className="card-header">Most losses</div>
          <div className="card-body">
            {mostLosses.loss_count} <br />
            by {mostLosses.player}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
