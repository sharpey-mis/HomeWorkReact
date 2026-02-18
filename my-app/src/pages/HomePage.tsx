import { useState } from 'react'
import { Alert, Box, Button, Container, Stack, Typography } from '@mui/material'

import { fetchCatFacts } from '../api/catFacts'
import type { CatFact } from '../api/catFacts'

export function HomePage() {
  const [facts, setFacts] = useState<CatFact[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function onFetchClick() {
    setIsLoading(true)
    setError(null)
    setFacts(null)

    try {
      const data = await fetchCatFacts(5)
      setFacts(data)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Home
          </Typography>
          <Typography color="text.secondary">
            Это защищённая страница. Тут оставил пример с запросом к API (cat facts).
          </Typography>
        </Box>

        <Box>
          <Button variant="contained" onClick={onFetchClick} disabled={isLoading}>
            {isLoading ? 'Загрузка…' : 'Получить факты'}
          </Button>
        </Box>

        {error ? <Alert severity="error">{error}</Alert> : null}

        {facts ? (
          <Alert severity="success" sx={{ '& ol': { margin: 0, paddingLeft: 2 } }}>
            <Typography fontWeight={700} gutterBottom>
              Результат
            </Typography>
            <ol>
              {facts.map((f, idx) => (
                <li key={`${idx}-${f.length}`}>{f.fact}</li>
              ))}
            </ol>
          </Alert>
        ) : null}
      </Stack>
    </Container>
  )
}
