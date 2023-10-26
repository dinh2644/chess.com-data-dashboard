import React, { useState, useRef, useEffect } from "react";
import "../assets/Table.css";
import { Link } from "react-router-dom";
import UpArrow from "../assets/uparrow.png";
import DownArrow from "../assets/downarrow.png";
import BarChartComponent from "../components/BarChartComponent";
import Brilliant from "../assets/brilliant.png";
import Blunder from "../assets/blunder.png";
import Good from "../assets/good.png";
import Excellent from "../assets/excellent.png";
import Mistake from "../assets/mistake.png";
import Best from "../assets/best.png";

const Table = ({ blitzData }) => {
  const searchInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedWinsRange, setSelectedWinsRange] = useState("");
  const [selectedLossesRange, setSelectedLossesRange] = useState("");

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(blitzData.length / itemsPerPage);

  // Slice the data for the current page
  const slicedData = blitzData.slice(startIndex, endIndex);

  // Filter the sliced data by search input
  const filteredData = slicedData
    .filter((data) => {
      return (
        search.toLowerCase() === "" ||
        (data.name && data.name.toLowerCase().includes(search.toLowerCase()))
      );
    })
    //Filter sliced data by win count
    .filter((data) => {
      if (selectedWinsRange) {
        const [min, max] = selectedWinsRange.split("-");
        const winCount = data.win_count;
        //console.log("Min:", min, "Max:", max);
        if (min >= 10000) {
          return winCount >= min;
        } else {
          return winCount >= min && winCount <= max;
        }
      }
      return true;
    })
    //Filter sliced data by loss count
    .filter((data) => {
      if (selectedLossesRange) {
        const [min, max] = selectedLossesRange.split("-");
        const lossCount = data.loss_count;
        if (min >= 10000) {
          return lossCount >= min;
        } else {
          return lossCount >= min && lossCount <= max;
        }
      }
      return true;
    });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getRatioColorClass = (ratio) => {
    const ratioValue = parseFloat(ratio);
    if (ratioValue < 1) {
      return "blunder";
    } else if (ratioValue >= 1 && ratioValue < 2) {
      return "mistake";
    } else if (ratioValue >= 2 && ratioValue < 3) {
      return "good";
    } else if (ratioValue >= 3 && ratioValue < 4) {
      return "excellent";
    } else if (ratioValue >= 4 && ratioValue < 5) {
      return "best";
    } else if (ratioValue >= 5) {
      return "brilliant";
    }

    return "";
  };

  const handleTitle = (ratio) => {
    const ratioValue = parseFloat(ratio);
    if (ratioValue < 1) {
      return "Bruh";
    } else if (ratioValue >= 1 && ratioValue < 2) {
      return "Can do better";
    } else if (ratioValue >= 2 && ratioValue < 3) {
      return "Solid";
    } else if (ratioValue >= 3 && ratioValue < 4) {
      return "Wow!";
    } else if (ratioValue >= 4 && ratioValue < 5) {
      return "Amazing!";
    } else if (ratioValue >= 5) {
      return "Brilliant!";
    }

    return "";
  };

  return (
    <>
      <div className="container tableContainer">
        <div className="row filterInput mb-2">
          <div className="col-xl-8">
            {/* Searchbar */}
            <div className="form searchBar">
              <i className="fa fa-search"></i>
              <input
                ref={searchInputRef}
                type="text"
                className="form-control form-input"
                placeholder="Search players..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-xl-4 filterDropdowns">
            {/* Wins drop down */}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setSelectedWinsRange(e.target.value)}
            >
              <option value="">Filter by wins</option>
              <option value="1-499">1-499 wins</option>
              <option value="500-999">500-999 wins</option>
              <option value="1000-4999">1000-4999 wins</option>
              <option value="5000-9999">5000-9999 wins</option>
              <option value="10000">10000+ wins</option>
            </select>
            {/* Losses drop down */}
            <select
              className="form-select lossDropDown"
              aria-label="Default select example"
              onChange={(e) => setSelectedLossesRange(e.target.value)}
            >
              <option value="">Filter by losses</option>
              <option value="1-499">1-499 losses</option>
              <option value="500-999">500-999 losses</option>
              <option value="1000-4999">1000-4999 losses</option>
              <option value="5000-9999">5000-9999 losses</option>
              <option value="10000">10000+ losses</option>
            </select>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Country</th>
                <th>Title</th>
                <th>Win Count</th>
                <th>Loss Count</th>
                <th>Elo</th>
                <th>W/L ratio</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td className="rankCSS">{data.rank}</td>
                  <td className="nameCol">
                    <Link className="chessURL" to={`/${data.username}`}>
                      <img className="avatar" src={data.avatar} alt="" />
                      {data.name} 🔗
                    </Link>
                  </td>
                  <td>{data.country.slice(-2)}</td>
                  <td>{data.title}</td>
                  <td>{String(data.win_count)}</td>
                  <td>{String(data.loss_count)}</td>
                  <td>{String(data.score)}</td>
                  <td
                    className={getRatioColorClass(
                      (data.win_count / data.loss_count).toFixed(2)
                    )}
                    title={handleTitle(
                      (data.win_count / data.loss_count).toFixed(2)
                    )}
                  >
                    {(data.win_count / data.loss_count).toFixed(2)}
                    {getRatioColorClass(
                      (data.win_count / data.loss_count).toFixed(2)
                    ) === "brilliant" ? (
                      <img className="ratioImg" src={Brilliant} alt="" />
                    ) : getRatioColorClass(
                        (data.win_count / data.loss_count).toFixed(2)
                      ) === "best" ? (
                      <img className="ratioImg" src={Best} alt="" />
                    ) : getRatioColorClass(
                        (data.win_count / data.loss_count).toFixed(2)
                      ) === "excellent" ? (
                      <img className="ratioImg" src={Excellent} alt="" />
                    ) : getRatioColorClass(
                        (data.win_count / data.loss_count).toFixed(2)
                      ) === "good" ? (
                      <img className="ratioImg" src={Good} alt="" />
                    ) : getRatioColorClass(
                        (data.win_count / data.loss_count).toFixed(2)
                      ) === "mistake" ? (
                      <img className="ratioImg" src={Mistake} alt="" />
                    ) : getRatioColorClass(
                        (data.win_count / data.loss_count).toFixed(2)
                      ) === "blunder" ? (
                      <img className="ratioImg" src={Blunder} alt="" />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row paginationRow mt-2">
          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="mx-1"
            >
              Previous
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="mx-1"
            >
              Next
            </button>
          </div>
        </div>
        <div className="mt-5">
          {filteredData.length > 1 && (
            <BarChartComponent playerData={filteredData} />
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
