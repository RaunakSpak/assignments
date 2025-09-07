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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <motion.div
          className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border border-purple-200/60 relative transition duration-300 hover:shadow-purple-200/70"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative top bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-b-xl shadow-md"></div>
          {!user ? (
            <>
              <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center tracking-wide">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  News Scraper
                </span>
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
              <p className="mt-6 text-gray-500 text-xs italic">
                🔒 Secure Google Sign-In. Your data is safe.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-700 mb-2 flex items-center justify-center gap-2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Hello {user.name}
                </span>
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              </h2>
              <p className="text-sm text-gray-500 mb-6 italic">
                You are logged in with Google ✨
              </p>

              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={fetchData}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg transition-all duration-300 font-semibold flex items-center gap-2 hover:scale-105 disabled:opacity-60"
                  disabled={loading}
                >
                  <span className="material-icons text-base"></span>
                  {loading ? "Fetching..." : "Fetch Headlines"}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl shadow-lg transition-all duration-300 font-semibold flex items-center gap-2 hover:scale-105"
                >
                  <span className="material-icons text-base">logout</span>
                </button>
              </div>

              {loading && (
                <p className="text-gray-400 animate-pulse">Loading headlines...</p>
              )}

              <ul className="text-left space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100 pr-2">
                {data.map((item, index) => (
                  <motion.li
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border hover:shadow-md hover:bg-white transition flex items-center gap-3 cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="material-icons text-purple-400 group-hover:text-purple-600 transition">
                      
                    </span>
                    <span className="text-gray-700 group-hover:text-gray-900 transition">
                      {item}
                    </span>
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
