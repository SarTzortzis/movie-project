import React, { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import LanguageContext from "../../contexts/language";
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
  console.log(userLanguage);

  return (
    <section className="navbar_main">
      <div className="navbar_left" onClick={() => setUserLanguage("en")}>
        Logo
      </div>
      <div className="navbar_right">
        <div className="navbar_options">{}</div>
        <div className="navbar_user"></div>
      </div>
    </section>
  );
}

export default Navbar;
