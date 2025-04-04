import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";

import Login from "./components/login";

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
      </Switch>
    </Router>
  );
};

export default App;
