import React from "react";
import ChessImg from "../assets/chess.png";
import "../assets/Header.css";

const Header = () => {
  return (
    <>
      <nav className="navbar mb-5">
        <div className="container mt-2">
          <img className="ChessImg" src={ChessImg} alt="" />
          <h1 className="LiveBlitzRatingCSS">
            Live<span className="BlitzCSS">Blitz</span>Rating 🔴
          </h1>
        </div>
      </nav>
    </>
  );
};

export default Header;
