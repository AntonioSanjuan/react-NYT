import './BaseLayout.scss'
import './../../animations/blurAnimation.scss'

import { Outlet } from "react-router-dom";
import { Topnav } from "../../components/Topnav/Topnav";
import { Sidenav } from '../../components/Sidenav/Sidenav';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectLayoutIsSidenavOpened } from '../../state/layout/layout.selectors';
import { useEffect } from 'react';

export const inBlurAnimation = { 
  animation: "inBlurAnimationKeyframe 800ms ease-in",
  animationFillMode: "forwards"
};

export const outBlurAnimation = {
  animation: "outBlurAnimationKeyframe 800ms ease-out",
};

function Layout() { 
  const isSidenavOpened = useAppSelector<boolean>(selectLayoutIsSidenavOpened)
  useEffect(() => {
    console.log("BASELAYOUT isSidenavOpened updated from store: ", isSidenavOpened)
    //to-do
  }, [isSidenavOpened])

  return (
    <div className="Layout_MainContainer">
      <div className='Layout_HeaderContainer'>
        <Topnav displayLoginButton={true}/>
      </div>
      <div className='Layout_ContentContainer'>
        <div className='Layout_ContentSidenav'>
          <Sidenav />
        </div>
        <div className='Layout_Content' style={ isSidenavOpened ?  outBlurAnimation : inBlurAnimation}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

  export {Layout}