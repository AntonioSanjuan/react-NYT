import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/state/appStateHook";

function Topnav() {
      const isLoggedIn = useAppSelector((state) => state.user.isLogged);
      console.log("isLoggedIn", isLoggedIn)
      
      return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </>
    );
}

export {Topnav}
  