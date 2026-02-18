import React, { type ComponentType } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'

export function withAuthGuard<P extends object>(Component: ComponentType<P>) {
  return function WithAuthGuard(props: P) {
    const user = useAppSelector((s) => s.auth.user)
    const location = useLocation()

    if (!user) {
      return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }

    return React.createElement(Component, props)
  }
}
