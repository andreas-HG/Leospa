import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const history = useHistory()

  useEffect(() => {
    history.action === "PUSH" && window.scrollTo(0, 0)
  }, [location]);

  return null;
};

export default ScrollToTop;
