import { Link, Outlet } from "react-router-dom";

function LoginLayout() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
  
        <hr />
  
        <Outlet />
      </div>
    );
  }

  export {LoginLayout}