import { useState, useEffect } from 'react'
import { Database } from '@tableland/sdk'

export function useReadTable(): any {
  let [queryResult, setQueryResult] = useState<any>()

  useEffect(() => {
    ;(async () => {
      const db = new Database({ autoWait: false })
      const { results } = await db.prepare(`SELECT * FROM ${process.env.NEXT_PUBLIC_DAOPIA_TABLENAME};`).all()
      setQueryResult(results)
    })()
  }, [])

  return queryResult
}
