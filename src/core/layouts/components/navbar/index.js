// ** React Imports
import { Fragment } from 'react'
import { NavItem, NavLink } from 'reactstrap'

// ** Custom Components
import NavbarUser from './NavbarUser'

// ** Third Party Components
import * as Icon from 'react-feather';

// ** Import Context
import { useAuth } from 'core/utility/context/Auth';

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Context
  const { currentAdmin } = useAuth();

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <ul className='navbar-nav d-xl-none'>
          <NavItem className='mobile-menu me-auto'>
            <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
              <Icon.Menu className='ficon' />
            </NavLink>
          </NavItem>
        </ul>
        <ul className='nav navbar-nav d-none d-lg-flex'>
          <div className='user-nav d-sm-flex'>
            <span className='user-name fw-bolder'>
              Welcome back, {currentAdmin && currentAdmin['firstName']} 👋
            </span>
          </div>
        </ul>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
