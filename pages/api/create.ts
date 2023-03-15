// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../utils/cockroachdb'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body)
  const dbResp = await prisma.trip.create({
    data: {
      start: new Date(req.body.start),
      end: new Date(req.body.end),
      origin:
        req.body.origin,
      destination: req.body.destination,
    },
  })
  console.log(dbResp)
  res.status(200).json({ id: dbResp.id })
}
