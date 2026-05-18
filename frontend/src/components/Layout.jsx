import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

function Layout({ children }) {

  return (

    <div className="flex bg-[#f7fff0] min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-8">

          {children}

        </div>

      </div>

    </div>

  );
}

export default Layout;