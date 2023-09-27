import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import daopiaABI from '../assets/abis/daopiaABI'
export enum WriteData {
  MakePayment = 'makePayment',
  MakeProposalToDao = 'makeProposalToDao',
  RegisterDao = 'registerDao',
}

export function useWriteDaopia(): any {
  let [contract, setContract] = useState<any>()

  useEffect(() => {
    ;(async () => {
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider?.getSigner()
      const inlineContract = new ethers.Contract(`0x${process.env.NEXT_PUBLIC_DAOPIA_CONTRACT_ADDRESS}`, daopiaABI.abi, signer)
      setContract(inlineContract)
    })()
  }, [])

  return contract
}
