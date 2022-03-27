import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/BaseLayout/BaseLayout';
import { LoginLayout } from './layouts/LoginLayout/LoginLayout';
import { AuthRouteGuard } from './guards/authGuard/auth.guard';
import { useUser } from './hooks/user/userHook';

const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Contact = React.lazy(() => import("./pages/Contact/Contact"));
const StoredArticles = React.lazy(() => import("./pages/StoredArticles/StoredArticles"));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));

function App() {
  const {keepUserStateUpdated} = useUser();

  useEffect(() => {
    console.log("App initialize")
    keepUserStateUpdated()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
    <Route path="/" element={
    <Layout />}>
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
      <Route
            path="storedArticles"
            element={
              <AuthRouteGuard>
                <React.Suspense fallback={<>...</>}>
                  <StoredArticles />
                </React.Suspense>
              </AuthRouteGuard>
            }
          />
      <Route
            path="profile"
            element={
              <AuthRouteGuard>
                <React.Suspense fallback={<>...</>}>
                  <Profile />
                </React.Suspense>
              </AuthRouteGuard>
            }
          />
    </Route>
    <Route path="login" 
    element={
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
