// ** Router imports
import {Routes, Route, Navigate} from 'react-router-dom'

// ** Pages Routes
import PrivateRoutes from './PrivateRoutes';
import AuthPage from '../views/authentication';
import Logout from '../views/authentication/Logout';
import ErrorsPage from '../views/misc';

// ** App
import App from '../App';

// ** useAuth context
import { useAuth } from 'core/utility/context/Auth';

const AppRoutes = () => {
  // ** useAuth hook
  const { currentAdmin } = useAuth();
  
  return (
    <Routes>
      <Route element={<App />}>
        <Route path='error/*' element={<ErrorsPage />} />
        <Route path='logout' element={<Logout />} />
        {currentAdmin ? (
          <>
            <Route path='/*' element={<PrivateRoutes />} />
            <Route index element={<Navigate to='/dashboard' />} />
          </>
        ) : (
          <>
            <Route path='auth/*' element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/auth' />} />
          </>
        )} 
      </Route>
    </Routes>
  )
}

export default AppRoutes;
