import { RequestedData, useReadDaopia } from 'hooks/useReadDaopia'
import { DaoDetailsData, FrontendDetailsData, DealDetailsData, PaymentType, RegistrationStatus } from '../../../types'
import { useEffect, useState } from 'react'
import { Box, Container, Heading, Text, Image, useColorModeValue, Flex, Stack, Center, Button, Icon, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers-new'
import moment from 'moment'
import { FaFileAlt, FaHandHoldingUsd, FaListAlt } from 'react-icons/fa'
import daopiaABI from '../../../assets/abis/daopiaABI'
// Import wagmi to get the connected account address
import { useAccount, useConnect } from 'wagmi'
import { useWriteDaopia } from 'hooks/useWriteDaopia'

const registrationStatusMapping: Record<number, RegistrationStatus> = {
  0: RegistrationStatus.Open,
  1: RegistrationStatus.Closed,
  2: RegistrationStatus.Permissioned,
  3: RegistrationStatus.Other,
}

const paymentTypeMapping: Record<number, PaymentType> = {
  0: PaymentType.Token,
  1: PaymentType.Ether,
  2: PaymentType.Contribution,
  3: PaymentType.Other,
}

function DaoDetails({ daoData }: any) {
  const [daoDetails, setDaoDetailsData] = useState<any>()
  const [frontendDetails, setDaoFrontends] = useState<any>()
  const [dealDetails, setDaoDeals] = useState<any>()
  const [userDaoStatus, setUserDaoStatus] = useState<any>()
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false)
  const gradient = useColorModeValue('linear-gradient(45deg,  #2980b9, #6dd5fa, #ffffff)', 'linear-gradient(45deg, #373b44, #4286f4, #000000)')
  const boxColorMode = useColorModeValue('white', 'gray.800')
  const headlineColorMode = useColorModeValue('gray.700', 'white')
  const normalTextColorMode = useColorModeValue('gray.600', 'gray.300')
  const { address } = useAccount()
  const router = useRouter()
  const result = useReadDaopia({ requestedData: RequestedData.DaoDetails, args: [daoData?.dao] })
  const frontendResult: any = useReadDaopia({ requestedData: RequestedData.DaoList, args: [] })
  const dealResult = useReadDaopia({ requestedData: RequestedData.DealDetails, args: [daoData?.dao] })
  const userStatus = useReadDaopia({ requestedData: RequestedData.GetUser, args: [address, daoData?.dao] })
  const contract = useWriteDaopia()
  // const {contractWrite, waitForTransaction} = useWriteDaopia({requestedData: WriteData.MakePayment, args: [daoData?.dao], value: })
  useEffect(() => {
    if (typeof userStatus !== 'undefined') {
      setUserDaoStatus(Number(userStatus))
    }
  }, [userStatus])

  useEffect(() => {
    if (result) {
      let details = new DaoDetailsData(...(result as unknown as ConstructorParameters<typeof DaoDetailsData>))
      setDaoDetailsData(details)
    }
  }, [result])

  const handleMakePayment = async () => {
    //console.log(res)
    //let result = await contract.proposalsTableId()
    setPaymentLoading(true)
    try {
      let tx = await contract.makePayment(daoData?.dao.toString().toLowerCase(), { value: ethers.parseEther(ethers.formatEther(daoDetails?.price)) })
      await tx.wait()
      setPaymentLoading(false)
    } catch (error) {
      setPaymentLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (frontendResult) {
      let currentData = frontendResult.find((item: any) => item.dao === daoData.dao)
      let frontend = new FrontendDetailsData(
        currentData.name,
        currentData.description,
        currentData.logoUrl,
        currentData.communication,
        currentData.dao
      )
      setDaoFrontends(frontend)
    }
  }, [frontendResult])

  useEffect(() => {
    if (dealResult) {
      let deal = new DealDetailsData(...(dealResult as unknown as ConstructorParameters<typeof DealDetailsData>))
      setDaoDeals(deal)
    }
  }, [dealResult])

  return (
    <Container maxW="container.xl" py={12} h={'94vh'}>
      <Flex direction={{ base: 'column', md: 'row' }} pt={50}>
        <Box flex={2}>
          <Stack spacing={11}>
            {daoDetails && (
              <Box p={8} rounded="md" shadow="lg" bg={boxColorMode}>
                <Heading size="lg" mb={6} color={headlineColorMode} fontWeight="bold">
                  DAO Details
                </Heading>
                <Text fontSize="lg" color={normalTextColorMode}>
                  <strong>Period:</strong> {moment.duration(Number(daoDetails?.period), 'seconds').humanize().toUpperCase()}
                </Text>
                <Text fontSize="lg" mt={2} color={normalTextColorMode}>
                  <strong>Price:</strong> {ethers.formatEther(daoDetails?.price)} FIL
                </Text>
                <Text fontSize="lg" mt={2} color={normalTextColorMode}>
                  <strong>Is Balance Locked:</strong> {daoDetails?.isBalanceLocked ? 'Yes' : 'No'}
                </Text>
                <Text fontSize="lg" mt={2} color={normalTextColorMode}>
                  <strong>Payment Type:</strong> {paymentTypeMapping[daoDetails?.paymentType]}
                </Text>
                <Text fontSize="lg" mt={2} color={normalTextColorMode}>
                  <strong>Payment Contract:</strong> {daoDetails?.paymentContract}
                </Text>
                <Text fontSize="lg" mt={2} color={normalTextColorMode}>
                  <strong>Vault:</strong> {daoDetails?.vault}
                </Text>
                <Text fontSize="lg" mt={2} color={normalTextColorMode}>
                  <strong>Registration Status:</strong> {registrationStatusMapping[daoDetails?.registrationStatus]}
                </Text>
              </Box>
            )}

            {dealDetails && (
              <Box p={8} rounded="md" shadow="lg" bg={boxColorMode}>
                <Heading size="lg" mb={6} color={headlineColorMode} fontWeight="bold">
                  Deal Details
                </Heading>
                <Text fontSize="lg" color={normalTextColorMode}>
                  <strong>Repair Threshold:</strong> {dealDetails?.repair_treshold?.toString()}
                </Text>
                <Text fontSize="lg" mt={2} color={normalTextColorMode}>
                  <strong>Renew Threshold:</strong> {dealDetails?.renew_treshold?.toString()}
                </Text>
                <Text fontSize="lg" mt={2} color={normalTextColorMode}>
                  <strong>Number of Copies:</strong> {dealDetails?.num_copies?.toString()}
                </Text>
              </Box>
            )}
          </Stack>
        </Box>
        {frontendDetails && (
          <Box flex={1} textAlign={'center'} mb={{ base: 8, md: 0 }} ml={25} mr={{ md: 8 }}>
            <Box bgGradient={gradient} p={8} textAlign={'center'} rounded="md" shadow="lg" display="flex" flexDirection="column" alignItems="center">
              <Image src={frontendDetails.logoUrl} alt={frontendDetails.name} boxSize="150px" objectFit="cover" mb={4} borderRadius="full" />
              <Heading mb={4} fontSize="2xl" color={headlineColorMode}>
                {frontendDetails.name}
              </Heading>
              <Text color={normalTextColorMode}>{frontendDetails.description}</Text>
              <Text mt={4} color={normalTextColorMode}>
                Communication: {frontendDetails.communication}
              </Text>
              <Text mt={2} color={normalTextColorMode}>
                DAO Address: {frontendDetails.dao}
              </Text>
              <Center mt={6}>
                {!userDaoStatus ? (
                  <Button
                    disabled={paymentLoading}
                    onClick={handleMakePayment}
                    colorScheme="teal"
                    variant="solid"
                    size="md"
                    leftIcon={<Icon as={FaHandHoldingUsd} />}>
                    {paymentLoading ? 'Loading...' : 'Make Payment'}
                  </Button>
                ) : (
                  <Button disabled colorScheme="teal" variant="solid" size="md" leftIcon={<Icon as={FaHandHoldingUsd} />}>
                    Already member
                  </Button>
                )}
              </Center>
              <HStack spacing={4} mt={4}>
                <Button
                  onClick={() => {
                    router.push(`/dao/contributions/${daoData.dao}`)
                  }}
                  colorScheme="blue"
                  variant="solid"
                  size="md"
                  leftIcon={<Icon as={FaListAlt} />}>
                  See Contributions
                </Button>
                <Button
                  onClick={() => {
                    router.push(`/dao/files/${daoData.dao}`)
                  }}
                  colorScheme="purple"
                  variant="solid"
                  size="md"
                  leftIcon={<Icon as={FaFileAlt} />}>
                  See Files
                </Button>
              </HStack>
            </Box>
          </Box>
        )}
      </Flex>
    </Container>
  )
}

export async function getServerSideProps(context: any) {
  const { dao } = context.params
  let daoData = { dao }
  return {
    props: {
      daoData,
    },
  }
}

export default DaoDetails
