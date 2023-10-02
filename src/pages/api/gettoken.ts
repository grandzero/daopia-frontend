import type { NextApiRequest, NextApiResponse } from 'next'
import lighthouse from '@lighthouse-web3/sdk'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { address } = req.body
    if (!address) {
      return res.status(400).json({
        error: 'Provide a address',
        token: undefined,
      })
    } else {
      let token = await lighthouse.getAuthMessage(address)
      return res.status(200).json({ token, error: undefined })
    }
  }
}
