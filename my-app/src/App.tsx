import { useState } from 'react'

import { fetchCatFacts } from './api/catFacts'
import { ErrorCard } from './components/ErrorCard'
import { FactsCard } from './components/FactsCard'
import type { CatFact } from './api/catFacts'

export function App() {
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
    <main className="container">
      <header className="header">
        <h1 className="title">Cat facts</h1>
        <p className="subtitle">
          Нажми на кнопку, чтобы получить факты с API и отобразить результат отдельным компонентом.
        </p>
      </header>

      <div className="actions">
        <button className="button" type="button" onClick={onFetchClick} disabled={isLoading}>
          {isLoading ? 'Загрузка…' : 'Получить факты'}
        </button>
      </div>

      <section className="content">
        {error ? <ErrorCard message={error} /> : null}
        {facts ? <FactsCard facts={facts} /> : null}
      </section>
    </main>
  )
}
