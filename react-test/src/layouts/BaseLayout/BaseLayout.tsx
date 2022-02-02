import './BaseLayout.scss'

import { Outlet } from "react-router-dom";
import { Topnav } from "../../components/Topnav/Topnav";

function Layout() {  
    return (
      <div className="Layout_MainContainer">
        <div className='Login_HeaderContainer'>
          <Topnav displayLoginButton={true}/>
        </div>
        <div className='Login_ContentContainer'>
        <Outlet />
        </div>
      </div>
    );
  }

  export {Layout}