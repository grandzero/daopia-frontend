import type { NextApiRequest, NextApiResponse } from 'next'
import lighthouse from '@lighthouse-web3/sdk'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { signedMessage, address, cid } = req.body
    if (!signedMessage) {
      return res.status(400).json({
        error: 'Provide a address',
        token: undefined,
      })
    } else {
      try {
        const keyObject: any = await lighthouse.fetchEncryptionKey(cid, address, signedMessage)
        const fileType = 'image/jpeg'
        const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType)
        const bufferData = Buffer.from(decrypted)
        return res.status(200).end(bufferData)
      } catch (e) {
        return res.status(400).json({
          error: 'Decryption error',
          token: undefined,
        })
      }
      //return res.status(200).json({ token, error: undefined })
    }
  }
}
