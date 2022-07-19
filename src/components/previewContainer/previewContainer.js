import React, { useEffect } from "react";
import axios from "axios";
import "./previewContainer.css";
import { useParams, NavLink } from "react-router-dom";
import YoutubeContainer from "../youtubeContainer/youtubeContainer";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function PreviewContainer({ movie, tvShow }) {
  const [season, setSeason] = React.useState(0);
  const { itemId } = useParams();
  let rhours;
  if (movie) {
    const hours = movie.runtime / 60;
    rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
  }

  const [video, setVideo] = React.useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${itemId}/videos?api_key=79aec70e22d87a0e78a99bea670485eb&language=en-US`
      )
      .then((res) => {
        let helper = {};
        res.data.results.map((item) => {
          if (item.type == "Trailer") {
            console.log("found");
            helper = item;
          }
          console.log(item);
        });

        setVideo(helper);
        console.log(res.data.results);
      });
  }, []);

  return (
    <>
      {tvShow && (
        <section
          className="preview_container"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${tvShow.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.7)",
          }}
        >
          <section className="preview_image_section">
            {tvShow.seasons[0].poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${tvShow.seasons[season].poster_path}`}
                alt="movieBanner"
                className="preview_image"
              />
            )}
            {!tvShow.seasons[0].poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                alt="movieBanner"
                className="preview_image"
              />
            )}
          </section>
          <section className="preview_info_section">
            <div className="preview_header">
              <div className="preview_header_left">
                <h2 className="movie_carousel_h2">
                  {tvShow.original_name}{" "}
                  <span className="preview_release">
                    ({tvShow.first_air_date.substring(0, 4)}-
                    {tvShow.last_air_date.substring(0, 4)})
                  </span>
                </h2>
                <div className="preview_genres">
                  {tvShow.genres.map((itemG) => (
                    <div className="preview_genre_item">{itemG.name}</div>
                  ))}
                </div>
              </div>
              <div className="preview_header_right">
                <div className="preview_score">
                  <CircularProgressbar
                    background
                    duration={1.4}
                    value={(tvShow.vote_average * 10).toFixed(0)}
                    text={`${(tvShow.vote_average * 10).toFixed(0)}%`}
                    styles={buildStyles({
                      pathColor: `rgba(62, 152, 199, ${
                        tvShow.vote_average / 10
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
              </div>
            </div>
            <div className="preview_switch_tab">
              {tvShow.seasons.map((item, index) => (
                <div
                  className={
                    season === index
                      ? "preview_tab_selection preview_tab_selection_active"
                      : "preview_tab_selection"
                  }
                  onClick={() => setSeason(index)}
                >
                  {item.name}
                </div>
              ))}
            </div>

            {tvShow.seasons[season].overview && (
              <p className="preview_info_desc">
                {tvShow.seasons[season].overview}
              </p>
            )}
            {!tvShow.seasons[season].overview && (
              <p className="preview_info_desc">{tvShow.overview}</p>
            )}

            <div className="preview_more_info">
              <div className="preview_label">Homepage </div>
              <a className={"preview_homepage_navlink"} href={tvShow.homepage}>
                {tvShow.homepage}
              </a>
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Type </div>
              {tvShow.type}
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Year </div>
              {tvShow.seasons[season].air_date.substring(0, 4)}
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Number of episodes </div>
              {tvShow.seasons[season].episode_count}
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Production companies </div>
              {tvShow.production_companies.map((itemG) => (
                <div className="preview_production_companies">
                  {itemG.name}{" "}
                </div>
              ))}
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Status </div>
              {tvShow.status}
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Networks </div>
              {tvShow.networks.map((itemG) => (
                <div className="preview_production_companies">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${itemG.logo_path}`}
                    alt="movieBanner"
                    className="PC_banner"
                    width="60px"
                  />
                </div>
              ))}
            </div>
          </section>
        </section>
      )}
      {movie && movie.belongs_to_collection && (
        <section
          className="preview_container"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.belongs_to_collection.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.7)",
          }}
        >
          <section className="preview_image_section">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movieBanner"
              className="preview_image"
            />
          </section>
          <section className="preview_info_section">
            <div className="preview_header">
              <div className="preview_header_left">
                <h2 className="movie_carousel_h2">
                  {movie.original_title}{" "}
                  <span className="preview_release">
                    ({movie.release_date.substring(0, 4)})
                  </span>
                </h2>
                <div className="preview_genres">
                  {movie.genres.map((itemG) => (
                    <div className="preview_genre_item">{itemG.name}</div>
                  ))}
                </div>
                <div className="preview_runtime">
                  <i className="far fa-clock preview_clock_icon" />
                  {rhours}h {rminutes}m
                </div>
              </div>
              <div className="preview_header_right">
                <div className="preview_score">
                  <CircularProgressbar
                    background
                    duration={1.4}
                    value={(movie.vote_average * 10).toFixed(0)}
                    text={`${(movie.vote_average * 10).toFixed(0)}%`}
                    styles={buildStyles({
                      pathColor: `rgba(62, 152, 199, ${
                        movie.vote_average / 10
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
              </div>
            </div>

            <p className="preview_info_desc">{movie.overview}</p>
            <div className="preview_more_info">
              <div className="preview_label">Budget </div>
              {(movie.budget / 1000000).toFixed(0)}M
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Revenue </div>
              {(movie.revenue / 1000000).toFixed(0)}M
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Production companies </div>
              {movie.production_companies.map((itemG) => (
                <div className="preview_production_companies">
                  {itemG.name}{" "}
                </div>
              ))}
            </div>
            {video && <YoutubeContainer video={video} />}
          </section>
        </section>
      )}
      {movie && !movie.belongs_to_collection && (
        <section
          className="preview_container"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.75)",
          }}
        >
          <section className="preview_image_section">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movieBanner"
              className="preview_image"
            />
          </section>
          <section className="preview_info_section">
            <div className="preview_header">
              <div className="preview_header_left">
                <h2 className="movie_carousel_h2">
                  {movie.original_title}{" "}
                  <span className="preview_release">
                    ({movie.release_date.substring(0, 4)})
                  </span>
                </h2>
                <div className="preview_genres">
                  {movie.genres.map((itemG) => (
                    <div className="preview_genre_item">{itemG.name}</div>
                  ))}
                </div>
                <div className="preview_runtime">
                  <i className="far fa-clock preview_clock_icon" />
                  {rhours}h {rminutes}m
                </div>
              </div>
              <div className="preview_header_right">
                <div className="preview_score">
                  <CircularProgressbar
                    background
                    duration={1.4}
                    value={(movie.vote_average * 10).toFixed(0)}
                    text={`${(movie.vote_average * 10).toFixed(0)}%`}
                    styles={buildStyles({
                      pathColor: `rgba(62, 152, 199, ${
                        movie.vote_average / 10
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
              </div>
            </div>

            <p className="preview_info_desc">{movie.overview}</p>
            <div className="preview_more_info">
              <div className="preview_label">Budget </div>
              {(movie.budget / 1000000).toFixed(0)}M
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Revenue </div>
              {(movie.revenue / 1000000).toFixed(0)}M
            </div>
            <div className="preview_more_info">
              <div className="preview_label">Production companies </div>
              {movie.production_companies.map((itemG) => (
                <div className="preview_production_companies">
                  {itemG.name}{" "}
                </div>
              ))}
            </div>
            {video && <YoutubeContainer video={video} />}
          </section>
        </section>
      )}
    </>
  );
}

export default PreviewContainer;
