import React, { type ComponentType } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'

export function withGuestOnly<P extends object>(Component: ComponentType<P>) {
  return function WithGuestOnly(props: P) {
    const user = useAppSelector((s) => s.auth.user)

    if (user) {
      return <Navigate to="/" replace />
    }

    return React.createElement(Component, props)
  }
}
