import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const FILE_NAME = "users.csv";

const Login = ({ mode }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/${FILE_NAME}`)
      .then((response) => response.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true });
        setUsers(parsed.data);
      })
      .catch(() => {
        console.log("CSV not found, creating on Sign Up");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "signup") {
      const exists = users.some((user) => user.userId === userId);
      if (exists) {
        setMessage("User already exists!");
        return;
      }

      const updatedUsers = [...users, { userId, password }];
      const csv = Papa.unparse(updatedUsers);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = FILE_NAME;
      a.click();

      setMessage("User registered!");
      setIsSubmitted(true);
    } else {
      const user = users.find(
        (u) => u.userId === userId && u.password === password
      );
      if (user) {
        setMessage("Login successful!");
        setIsSubmitted(true);
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
          <button type="submit" style={{
            padding: "10px 20px",
            borderRadius: "25px",
            backgroundColor: mode === "signup" ? "#28a745" : "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s ease"
          }}>
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
