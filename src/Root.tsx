import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Root() {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
