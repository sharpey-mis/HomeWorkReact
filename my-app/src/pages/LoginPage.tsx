import { useState } from 'react'
import { Alert, Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../app/hooks'
import { login } from '../features/auth/authSlice'

export function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const from = (location.state as { from?: string } | null)?.from ?? '/'

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError('Заполни email и пароль')
      return
    }

    dispatch(login({ email: email.trim() }))
    navigate(from, { replace: true })
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Login
          </Typography>
          <Typography color="text.secondary">Для домашки логин “фейковый”: просто сохраняем email в Redux.</Typography>
        </Box>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              fullWidth
            />
            <Button type="submit" variant="contained">
              Войти
            </Button>
          </Stack>
        </Box>

        <Typography color="text.secondary">
          Нет аккаунта? <Link to="/register">Register</Link>
        </Typography>
      </Stack>
    </Container>
  )
}

