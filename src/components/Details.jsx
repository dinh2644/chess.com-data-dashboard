import { useParams, useNavigate } from "react-router-dom";
import "../assets/Details.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Details = ({ blitzData }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const top50PlayerUsernames = blitzData.map((player) => player.username);

  useEffect(() => {
    if (top50PlayerUsernames.length > 0) {
      if (!top50PlayerUsernames.includes(params.username)) {
        navigate("/404");
      } else {
        const fetchProfileData = async () => {
          try {
            let response = await axios.get(
              "https://api.chess.com/pub/player/" + params.username
            );

            let countryLink = response.data.country;
            let countryCode = countryLink.split("/").pop();
            let countryResponse = await axios.get(
              `https://api.chess.com/pub/country/${countryCode}`
            );
            let countryData = countryResponse.data;
            const playerData = {
              ...response.data,
              country: countryData.name,
            };

            setProfileData(playerData);
          } catch (error) {
            console.error(error);
          }
        };
        fetchProfileData();
      }
    }
  }, [params.username, top50PlayerUsernames]);

  const convertUnixTimestampToDateString = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString();
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4 mb-sm-5">
              <div className="card card-style1 border-0">
                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                  <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0 d-flex justify-content-center">
                      <div className="box">
                        <div className="box-inner">
                          <img src={profileData.avatar} alt="..." />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 px-xl-10">
                      <div className="bgColor d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                        <h3 className="h2 mb-0">{profileData.name}</h3>
                        <span
                          className="text-primary"
                          style={{ fontWeight: "600" }}
                        >
                          {profileData.title}
                        </span>
                        <span className="text-primary mx-3">
                          <a
                            style={{
                              textDecoration: "none",
                              color: "#BF40BF",
                              fontWeight: "600",
                            }}
                            href={profileData.twitch_url}
                          >
                            {profileData.twitch_url}
                          </a>
                        </span>
                      </div>
                      <ul className="list-unstyled mb-1-9">
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Country:
                          </span>{" "}
                          {profileData.country}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Followers:
                          </span>{" "}
                          {profileData.followers &&
                            profileData.followers.toLocaleString()}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Joined:
                          </span>{" "}
                          {convertUnixTimestampToDateString(profileData.joined)}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            League:
                          </span>{" "}
                          {profileData.league}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Last online:
                          </span>{" "}
                          {convertUnixTimestampToDateString(
                            profileData.last_online
                          )}
                        </li>
                        <li className="display-28 mt-4">
                          <button className="btn btn-danger display-26 me-2 font-weight-500">
                            <a
                              style={{ textDecoration: "none", color: "white" }}
                              href={profileData.url}
                            >
                              Chess.com Profile
                            </a>
                          </button>{" "}
                        </li>
                      </ul>
                      <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                        <li>
                          <a href="#!">
                            <i className="ti-twitter-alt"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i className="ti-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i className="ti-pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i className="ti-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
