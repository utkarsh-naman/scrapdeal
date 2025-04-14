import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import SellScrapForm from "./components/SellScrapForm";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";

import Login from "./components/login";
import ScrapOptions from "./components/ScrapOptions";
import SellScrap from "./components/SellScrap";
import BuyScrap from "./components/BuyScrap";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = ({ data }) => (
  <>
    <Header data={data.Header} />
    <Features data={data.Features} />
    <About data={data.About} />
    <Services data={data.Services} />
    <Gallery data={data.Gallery} />
    <Testimonials data={data.Testimonials} />
    <Team data={data.Team} />
  </>
);

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" render={() => <Home data={landingPageData} />} />
        <Route path="/login" render={() => <Login mode="signin" />} />
        <Route path="/signup" render={() => <Login mode="signup" />} />
        <Route path="/options" component={ScrapOptions} />
        <Route path="/sell-scrap" component={SellScrap} />
        <Route path="/options" component={ScrapOptions} />
        <Route path="/sell-scrap" component={SellScrapForm} />
        <Route path="/buy-scrap" component={BuyScrap} />
      </Switch>
    </Router>
  );
};

export default App;
