import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminControls from "./components/layout/adminControls/AdminControls";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import LogOut from "./components/layout/LogOut";
import { LoginContext } from "./context/LoginContext";

import "./global.scss";
import TreatmentsAdmin from "./pages/admin/layout/TreatmentsAdmin";
import LoginCheck from "./pages/admin/LoginCheck";
import Events from "./pages/events/Events";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Treatments from "./pages/treatments/Treatments";
import ScrollToTop from "./components/layout/ScrollToTop";
import AboutAdmin from "./pages/admin/layout/AboutAdmin";
import HeroAdmin from "./pages/admin/layout/HeroAdmin";
import FooterAdmin from "./pages/admin/layout/FooterAdmin";
import NewsLetter from "./components/layout/newsletter/NewsLetter";

const App = () => {
  const { loggedIn } = useContext(LoginContext);

  const [newsletter, setNewsletter] = useState(false)

  // useEffect(() => {
  //   console.log({ loggedIn });
  // }, [loggedIn]);

  let newsLetterTimeout

  useEffect(() => {
    newsLetterTimeout = setTimeout(() => {
      setNewsletter(true)
    }, 20000)
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <AdminControls />
      <NewsLetter newsletter={newsletter} setNewsletter={setNewsletter} />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/treatments" component={Treatments} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={LogOut} />

        <Route  path="/admin">
          {/* <Route exact path="/admin" component={LoginCheck} /> */}
          <LoginCheck>
          <Route exact path="/admin/treatments" component={TreatmentsAdmin} />
          <Route exact path="/admin/about" component={AboutAdmin} />
          <Route exact path="/admin/hero" component={HeroAdmin} />
          <Route exact path="/admin/footer" component={FooterAdmin} />
          </LoginCheck>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
