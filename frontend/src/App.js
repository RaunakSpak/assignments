import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    setUser(credentialResponse);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setData([]);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/scrape");
      setData(res.data.headlines || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to fetch headlines. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="552492918552-jh96p4c7hspe419ok8025rug48m8q67g.apps.googleusercontent.com">
      <div className="container">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <div className="top-bar"></div> */}

          {!user ? (
            <>
              <h1 className="title">
                Welcome to <span className="highlight">News Scraper</span>
              </h1>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.log("Login Failed")}
                theme="outline"
                size="large"
                shape="pill"
                text="signin_with"
                width="500"
              />
              <p className="note">Secure Google Sign-In. Your data is safe.</p>
            </>
          ) : (
            <>
              <h2 className="subtitle">
                <span>Hello {user.name}</span>
                <span className="status-dot"></span>
              </h2>
              <p className="small-text">You are logged in with Google</p>

              <div className="button-group">
                <button
                  onClick={fetchData}
                  className="btn btn-blue"
                  disabled={loading}
                >
                  {loading ? "Fetching..." : "Fetch Headlines"}
                </button>
                <button onClick={handleLogout} className="btn btn-red">
                  Logout
                </button>
              </div>

              {loading && <p className="loading">Loading headlines...</p>}

              <ul className="headline-list">
                {data.map((item, index) => (
                  <motion.li
                    key={index}
                    className="headline-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="material-icons"> </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      </div>



    </GoogleOAuthProvider>
  );
}

export default App;
