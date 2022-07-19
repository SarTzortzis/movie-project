import React from "react";
import "./castContainer.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CircularProgress from "@mui/material/CircularProgress";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CastContainer({ castList }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5.3,
    },
    smallDesktop: {
      breakpoint: { max: 1300, min: 900 },
      items: 4,
    },

    tablet: {
      breakpoint: { max: 900, min: 464 },
      items: 2.2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.5,
    },
  };
  console.log(castList);
  return (
    <section className="cast_section">
      <div className="movie_carousel_header">
        <h2 className="movie_carousel_h2">Top cast </h2>
      </div>
      <Carousel responsive={responsive} arr>
        {castList.map((person, index) => (
          <div className="cast_card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
              alt="movieBanner"
              className="card_banner_img"
            />
            <div className="movie_card_info">
              <span className="movie_card_info_title">{person.name}</span>
              <span className="movie_card_info_date">{person.character}</span>
              <span className="movie_card_info_date">
                {person.known_for_department}
              </span>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default CastContainer;
