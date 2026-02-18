import type { CatFact } from '../api/catFacts'

type FactsCardProps = {
  facts: CatFact[]
}

export function FactsCard({ facts }: FactsCardProps) {
  return (
    <section className="card card--success" aria-live="polite">
      <div className="card__title">Результат</div>
      <ol className="facts">
        {facts.map((f, idx) => (
          <li key={`${idx}-${f.length}`} className="facts__item">
            {f.fact}
          </li>
        ))}
      </ol>
    </section>
  )
}
