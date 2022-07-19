import React, { useMemo, Context, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import "./App.css";
/************************ IMPORT CONTEXTS ***************************/
import LanguageContext from "./contexts/language";
import LoggedContext from "./contexts/isLogged";
/*******************************************************************/

/************************ IMPORT SCRIPTS ***************************/
import ScrollToTop from "./ScrollToTop";
/*******************************************************************/

/************************ IMPORT COMPONENTS/Pages ***************************/
import Login from "./components/pages/loginPage/loginPage";
import Navbar from "./components/navbar/navbar.js";
import HomePage from "./components/pages/homePage/homePage";
import PreviewPage from "./components/pages/previewPage/previewPage";
/****************************************************************************/

function App() {
  const [userLanguage, setUserLanguage] = React.useState("el");
  let providerLanguage = useMemo(
    () => ({ userLanguage, setUserLanguage }),
    [userLanguage, setUserLanguage]
  );

  const [isLogged, setIsLogged] = React.useState(LoggedContext);
  let providerLogged = useMemo(
    () => ({ isLogged, setIsLogged }),
    [isLogged, setIsLogged]
  );

  if (isLogged === false || sessionStorage.getItem("token") == null) {
    return (
      <LoggedContext.Provider value={providerLogged}>
        <Router>
          <Routes>
            <Route exact path="*" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </LoggedContext.Provider>
    );
  } else if (isLogged && sessionStorage.getItem("token")) {
    return (
      <LanguageContext.Provider value={providerLanguage}>
        <LoggedContext.Provider value={providerLogged}>
          <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route path="/" element={<HomePage />} />

              <Route
                exact
                path="/preview/:mediaType/:itemId"
                element={<PreviewPage />}
              />
            </Routes>
          </Router>
        </LoggedContext.Provider>
      </LanguageContext.Provider>
    );
  }
}

export default App;
