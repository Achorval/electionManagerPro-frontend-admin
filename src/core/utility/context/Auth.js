// ** React Imports
import { useRef, useState, useEffect, createContext, useContext } from 'react';

// ** AxiosInstance Imports
import axios from 'core/utility/hooks/useAxios';

// ** Utils Imports 
import * as authHelper from 'core/utility/Utils';

// ** Custom Components
import LayoutSplashScreen from 'core/components/spinner/Loading-spinner';

// ** Create Context
const AuthContext = createContext();

// ** UseAuth Context
const useAuth = () => {
  return useContext(AuthContext);
};

// ** AuthProvider Context
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(authHelper.getAdminData());
  const [currentAdmin, setCurrentAdmin] = useState(undefined);
  
  const handleLogin = (auth) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAdminData(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const handleLogout = () => {
    handleLogin(undefined);
    setCurrentAdmin(undefined);
  };

  return (
    <AuthContext.Provider value={{auth, handleLogin, currentAdmin, setCurrentAdmin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
};

// ** AuthInit Context
const AuthInit = ({children}) => {
  const { auth, handleLogout, setCurrentAdmin } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestAdmin = async () => {
      try {
        if (!didRequest.current) {
          const adminData = await axios.get('/api/admin');
          if (adminData) {
            setCurrentAdmin(adminData.data.data);
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          handleLogout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    }
    
    if (auth && auth.accessToken) {
      requestAdmin();
    } else {
      handleLogout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, [auth]);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
};

export { AuthProvider, AuthInit, useAuth };