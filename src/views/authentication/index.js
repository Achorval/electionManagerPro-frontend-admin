// ** React Imports
import {Route, Routes} from 'react-router-dom';

// ** Components Imports
import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';

// ** Blank Layout Imports
import BlankLayout from 'core/layouts/BlankLayout';

const AuthPage = () => (
  <Routes>
    <Route element={<BlankLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Registration />} />
      <Route path='forgotPassword' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export default AuthPage;
