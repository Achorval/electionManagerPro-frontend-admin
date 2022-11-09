// ** React Imports
import {Route, Routes} from 'react-router-dom'
import Error from './Error'

// ** Components Imports
import ComingSoon from './ComingSoon'
import Maintenance from './Maintenance'
import NotAuthorized from './NotAuthorized'

// ** Blank Layout Imports
import BlankLayout from 'core/layouts/BlankLayout'

const ErrorsPage = () => (
  <Routes>
    <Route element={<BlankLayout />}>
      <Route path='404' element={<Error />} />
      <Route path='comingsoon' element={<ComingSoon />} />
      <Route path='maintenance' element={<Maintenance />} />
      <Route path='notauthorize' element={<NotAuthorized />} />
      <Route index element={<Error />} />
    </Route>
  </Routes>
)

export default ErrorsPage
