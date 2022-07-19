import React, { useEffect, useContext } from "react";
import axios from "axios";
import LanguageContext from "../../../contexts/language";
import MovieCarousel from "../../movieCarousel/movieCarousel";
import "./homePage.css";

function HomePage() {
  const [trendingListWeek, setTrendingListWeek] = React.useState([{}]);
  const [trendingListTVWeek, setTrendingListTVWeek] = React.useState([{}]);
  const [upcoming, setUpcoming] = React.useState([{}]);
  const [nowPlaying, setNowPlaying] = React.useState([{}]);
  const [topRated, setTopRated] = React.useState([{}]);
  const { userLanguage, setUserLanguage } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=79aec70e22d87a0e78a99bea670485eb&language=${userLanguage}`
      )
      .then((res) => {
        setTrendingListWeek(res.data.results);
        console.log(res.data.results);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=79aec70e22d87a0e78a99bea670485eb&language=${userLanguage}`
      )
      .then((res) => {
        setTrendingListTVWeek(res.data.results);
        console.log(res.data);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=79aec70e22d87a0e78a99bea670485eb&region=US`
      )
      .then((res) => {
        let results = res.data.results;
        results.map((item) => {
          item.media_type = "movie";
        });
        setUpcoming(results);
        console.log(results);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=79aec70e22d87a0e78a99bea670485eb`
      )
      .then((res) => {
        let results = res.data.results;
        results.map((item) => {
          item.media_type = "movie";
        });
        setNowPlaying(results);
        console.log(results);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=79aec70e22d87a0e78a99bea670485eb`
      )
      .then((res) => {
        let results = res.data.results;
        results.map((item) => {
          item.media_type = "movie";
        });
        setTopRated(results);
        console.log(results);
      });
  }, []);

  return (
    <>
      {topRated && (
        <MovieCarousel movies={topRated} headerTitle={"Top rated movies"} />
      )}
      {nowPlaying && (
        <MovieCarousel movies={nowPlaying} headerTitle={"Now playing"} />
      )}
      {upcoming && (
        <MovieCarousel movies={upcoming} headerTitle={"Upcoming movies"} />
      )}
      {trendingListWeek && trendingListTVWeek && (
        <div>
          <MovieCarousel
            tvShows={trendingListTVWeek}
            movies={trendingListWeek}
            headerTitle={"Trending this week"}
          />
        </div>
      )}
    </>
  );
}

export default HomePage;
