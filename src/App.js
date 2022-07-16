import React, { useMemo, Context } from "react";
import LanguageContext from "./contexts/language";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import "./App.css";
/************************ IMPORT SCRIPTS ***************************/
import ScrollToTop from "./ScrollToTop";
/*******************************************************************/
/************************ IMPORT COMPONENTS ***************************/
import Navbar from "./components/navbar/navbar.js";
import HomePage from "./components/pages/homePage/homePage";
/*******************************************************************/
function App() {
  const [userLanguage, setUserLanguage] = React.useState("el");
  let providerLanguage = useMemo(
    () => ({ userLanguage, setUserLanguage }),
    [userLanguage, setUserLanguage]
  );
  return (
    <LanguageContext.Provider value={providerLanguage}>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
