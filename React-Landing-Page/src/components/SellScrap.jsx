import React, { useState } from "react";
import "./SellScrap.css";

const SellScrap = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    fetch("http://localhost:5000/sell-scrap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => setSubmitted(true))
    .catch(err => console.error("Error:", err));
  };

  return (
    <div className="sell-scrap-container">
      {!submitted ? (
        <form className="sell-form" onSubmit={handleSubmit}>
          <h2>Sell Your Scrap</h2>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="text" name="address" placeholder="Your Address" required />
          <input type="text" name="scrapType" placeholder="Type of Scrap" required />
          <input type="number" name="price" placeholder="Price (in ₹)" required />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="thank-you">
          <h2>Your sell request has been placed!</h2>
          <p>Our driver will reach your location to collect the scrap.</p>
          <p>🌍 Thank you for saving Earth! 🌿</p>
        </div>
      )}
    </div>
  );
};

export default SellScrap;
