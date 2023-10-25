import React from "react";
import ChessImg from "../assets/chess.png";
import "../assets/Header.css";
import { Link } from "react-router-dom";

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

      <span className="col d-flex justify-content-center homeSearchCSS">
        <Link className="HomeSearch" to="/">
          Home 🏠
        </Link>{" "}
        &nbsp;|&nbsp;{" "}
        <Link
          className="HomeSearch"
          to="/"
          onClick={() => {
            if (searchInputRef.current) {
              searchInputRef.current.focus();
            }
          }}
        >
          Search 🔎
        </Link>
        &nbsp;|&nbsp;{" "}
        <a className="HomeSearch" href="#barchart">
          BarChart 📊
        </a>
      </span>
    </>
  );
};

export default Header;
