import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import style from "./AdminControls.module.scss";
import { LoginContext } from "../../../context/LoginContext";
import { FaInfo, FaSpa } from "react-icons/fa";
import { GiFootprint, GiNinjaHeroicStance } from 'react-icons/gi'

const AdminControls = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [adminPaths, setAdminPaths] = useState();

  const { loggedIn } = useContext(LoginContext);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (history.location.pathname.indexOf("admin") !== -1) {
      setAdminPaths(
        <>
          <li>
            <Link
              to="/admin/treatments"
              title="Edit Treatments"
              className={style.adminCategory}
            >
              <FaSpa />
            </Link>
          </li>
          <li>
            <Link
              to="/admin/about"
              title="Edit About Section"
              className={style.adminCategory}
            >
              <FaInfo />
            </Link>
          </li>
          <li>
            <Link
              to="/admin/hero"
              title="Edit Hero"
              className={style.adminCategory}
            >
              <GiNinjaHeroicStance />
            </Link>
          </li>
          <li>
            <Link
              to="/admin/footer"
              title="Edit Footer"
              className={style.adminCategory}
            >
              <GiFootprint />
            </Link>
          </li>
        </>
      );
    } else {
      setAdminPaths(
        <li>
          <Link to="/admin/treatments" title="Go to Admin Section">
            <AiOutlineDashboard />
          </Link>
        </li>
      );
    }
  }, [location]);

  useEffect(() => {
    loggedIn && loggedIn[0] === true ? setShowPanel(true) : setShowPanel(false);
  }, [loggedIn]);

  return (
    <nav
      className={style.controls}
      style={{ display: showPanel ? "block" : "none" }}
    >
      <ul>
        <li>
          <Link to="/" title="Go to Home">
            <AiOutlineHome />
          </Link>
        </li>
        {adminPaths}
        <li>
          <Link to="/logout" title="Log out">
            <FiLogOut />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminControls;
