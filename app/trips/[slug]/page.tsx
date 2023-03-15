import { prisma } from '../../../utils/cockroachdb'

export default async function Page({ params }) {
    const row = await prisma.trip.findUnique({
        where: {
          id: params.slug,
        },
      })
    if (!row) {
        return <h1>Whoops!</h1>
    }
    return <>
    <h1>{row.origin} → {row.destination}</h1>
    <p>From: {row.start.toDateString()}</p>
    <p>To: {row.end.toDateString()}</p>
    <br />
    <p><a href="/trips">Back to trips</a></p>
    </>
}
