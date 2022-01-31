import { Outlet } from "react-router-dom";
import { Topnav } from "../../components/Topnav/Topnav";

function Layout() {
    return (
      <div>
        <Topnav />
        <hr />
        <Outlet />
      </div>
    );
  }

  export {Layout}