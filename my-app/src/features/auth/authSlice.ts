import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type AuthUser = {
  email: string
}

type AuthState = {
  user: AuthUser | null
}

function loadAuthState(): AuthState {
  try {
    const raw = localStorage.getItem('auth')
    if (!raw) return { user: null }
    const parsed = JSON.parse(raw) as { user?: { email?: unknown } }
    const email = parsed.user?.email
    if (typeof email === 'string' && email.length > 0) return { user: { email } }
    return { user: null }
  } catch {
    return { user: null }
  }
}

function persistAuthState(state: AuthState) {
  try {
    localStorage.setItem('auth', JSON.stringify(state))
  } catch {
    // ignore storage errors
  }
}

const initialState: AuthState = loadAuthState()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.user = { email: action.payload.email }
      persistAuthState(state)
    },
    register: (state, action: PayloadAction<{ email: string }>) => {
      state.user = { email: action.payload.email }
      persistAuthState(state)
    },
    logout: (state) => {
      state.user = null
      persistAuthState(state)
    },
  },
})

export const { login, register, logout } = authSlice.actions
export const authReducer = authSlice.reducer
