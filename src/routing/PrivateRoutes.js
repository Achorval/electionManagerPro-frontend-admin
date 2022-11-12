// ** Router imports
import {Route, Routes, Navigate} from 'react-router-dom';

// ** Layout imports
import SidebarLayout from 'core/layouts/SidebarLayout';

// ** Components imports
// import Dashboard from '../views/dashboard';
import States from '../views/manager/states';
import Lgas from '../views/manager/lgas';
import Wards from '../views/manager/wards';
import PollingUnits from '../views/manager/pollingUnits';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<SidebarLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<States />} />
        <Route path='states' element={<States />} />
        <Route path='lgas' element={<Lgas />} />
        <Route path='wards' element={<Wards />} />
        <Route path='pollingUnits' element={<PollingUnits />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export default PrivateRoutes;
