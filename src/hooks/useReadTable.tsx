import { useState, useEffect } from 'react'
import axios from 'axios'

export function useReadTable(): any {
  let [queryResult, setQueryResult] = useState<any>()

  useEffect(() => {
    ;(async () => {
      const res = await axios.get(`https://kh3qnrs3z7ipp73ngs5ojfqx440emwwl.lambda-url.eu-central-1.on.aws/`)
      console.log(res.data)
      setQueryResult(res.data)
    })()
  }, [])

  return queryResult
}
