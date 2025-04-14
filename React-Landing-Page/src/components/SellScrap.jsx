import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SellScrap.css";

const SellScrapForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    scrapType: "",
    weight: "",
    price: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Auto redirect to home after 3 seconds
    setTimeout(() => {
      history.push("/");
    }, 3000);
  };

  return (
    <div className="sell-scrap-container">
      {!submitted ? (
        <form className="sell-form" onSubmit={handleSubmit}>
          <h2>Sell Your Scrap</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="scrapType"
            placeholder="Type of Scrap"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price you expect (₹/kg)"
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="thank-you">
          <h2>✅ Sale Placed Successfully!</h2>
          <p>
            Our delivery partner will collect the scrap from your location.
            <br />
            Redirecting to homepage...
          </p>
        </div>
      )}
    </div>
  );
};

export default SellScrapForm;
