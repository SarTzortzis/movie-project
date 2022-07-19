import React, { useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";

import "./previewPage.css";
import axios from "axios";
import LanguageContext from "../../../contexts/language";
import PreviewContainer from "../../previewContainer/previewContainer";
import MovieCarousel from "../../movieCarousel/movieCarousel";
import ReviewContainer from "../../reviewContainer/reviewContainer";
import CastContainer from "../../castContainer/castContainer";

function PreviewPage() {
  const { mediaType } = useParams();
  const { itemId } = useParams();
  console.log(itemId);

  const [itemInfo, setItemInfo] = React.useState(null);
  const { userLanguage, setUserLanguage } = useContext(LanguageContext);

  const [similarMovies, setSimilarMovies] = React.useState([{}]);
  const [reviews, setReviews] = React.useState([{}]);
  const [cast, setCast] = React.useState([{}]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${itemId}?api_key=79aec70e22d87a0e78a99bea670485eb&language=en-US&language=${userLanguage}`
      )
      .then((res) => {
        setItemInfo(res.data);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${itemId}/similar?api_key=79aec70e22d87a0e78a99bea670485eb`
      )
      .then((res) => {
        let results = res.data.results;
        results.map((item) => {
          item.media_type = "movie";
        });
        setSimilarMovies(results);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${itemId}/reviews?api_key=79aec70e22d87a0e78a99bea670485eb`
      )
      .then((res) => {
        setReviews(res.data.results);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${itemId}/credits?api_key=79aec70e22d87a0e78a99bea670485eb`
      )
      .then((res) => {
        setCast(res.data.cast.slice(0, 10));
      });
  }, []);
  return (
    <>
      {mediaType === "movie" && (
        <main className="preview_page_main">
          {itemInfo && mediaType === "movie" && (
            <PreviewContainer movie={itemInfo} />
          )}

          {cast && <CastContainer castList={cast} />}
          {reviews && <ReviewContainer reviews={reviews} />}
          {similarMovies && (
            <MovieCarousel
              movies={similarMovies}
              headerTitle={"Similar movies"}
            />
          )}
        </main>
      )}
      {mediaType === "tv" && (
        <main className="preview_page_main">
          {itemInfo && mediaType === "tv" && (
            <PreviewContainer tvShow={itemInfo} />
          )}
        </main>
      )}
    </>
  );
}

export default PreviewPage;
