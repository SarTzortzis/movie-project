import React, { useContext, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LanguageContext from "../../contexts/language";
import LoggedContext from "../../contexts/isLogged";
import Greek from "../../assets/icons/greece.png";
import English from "../../assets/icons/united-kingdom.png";
import "./navbar.css";

let options = [
  {
    id: "navbar-01",
    titleEn: "About",
    titleEl: "Ποιοι είμαστε",
    path: "/about",
  },
  {
    id: "navbar-02",
    titleEn: "Contact",
    titleEl: "Επικοινωνία",
    path: "/contact",
  },
  {
    id: "navbar-03",
    titleEn: "Watchlist",
    titleEl: "Λίστα παρακολούθησης",
    path: "/watchlist",
  },
];

function Navbar() {
  const { userLanguage, setUserLanguage } = useContext(LanguageContext);
  const { isLogged, setIsLogged } = useContext(LoggedContext);
  const navigate = useNavigate();

  let changeLanguage = () => {
    if (userLanguage === "en") setUserLanguage("el");
    else setUserLanguage("en");
  };

  let handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <section className="navbar_main">
      <div className="navbar_left">
        <NavLink to="/" className="navlink_logo">
          Logo
        </NavLink>
      </div>
      <div className="navbar_right">
        <div className="navbar_options">
          {options.map((item) => (
            <NavLink to={item.path} className="navbar_item">
              {userLanguage === "el" ? item.titleEl : item.titleEn}
            </NavLink>
          ))}
        </div>
        <div className="navbar_user">
          <button
            onClick={() => handleLogout()}
            className="navbar_item common_btn"
          >
            {userLanguage === "el" ? "Αποσύνδεση" : "Logout"}
          </button>
          {userLanguage === "el" ? (
            <img
              className="language_flag"
              onClick={() => changeLanguage()}
              src={Greek}
              alt="el-EL"
            />
          ) : (
            <img
              className="language_flag"
              onClick={() => changeLanguage()}
              src={English}
              alt="el-EL"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Navbar;
