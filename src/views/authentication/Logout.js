// ** React Imports
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// ** Custom Hooks
import { useAuth } from 'core/utility/context/Auth';

export default function Logout() {
  const { handleLogout } = useAuth();

  useEffect(() => {
    handleLogout();
    document.location.reload()
  }, [handleLogout]);

  return (
    <Navigate to='/auth/login' />
  )
};
