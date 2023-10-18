import React, { useState } from "react";
import "../assets/Table.css";

const Table = ({ blitzData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = blitzData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(blitzData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="container tableContainer">
        <div className="row">
          <div className="col">
            {/*Searchbar*/}
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
          {/*Wins drop down*/}
          <div className="col">
            <select className="form-select" aria-label="Default select example">
              <option selected>Filter by wins</option>
              <option value="1">100-499 wins</option>
              <option value="2">500-999 wins</option>
              <option value="3">1000-4999 wins</option>
              <option value="4">5000-9999 wins</option>
              <option value="5">10000+ wins</option>
            </select>
          </div>
          <div className="col">
            <select className="form-select" aria-label="Default select example">
              <option selected>Filter by losses</option>
              <option value="1">100-499 losses</option>
              <option value="2">500-999 losses</option>
              <option value="3">1000-4999 losses</option>
              <option value="4">5000-9999 losses</option>
              <option value="5">10000+ losses</option>
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
              {currentData
                .filter((data) => {
                  return search.toLowerCase() === ""
                    ? data
                    : data.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((data, index) => (
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
          {/*Pagination*/}
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
