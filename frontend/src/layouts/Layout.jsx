import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212]">

      <Sidebar />

      <div className="ml-72">

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;