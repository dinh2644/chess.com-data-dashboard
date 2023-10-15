import React, { useState } from "react";

const Leaderboard = ({ leaderboardData }) => {
  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, leaderboardData.length);

  // Slice the data to display only the players for the current page
  const playersToDisplay = leaderboardData.slice(startIndex, endIndex);

  // Function to handle changing the current page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container">
      <table className="table mb-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Title</th>
            <th scope="col">Country</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {playersToDisplay.map((player, index) => (
            <tr key={player.username}>
              <th scope="row">{startIndex + index + 1}</th>
              <td>{player.name}</td>
              <td>{player.title || "N/A"}</td>
              <td>{player.country || "N/A"}</td>
              <td>{player.score || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="paginationBtn"
          >
            ⬅️
          </button>
          <span className="mx-2 pageNum">Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= leaderboardData.length}
            className="paginationBtn"
          >
            ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
