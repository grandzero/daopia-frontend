import { RequestedData, useReadDaopia } from 'hooks/useReadDaopia'
import { DaoDetailsData, FrontendDetailsData, DealDetailsData, PaymentType, RegistrationStatus } from '../../../types'
import { useEffect, useState } from 'react'
import { Box, Container, Heading, Text, Stack, Image, useColorModeValue, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import moment from 'moment'
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
  const router = useRouter()
  // const {dao} = router.route
  const result = useReadDaopia({ requestedData: RequestedData.DaoDetails, args: [daoData?.dao] })
  const frontendResult: any = useReadDaopia({ requestedData: RequestedData.DaoList, args: [] })
  const dealResult = useReadDaopia({ requestedData: RequestedData.DealDetails, args: [daoData?.dao] })
  const gradient = useColorModeValue('linear-gradient(45deg,  #2980b9, #6dd5fa, #ffffff)', 'linear-gradient(45deg, #373b44, #4286f4, #000000)')

  useEffect(() => {
    if (result) {
      let details = new DaoDetailsData(...(result as unknown as ConstructorParameters<typeof DaoDetailsData>))
      setDaoDetailsData(details)
    }
  }, [result])
  // Render the component with fetched daoData
  useEffect(() => {
    if (frontendResult) {
      console.log(frontendResult)
      let currentData = frontendResult.find((item: any) => item.dao === daoData.dao)

      let frontend = new FrontendDetailsData(
        currentData.name,
        currentData.description,
        currentData.logoUrl,
        currentData.communication,
        currentData.dao
      )
      console.log(frontend)
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
              <Box p={8} rounded="md" shadow="lg" bg={useColorModeValue('white', 'gray.800')}>
                <Heading size="lg" mb={6} color={useColorModeValue('gray.700', 'white')} fontWeight="bold">
                  DAO Details
                </Heading>
                <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                  <strong>Period:</strong> {moment.duration(Number(daoDetails?.period), 'seconds').humanize().toUpperCase()}
                </Text>
                <Text fontSize="lg" mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                  <strong>Price:</strong> {ethers.formatEther(daoDetails?.price)} FIL
                </Text>
                <Text fontSize="lg" mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                  <strong>Is Balance Locked:</strong> {daoDetails?.isBalanceLocked ? 'Yes' : 'No'}
                </Text>
                <Text fontSize="lg" mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                  <strong>Payment Type:</strong> {paymentTypeMapping[daoDetails?.paymentType]}
                </Text>
                <Text fontSize="lg" mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                  <strong>Payment Contract:</strong> {daoDetails?.paymentContract}
                </Text>
                <Text fontSize="lg" mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                  <strong>Vault:</strong> {daoDetails?.vault}
                </Text>
                <Text fontSize="lg" mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                  <Text fontSize="lg" mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                    <strong>Registration Status:</strong> {registrationStatusMapping[daoDetails?.registrationStatus]}
                  </Text>
                </Text>
              </Box>
            )}

            {dealDetails && (
              <Box p={8} rounded="md" shadow="lg" bg={useColorModeValue('white', 'gray.800')}>
                <Heading size="lg" mb={6} color={useColorModeValue('gray.700', 'white')} fontWeight="bold">
                  Deal Details
                </Heading>
                <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                  <strong>Repair Threshold:</strong> {dealDetails?.repair_treshold?.toString()}
                </Text>
                <Text fontSize="lg" mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                  <strong>Renew Threshold:</strong> {dealDetails?.renew_treshold?.toString()}
                </Text>
                <Text fontSize="lg" mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
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
              <Heading mb={4} fontSize="2xl" color={useColorModeValue('gray.700', 'white')}>
                {frontendDetails.name}
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.300')}>{frontendDetails.description}</Text>
              <Text mt={4} color={useColorModeValue('gray.600', 'gray.300')}>
                Communication: {frontendDetails.communication}
              </Text>
              <Text mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
                DAO Address: {frontendDetails.dao}
              </Text>
            </Box>
          </Box>
        )}
      </Flex>
    </Container>
    // <Container maxW="container.xl">
    //   {frontendDetails && (
    //     <Box bgGradient={gradient} p={8} rounded="md" shadow="lg" mb={8}>
    //       <Heading mb={4}>{frontendDetails?.name}</Heading>
    //       <Image src={frontendDetails?.logoUrl} alt={frontendDetails.name} mb={4} />
    //       <Text>{frontendDetails?.description}</Text>
    //       <Text>Communication: {frontendDetails?.communication}</Text>
    //       <Text>DAO Address: {frontendDetails?.dao}</Text>
    //     </Box>
    //   )}

    //   <Stack spacing={8}>
    //     {daoDetails && (
    //       <Box p={8} rounded="md" shadow="lg" bg={useColorModeValue('white', 'gray.800')}>
    //         <Heading size="lg" mb={4}>
    //           DAO Details
    //         </Heading>
    //         <Text>Period: {daoDetails?.period?.toString()}</Text>
    //         <Text>Price: {daoDetails?.price?.toString()}</Text>
    //         <Text>Is Balance Locked: {daoDetails?.isBalanceLocked ? 'Yes' : 'No'}</Text>
    //         <Text>Payment Type: {daoDetails?.paymentType}</Text>
    //         <Text>Payment Contract: {daoDetails?.paymentContract}</Text>
    //         <Text>Vault: {daoDetails?.vault}</Text>
    //         <Text>Registration Status: {daoDetails?.registrationStatus}</Text>
    //       </Box>
    //     )}

    //     {dealDetails && (
    //       <Box p={8} rounded="md" shadow="lg" bg={useColorModeValue('white', 'gray.800')}>
    //         <Heading size="lg" mb={4}>
    //           Deal Details
    //         </Heading>
    // <Text>Repair Threshold: {dealDetails?.repair_treshold?.toString()}</Text>
    // <Text>Renew Threshold: {dealDetails?.renew_treshold?.toString()}</Text>
    // <Text>Number of Copies: {dealDetails?.num_copies?.toString()}</Text>
    //       </Box>
    //     )}
    //   </Stack>
    // </Container>
  )
}

export async function getServerSideProps(context: any) {
  const { dao } = context.params

  //const result = useReadDaopia({ requestedData: RequestedData.DaoDetails, args: [dao] })
  // Fetch the DAO data based on dao_address
  let daoData = { dao }
  try {
    //console.log('Result is : ', result)
  } catch (error) {
    console.error('Error fetching DAO data:', error)
    // Handle error appropriately
  }

  return {
    props: {
      daoData,
    },
  }
}

export default DaoDetails
