import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { motion } from "framer-motion";

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!user ? (
            <>
              <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Welcome to News Scraper
              </h1>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.log("Login Failed")}
                theme="outline"  
                size="large"      
                shape="pill"      
                text="signin_with" 
                width="300"
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Hello {user.name}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                You are logged in with Google
              </p>

              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={fetchData}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
                  disabled={loading}
                >
                  {loading ? "Fetching..." : "Fetch Headlines"}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
                >
                  Logout
                </button>
              </div>

              {loading && <p className="text-gray-400">Loading headlines...</p>}

              <ul className="text-left space-y-2">
                {data.map((item, index) => (
                  <motion.li
                    key={index}
                    className="p-3 rounded-lg bg-gray-50 border hover:shadow transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item}
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
