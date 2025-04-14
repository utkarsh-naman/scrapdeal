import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ mode }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    if (mode === "signup") {
      const exists = storedUsers.some((user) => user.userId === userId);
      if (exists) {
        setMessage("User already exists!");
        return;
      }

      const updatedUsers = [...storedUsers, { userId, password }];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setMessage("User registered!");
      setIsSubmitted(true);

      setTimeout(() => {
        history.push("/");
      }, 2000);
    } else {
      const user = storedUsers.find(
        (u) => u.userId === userId && u.password === password
      );
      if (user) {
        setMessage("Login successful!");
        setIsSubmitted(true);

        setTimeout(() => {
          history.push("/options");
        }, 2000);
      } else {
        setMessage("Invalid credentials.");
        setIsSubmitted(false);
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "150px", textAlign: "center" }}>
      <h2>{mode === "signup" ? "Sign Up" : "Sign In"}</h2>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{ padding: "10px", marginBottom: "10px", width: "200px" }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", marginBottom: "10px", width: "200px" }}
          />
          <br />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              backgroundColor: mode === "signup" ? "#28a745" : "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
          >
            {mode === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>
      ) : (
        <div className="thank-you">
          <div className="tree-container" style={{ marginTop: "40px", animation: "pop 0.6s ease" }}>
            <svg
              className="tree"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="150"
              height="150"
            >
              <circle cx="32" cy="32" r="30" fill="#c2f0c2" />
              <rect x="28" y="35" width="8" height="20" fill="#8b5a2b" />
              <circle cx="32" cy="30" r="12" fill="#228B22" />
            </svg>
          </div>
          <h2 className="thank-message" style={{ color: "#2fa906", marginTop: "20px" }}>
            Thanks for saving the Earth! 🌍
          </h2>
        </div>
      )}

      <p style={{ marginTop: "20px", color: message.includes("success") ? "green" : "red" }}>
        {message}
      </p>
    </div>
  );
};

export default Login;
