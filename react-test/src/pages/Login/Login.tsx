import React, { useState } from "react";
import './Login.scss'
import logo from "../../assets/images/Logo.png"
import { useUser } from "../../hooks/login/userHook";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState<string|undefined>(undefined);
  const [password, setPassword] = useState<string|undefined>(undefined);
  
  const { login } = useUser()
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login({ username, password })
    navigate('/')
  };

  return (
    <>
    <div className="Login_MainContainer">
      <div className="Login_CardContainer">
        <div className="Login_Logo">
          <img src={logo} alt="logo"/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input type="text" className="form-control" placeholder="name@example.com"           
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" placeholder="****"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="Login_ActionContainer">
              <button disabled={!!!username || !!!password} className="btn btn-primary w-100" type="submit">
                Login
              </button>
          </div>
      </form>
      </div>
    </div>
    </>
  );
}

  export default LoginPage
  