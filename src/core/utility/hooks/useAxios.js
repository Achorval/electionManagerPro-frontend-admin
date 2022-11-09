import axios from 'axios';
import { getAdminData } from 'core/utility/Utils';

// ** Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASENAME
});

// ** Request Interceptor
axiosInstance.interceptors.request.use(request => {
    // ** Get token from hook
    const adminData = getAdminData();

    // ** Add request's Headers
    if (adminData) {
      // ** eslint-disable-next-line no-param-reassign 
      request.headers['Authorization'] = `Bearer ${adminData.accessToken}`;
      request.headers['Content-Type'] = 'application/json';
      request.headers['Accept'] = 'application/json';
    }
    return request;
  },
  error => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosInstance;

