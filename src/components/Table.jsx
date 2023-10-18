import React, { useState } from "react";
import "../assets/Table.css";

const Table = ({ blitzData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedWinsRange, setSelectedWinsRange] = useState("");
  const [selectedLossesRange, setSelectedLossesRange] = useState("");

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = blitzData
    .filter((data) => {
      // Filter by search input
      return (
        search.toLowerCase() === "" ||
        (data.name && data.name.toLowerCase().includes(search.toLowerCase()))
      );
    })
    .filter((data) => {
      // Filter by wins range
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
    .filter((data) => {
      // Filter by losses range
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

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="container tableContainer">
        <div className="row">
          <div className="col">
            {/* Searchbar */}
            <div className="form searchBar ">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control form-input"
                placeholder="Search players..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
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
          </div>
          <div className="col">
            {/* Losses drop down */}
            <select
              className="form-select"
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
        </div>
        <div className="row">
          <table className="table">
            <thead style={{ color: "white" }}>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Country</th>
                <th>Title</th>
                <th>Win Count</th>
                <th>Loss Count</th>
                <th>Elo</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(startIndex, endIndex).map((data, index) => (
                <tr key={index}>
                  <td>
                    <a className="chessURL" href={data.url}>
                      {data.rank}
                    </a>
                  </td>
                  <td className="nameCol">
                    <img className="avatar" src={data.avatar} alt="" />
                    {data.name}
                  </td>
                  <td>{data.country.slice(-2)}</td>
                  <td>{data.title}</td>
                  <td>{String(data.win_count)}</td>
                  <td>{String(data.loss_count)}</td>
                  <td>{String(data.score)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row paginationRow">
          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
