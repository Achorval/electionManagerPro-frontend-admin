import React from 'react'

// ** Router Import
import { Outlet } from 'react-router-dom'

// ** Authentication init
import { AuthInit } from 'core/utility/context/Auth'

const App = () => {
  return (
    <AuthInit>
      <Outlet />
    </AuthInit>
  )
}

export default App
