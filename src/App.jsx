import {useEffect,useState} from 'react'
import './App.css'
import SplashScreen from './components/Splashscreen';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Routes, Route,useLocation } from 'react-router-dom';
import Tenant from './pages/Tenant';
import Owner from './pages/Owner';
import Account from './pages/Account';
import PageTransition from './components/PageTransition';
import NotFoundPage from './pages/NotFoundPage';
import TenantRoom from './pages/TenantRoom';

function PageWrapper() {
  const location = useLocation(); // ✅ Now inside Router
  return (
    <>
      
      <div className="mx-1">
        <Navbar />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Tenant />} />
          <Route path='/TenantRoom' element={<PageTransition><TenantRoom /></PageTransition>} />

          <Route path="/owner" element={<PageTransition><Owner /></PageTransition>} />

          <Route path="/account" element={<PageTransition><Account /></PageTransition>} />
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
  const timer=setTimeout(() => {
    setLoading(false)
  }, 3000);
  return()=>{clearTimeout(timer)}
},[]);

  return (
    <>
    {loading && <SplashScreen/>}
    {!loading &&(
      <Router>
        <PageWrapper />
      </Router>
      )}
    </>
  )
}

export default App
