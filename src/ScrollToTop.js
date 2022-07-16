import { useEffect } from "react";
import { useLocation } from "react-router";

/************************* THIS FUNCTION IS USED TO SCROLL ON THE TOP OF THE PAGE AUTOMATICALLY WHENEVER USER GOES TO A NEW PAGE *********************************/

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
