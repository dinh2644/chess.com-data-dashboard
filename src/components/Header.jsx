import React from "react";
import ChessImg from "../assets/chess.png";
import "../assets/Header.css";

const Header = () => {
  return (
    <>
      <nav className="navbar mb-4">
        <div className="container mt-2">
          <img className="ChessImg" src={ChessImg} alt="" />
          <h1 className="LiveBlitzRatingCSS">
            Live<span className="BlitzCSS">Blitz</span>Ratings{" "}
          </h1>
        </div>
      </nav>
      <span className="chessDOTcom">
        Top 50 best&nbsp; <a href="https://www.chess.com/home">Chess.com</a>{" "}
        &nbsp;blitz player in the world 😮
      </span>
    </>
  );
};

export default Header;
