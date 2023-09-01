import { useAuthContext } from '../Context/authContext'
import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

export default function CustomprivateRouting({ Component }) {
  const { isAuth } = useAuthContext()
  const location = useLocation()


  if (!isAuth) {

    return <Navigate to='/auth/login' state={{ from: location.pathname }} replace />
  }

  return (
    <>

      <Component />

    </>
  )
}

