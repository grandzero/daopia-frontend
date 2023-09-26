import { useState, useEffect } from 'react'
import { useContractRead } from 'wagmi'
import daopiaABI from '../assets/abis/daopiaABI'
export enum RequestedData {
  DaoList = 'getDaoList',
  DealDetails = 'dealDetails',
  DaoDetails = 'daoDetails',
  DaoFrontends = 'daoFrontends',
  GetUser = 'getUser',
}

interface UseGetDaoProps {
  requestedData: RequestedData
  args: any[]
}

export function useReadDaopia({ requestedData, args }: UseGetDaoProps): boolean {
  let [result, setResult] = useState<any>()
  const contractRead = useContractRead({
    address: `0x${process.env.NEXT_PUBLIC_DAOPIA_CONTRACT_ADDRESS}`,
    abi: daopiaABI.abi,
    functionName: requestedData,
    args: args,
  })
  useEffect(() => {
    ;(async () => {
      let res = await contractRead.refetch()
      res?.data ? setResult(res?.data) : console.log(res)
    })()
  }, [])

  return result
}
