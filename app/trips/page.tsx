import { prisma } from '../../utils/cockroachdb'


// following this guide: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-cockroachdb

export default async function Page() {
    const dbResp = await prisma.trip.findMany()
    console.log(dbResp)
    const rows = dbResp.map(row =>
        <li key={row.id}>
            <a href={"/trips/" + row.id}>
                {row.origin}→{row.destination}
            </a>
        </li>
    );
    return <>
        <h1>Journey</h1>
        <ul>{rows}</ul>
        <br />
        <br />
        <p><a href="/create">Create a new trip</a></p>
    </>
}
