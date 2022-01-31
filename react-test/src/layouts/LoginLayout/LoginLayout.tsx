import { Outlet } from "react-router-dom";
import { Topnav } from "../../components/Topnav/Topnav";

function LoginLayout() {
    return (
      <div>
        <Topnav />
        <hr />
        <Outlet />
      </div>
    );
  }

  export {LoginLayout}