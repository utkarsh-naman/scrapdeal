// src/components/SellScrapForm.jsx
import React from "react";

const BuyScrapPage = () => {
  return (
    <form>
      <h2>Sell Your Scrap</h2>
      <label>
        Type of Scrap:
        <input type="text" name="type" />
      </label>
      <br />
      <label>
        Weight (kg):
        <input type="number" name="weight" />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BuyScrapPage;
