import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
      <div>
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
  
        <hr />
  
        <Outlet />
      </div>
    );
  }

  export {Layout}