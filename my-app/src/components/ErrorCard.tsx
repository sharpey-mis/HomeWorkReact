type ErrorCardProps = {
  message: string
}

export function ErrorCard({ message }: ErrorCardProps) {
  return (
    <section className="card card--error" role="alert" aria-live="assertive">
      <div className="card__title">Ошибка</div>
      <div className="card__text">{message}</div>
    </section>
  )
}
