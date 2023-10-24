import React from "react";
import Table from "../components/Table";
import SidePanel from "../components/SidePanel";
import "../assets/MainPage.css";
import Chart from "../components/Chart";

const MainPage = ({ blitzData }) => {
  return (
    <>
      <div className="container">
        <div className="row tableRow">
          <div className="col d-flex custom-left-align">
            <div className="d-flex flex-column align-items-center cardContainer">
              <SidePanel blitzData={blitzData} />
            </div>
            <Table blitzData={blitzData} />
            <div className="chartContainer">
              <Chart blitzData={blitzData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
