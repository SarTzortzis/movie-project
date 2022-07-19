import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./loginContainer.css";
import axios from "axios";
import LoggedContext from "../../contexts/isLogged";
import Carousel from "react-material-ui-carousel";

function LoginContainer() {
  let navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(LoggedContext);
  const [images, setImage] = React.useState([]);

  async function handleSubmit(event) {
    sessionStorage.setItem("token", "thisIsAToken");
    event.preventDefault();
    setIsLogged(true);
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=79aec70e22d87a0e78a99bea670485eb`
      )
      .then((res) => {
        let posters = [];
        res.data.results.map((item) => {
          posters.push(item.poster_path);
        });
        setImage(posters);
        console.log(posters);
      });
  }, []);

  return (
    <section className="login_section">
      <section className="login_carousel">
        <Carousel
          indicators={false}
          navButtonsAlwaysInvisible={true}
          fullHeightHover={true}
        >
          {images.map((item, i) => (
            <div
              className="login_img"
              style={{
                backgroundImage: `linear-gradient(240deg, rgba(0, 204, 0, 0.5) 
                ,rgba(0, 179, 179, 0.6)
                ),url(https://image.tmdb.org/t/p/w500/${item})`,
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
        </Carousel>
      </section>

      <form onSubmit={handleSubmit} className="loginForm">
        <h1 className="login_h1">Login</h1>
        <label className="login_label">
          <i className="far fa-user-circle" />
          <input
            type={"text"}
            required
            defaultValue={"Test_user"}
            className="login_input"
          />
        </label>
        <label className="login_label">
          <i className="fas fa-lock" />
          <input
            type={"password"}
            required
            defaultValue={"test_user_pass"}
            className="login_input"
          />
        </label>

        <input type={"submit"} value="Submit" className="login_submit" />
        <h3 className="login_h3">Or login using:</h3>
        <div className="login_icons">
          <i className="fab fa-google fa-2x login_icon_item" />
          <i className="fab fa-facebook  fa-2x login_icon_item" />
          <i class="fab fa-imdb  fa-2x login_icon_item" />
        </div>
      </form>
    </section>
  );
}

export default LoginContainer;
