import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/career-offers')({
  component: CareerOffersPage,
})

function CareerOffersPage() {
  return <div>Hello "/-$locale/carrer-offers"!</div>
}
