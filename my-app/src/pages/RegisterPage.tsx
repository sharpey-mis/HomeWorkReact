import { useState } from 'react'
import { Alert, Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../app/hooks'
import { register } from '../features/auth/authSlice'

export function RegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError('Заполни email и пароль')
      return
    }

    dispatch(register({ email: email.trim() }))
    navigate('/', { replace: true })
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Register
          </Typography>
          <Typography color="text.secondary">
            Для домашки регистрация “фейковая”: сохраняем email в Redux и считаем, что пользователь залогинен.
          </Typography>
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
              autoComplete="new-password"
              fullWidth
            />
            <Button type="submit" variant="contained">
              Создать аккаунт
            </Button>
          </Stack>
        </Box>

        <Typography color="text.secondary">
          Уже есть аккаунт? <Link to="/login">Login</Link>
        </Typography>
      </Stack>
    </Container>
  )
}

