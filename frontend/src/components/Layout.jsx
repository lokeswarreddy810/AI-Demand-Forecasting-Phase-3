import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f4fff0]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <main className="p-6 min-h-screen bg-gradient-to-br from-white via-[#f4fff0] to-[#d9ffcc]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;