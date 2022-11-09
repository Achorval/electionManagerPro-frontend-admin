// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import system from '../views/manager/store'
// import todo from 'views/apps/todo/store'
// import chat from 'views/apps/chat/store'
// import users from 'views/apps/user/store'
// import email from 'views/apps/email/store'
// import kanban from 'views/apps/kanban/store'
// import invoice from 'views/apps/invoice/store'
// import calendar from 'views/apps/calendar/store'
// import ecommerce from 'views/apps/ecommerce/store'
// import dataTables from 'views/tables/data-tables/store'
// import permissions from 'views/apps/roles-permissions/store'

const rootReducer = {
  // auth,
  // todo,
  // chat,
  // email,
  // users,
  // kanban,
  navbar,
  layout,
  system
  // calendar,
  // ecommerce,
  // dataTables,
  // permissions
}

export default rootReducer
