import React from "react";
import { useHistory } from "react-router-dom";
import "./ScrapOptions.css";

const ScrapOptions = () => {
  const history = useHistory();

  const handleSellScrap = () => {
    history.push("/sell-scrap");
  };

  const handleBuyScrap = () => {
    history.push("/buy-scrap");
  };


  return (
    <div className="scrap-options-container">
      <h1>Welcome to ScrapCycle 🌍</h1>
      <p>What would you like to do?</p>
      <div className="buttons">
        <button className="sell-btn" onClick={handleSellScrap}>
          Sell Scrap
        </button>
        <button className="buy-btn" onClick={handleBuyScrap}>
          Buy Scrap
        </button>
      </div>
    </div>
  );
};

export default ScrapOptions;
