import React, { useState } from "react";
import './Login.scss'
import logo from "../../assets/images/Logo.png"
import { useUser } from "../../hooks/user/userHook";
import { Loading } from "../../components/common/loading/loading";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState<string|undefined>(undefined);
  const [password, setPassword] = useState<string|undefined>(undefined);
  
  const { login, loading, error } = useUser()
  const navigate = useNavigate();
  const handleSubmit = (async (e: any) => {
    e.preventDefault();

    await login({ username, password })
    navigate('/')
  });

  return (
    <>
    { loading &&
      <>
      <Loading/>
      </>
    }
    <div className="Login_MainContainer">
      <div className="Login_CardContainer">
        <div className="Login_Logo">
          <img src={logo} alt="logo"/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input type="email" className="form-control" placeholder="name@example.com"           
              onChange={(e) => setUsername(e.target.value)}
              defaultValue={username}
            />
            <label>Username</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" placeholder="****"
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={password}
            />
          <label>Password</label>
          </div>
          <div className="Login_ActionContainer">
              <button disabled={!!!username || !!!password} className="btn btn-primary w-100" type="submit">
                Login
              </button>
          </div>
        </form>
        {
          error &&
          <>
            <div className="Login_ErrorContainer">
              <p className="app_font_error">
                Error, try it again
              </p>
            </div>
          </>
        }

      </div>
    </div>
    </>
  );
}

  export default LoginPage
  