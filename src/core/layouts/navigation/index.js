// ** Icons Import
import { Home, Circle, FileText, Square, UserCheck } from 'react-feather'

export default [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    badge: 'light-warning',
    children: [
      {
        id: 'home',
        title: 'Home',
        icon: <Circle size={12} />,
        navLink: '/dashboard'
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'states',
        title: 'States',
        icon: <Circle size={12} />,
        navLink: '/states'
      },
      {
        id: 'lgas',
        title: 'Lgas',
        icon: <Circle size={12} />,
        navLink: '/lgas'
      },
      {
        id: 'wards',
        title: 'Wards',
        icon: <Circle size={12} />,
        navLink: '/wards'
      },
      {
        id: 'pollingUnits',
        title: 'Polling Units',
        icon: <Circle size={12} />,
        navLink: '/pollingUnits'
      }
    ]
  }
]