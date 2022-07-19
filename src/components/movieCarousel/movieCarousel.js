import React from "react";
import "./movieCarousel.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CircularProgress from "@mui/material/CircularProgress";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const items = [];

function MovieCarousel({ tvShows, movies, headerTitle }) {
  const [showMovies, setShowMovies] = React.useState(true);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.3,
    },
    smallDesktop: {
      breakpoint: { max: 1300, min: 900 },
      items: 3,
    },

    tablet: {
      breakpoint: { max: 900, min: 464 },
      items: 1.54,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {movies && (
        <section className={`movie_carousel_section`}>
          <div className="movie_carousel_header">
            <h2 className="movie_carousel_h2">{headerTitle} </h2>
            {tvShows && movies && (
              <div className="switch_tab">
                <div
                  onClick={() => setShowMovies(true)}
                  className={
                    showMovies
                      ? "switch_tab_selection trending_active_tab"
                      : "switch_tab_selection"
                  }
                >
                  Movies
                </div>
                <div
                  onClick={() => setShowMovies(false)}
                  className={
                    showMovies
                      ? "switch_tab_selection"
                      : "switch_tab_selection trending_active_tab"
                  }
                >
                  TV Shows
                </div>
              </div>
            )}
          </div>

          {showMovies && (
            <Carousel responsive={responsive}>
              {movies.map((item, index) => (
                <div
                  className="movie_card"
                  key={index}
                  onClick={() =>
                    (window.location.href = `/preview/${item.media_type}/${item.id}`)
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt="movieBanner"
                    className="card_banner_img"
                  />
                  <div className="movie_card_info">
                    <span className="movie_card_info_title">
                      {" "}
                      {item.title ? item.title : item.original_name}
                    </span>
                    <span className="movie_card_info_date">
                      {item.release_date
                        ? item.release_date
                        : item.first_air_date}
                    </span>
                    <div className="vote_percentage">
                      <CircularProgressbar
                        background
                        duration={1.4}
                        value={(item.vote_average * 10).toFixed(0)}
                        text={`${(item.vote_average * 10).toFixed(0)}%`}
                        styles={buildStyles({
                          pathColor: `rgba(62, 152, 199, ${
                            item.vote_average / 10
                          })`,
                          pathTransitionDuration: 2,
                          textColor: "white",
                          textSize: "22px",
                          backgroundColor: "#333",
                          trailColor: "#005100",
                          pathColor: "#39FF14",
                          width: "10px",
                        })}
                      />
                    </div>
                    <i className="fas fa-bookmark fa-2x" />
                  </div>
                </div>
              ))}
            </Carousel>
          )}
          {!showMovies && (
            <Carousel responsive={responsive} arr>
              {tvShows.map((item, index) => (
                <div
                  className="movie_card"
                  key={index}
                  onClick={() =>
                    (window.location.href = `/preview/${item.media_type}/${item.id}`)
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt="movieBanner"
                    className="card_banner_img"
                  />
                  <div className="movie_card_info">
                    <span className="movie_card_info_title">
                      {" "}
                      {item.title ? item.title : item.original_name}
                    </span>
                    <span className="movie_card_info_date">
                      {item.release_date
                        ? item.release_date
                        : item.first_air_date}
                    </span>
                    <div className="vote_percentage">
                      <CircularProgressbar
                        background
                        duration={1.4}
                        value={(item.vote_average * 10).toFixed(0)}
                        text={`${(item.vote_average * 10).toFixed(0)}%`}
                        styles={buildStyles({
                          pathColor: `rgba(62, 152, 199, ${
                            item.vote_average / 10
                          })`,
                          pathTransitionDuration: 2,
                          textColor: "white",
                          textSize: "22px",
                          backgroundColor: "#333",
                          trailColor: "#005100",
                          pathColor: "#39FF14",
                          width: "10px",
                        })}
                      />
                    </div>
                    <i className="fas fa-bookmark fa-2x" />
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </section>
      )}
    </>
  );
}

export default MovieCarousel;
