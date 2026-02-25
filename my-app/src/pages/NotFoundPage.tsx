import { Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stack spacing={2}>
        <Typography variant="h3" fontWeight={900}>
          404
        </Typography>
        <Typography color="text.secondary">Страница не найдена</Typography>
        <Button component={Link} to="/" variant="contained">
          На главную
        </Button>
      </Stack>
    </Container>
  )
}

