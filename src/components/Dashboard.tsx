import { useContractRead } from 'wagmi'
import { Box, Grid, Image, Text, Button, useColorMode, VStack, Heading, Center, Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import daopiaABI from '../assets/abis/daopiaABI'
const daos = [
  {
    id: 1,
    name: 'DAO 1',
    description: 'Description for DAO 1',
    logo: 'url-to-logo-1',
  },
  {
    id: 1,
    name: 'DAO 1',
    description: 'Description for DAO 1',
    logo: 'url-to-logo-1',
  },
  {
    id: 1,
    name: 'DAO 1',
    description: 'Description for DAO 1',
    logo: 'url-to-logo-1',
  },
  {
    id: 1,
    name: 'DAO 1',
    description: 'Description for DAO 1',
    logo: 'url-to-logo-1',
  },
  {
    id: 1,
    name: 'DAO 1',
    description: 'Description for DAO 1',
    logo: 'url-to-logo-1',
  },
  // ... other DAOs
]

const Dashboard = () => {
  const { colorMode } = useColorMode()
  const [daoList, setDaoList] = useState<any>([])
  const router = useRouter()
  const textColor = { light: 'gray.700', dark: 'gray.200' }
  const bgColor = { light: 'gray.50', dark: 'gray.900' }
  const contractRead = useContractRead({
    address: `0x${process.env.NEXT_PUBLIC_DAOPIA_CONTRACT_ADDRESS}`,
    abi: daopiaABI.abi,
    functionName: 'getDaoList',
    args: [],
  })
  useEffect(() => {
    ;(async () => {
      let result = await contractRead.refetch()
      result?.data && setDaoList(result.data)
    })()
  }, [])

  return (
    <VStack minHeight="100vh" spacing={0} align="stretch">
      <Box flex="1" color={textColor[colorMode]} bg={bgColor[colorMode]} p={{ base: 4, md: 8, lg: 16 }} py={8}>
        <VStack spacing={6} align="stretch">
          <Heading mb={4} mt={30}>
            Dashboard
          </Heading>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
            {daoList.map((dao: any) => (
              <Center key={dao.dao} p={6} boxShadow="lg" borderRadius="md" bg={colorMode === 'light' ? 'white' : 'gray.700'}>
                <VStack spacing={4}>
                  <Image src={dao.logoUrl} alt={dao.name} boxSize="100px" objectFit="cover" />
                  <Heading size="md">{dao.name}</Heading>
                  <Text>{dao.description}</Text>
                  <Button colorScheme="blue" variant="outline" onClick={() => router.push(`/dao/details/${dao.dao}`)}>
                    Show Details
                  </Button>
                </VStack>
              </Center>
            ))}
          </Grid>
        </VStack>
      </Box>
    </VStack>
  )
}

export default Dashboard
