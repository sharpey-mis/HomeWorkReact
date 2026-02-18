import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './app/hooks'
import { logout } from './features/auth/authSlice'
import { withAuthGuard } from './hoc/withAuthGuard'
import { withGuestOnly } from './hoc/withGuestOnly'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RegisterPage } from './pages/RegisterPage'

const GuardedHomePage = withAuthGuard(HomePage)
const GuestLoginPage = withGuestOnly(LoginPage)
const GuestRegisterPage = withGuestOnly(RegisterPage)

export function App() {
  const user = useAppSelector((s) => s.auth.user)
  const dispatch = useAppDispatch()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1, fontWeight: 800 }}
          >
            Homework React
          </Typography>

          {user ? (
            <>
              <Typography sx={{ mr: 2, opacity: 0.9 }}>{user.email}</Typography>
              <Button color="inherit" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<GuardedHomePage />} />
        <Route path="/login" element={<GuestLoginPage />} />
        <Route path="/register" element={<GuestRegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  )
}
