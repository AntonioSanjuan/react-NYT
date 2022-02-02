import './BaseLayout.scss'

import { Outlet } from "react-router-dom";
import { Topnav } from "../../components/Topnav/Topnav";
import { Sidenav } from '../../components/Sidenav/Sidenav';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectLayoutIsSidenavOpened } from '../../state/layout/layout.selectors';
import { useEffect, useState } from 'react';
import { inBlurAnimation, outBlurAnimation } from '../../animations/blurAnimation';

function Layout() { 
  const isSidenavOpened = useAppSelector<boolean>(selectLayoutIsSidenavOpened)
  const [showBlur, setShowBlur] = useState<boolean|undefined>(undefined);
  let showBlur2: undefined | boolean = undefined;

  useEffect(() => {
    console.log("BASELAYOUT isSidenavOpened updated from store: ", isSidenavOpened)
    if(!(showBlur === undefined && !isSidenavOpened)) {
      setShowBlur(isSidenavOpened)
    }
    //to-do
    //once isSidenavOpened === true
    //now we can set the animation condition { showBlur ?  inBlurAnimation : outBlurAnimation }
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
        <div className='Layout_Content' style={ showBlur || showBlur ?  inBlurAnimation : outBlurAnimation }>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

  export {Layout}