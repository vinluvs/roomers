import { useEffect, useState } from "react";
import "./App.css";
import SplashScreen from "./components/Splashscreen";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Tenant from "./pages/Tenant";
import Owner from "./pages/Owner";
import Account from "./pages/Account";
import PageTransition from "./components/PageTransition";
import NotFoundPage from "./pages/NotFoundPage";
import TenantRoom from "./pages/TenantRoom";
import TenantNotification from "./pages/TenantNotification";
import MyTenants from "./pages/MyTenants";
import OwnerNotification from "./pages/OwnerNotification";
import Auth from './pages/Auth';

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Replace with your auth logic
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function PageWrapper() {
  const location = useLocation();
  return (
    <>
      <div className="mx-1">
        <Navbar />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Tenant />} />
          <Route
            path="/TenantRoom"
            element={
              <PrivateRoute>
                <PageTransition>
                  <TenantRoom />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/TenantNotification"
            element={
              <PrivateRoute>
                <PageTransition>
                  <TenantNotification />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/MyTenants"
            element={
              <PrivateRoute>
                <PageTransition>
                  <MyTenants />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/owner"
            element={
              <PrivateRoute>
                <PageTransition>
                  <Owner />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/OwnerNotification"
            element={
              <PrivateRoute>
                <PageTransition>
                  <OwnerNotification />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <PageTransition>
                  <Account />
                </PageTransition>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {loading && <SplashScreen />}
      {!loading && (
        <Router>
          <PageWrapper />
        </Router>
      )}
    </>
  );
}

export default App;
