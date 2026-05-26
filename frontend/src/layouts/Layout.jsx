import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="bg-[#f5fff0] dark:bg-[#121212] min-h-screen">
      <Sidebar />

      <div className="ml-72">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="p-8 text-black dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;