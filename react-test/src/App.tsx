import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/BaseLayout/BaseLayout';
import { LoginLayout } from './layouts/LoginLayout/LoginLayout';

const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Contact = React.lazy(() => import("./pages/Contact/Contact"));


function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>

      <Route index element={
        <React.Suspense fallback={<>...</>}>
          <Home />
        </React.Suspense>
      } 
      />

      <Route
            path="contact"
            element={
              <React.Suspense fallback={<>...</>}>
                <Contact />
              </React.Suspense>
            }
          />
    </Route>
    <Route path="login" element={
    <LoginLayout />}>
      <Route index element={
        <React.Suspense fallback={<>...</>}>
          <Login />
      </React.Suspense>
      } />
    </Route>
  </Routes>
  );
}

export default App;
