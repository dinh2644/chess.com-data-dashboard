import React, { useState } from "react";
import "../assets/SidePanel.css";

const SidePanel = ({ blitzData }) => {
  const [commonCountry, setCommonCountry] = useState([]);
  const cardList = [
    {
      title: "Most common country",
      output: commonCountry,
    },
    {
      title: "Average ELO",
      output: null,
    },
    {
      title: "Most wins",
      output: null,
    },
    {
      title: "Most losses",
      output: null,
    },
  ];

  return (
    <div>
      {cardList.map((card, index) => (
        <div className="row mb-3" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.output}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidePanel;
