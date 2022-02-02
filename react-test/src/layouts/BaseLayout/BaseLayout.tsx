import './BaseLayout.scss'

import { Outlet } from "react-router-dom";
import { Topnav } from "../../components/Topnav/Topnav";
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectLayoutIsSidenavOpened } from '../../state/layout/layout.selectors';
import { useEffect } from 'react';

function Layout() { 
  const isSidenavOpened = useAppSelector<boolean>(selectLayoutIsSidenavOpened)

  useEffect(() => {
    console.log("BASELAYOUT isSidenavOpened updated from store: ", isSidenavOpened)
    //to-do
  }, [isSidenavOpened])

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