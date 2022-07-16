import React, { useMemo } from "react";
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
import Navbar from "./components/navbar/navbar";
import HomePage from "./components/pages/homePage/homePage";
/*******************************************************************/
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
