import { Box, Text, Center, useColorMode, Flex, Button } from '@chakra-ui/react'

const MainSection = () => {
  const { colorMode } = useColorMode()
  const gradient = {
    light: 'linear-gradient(45deg, #FFD700, #FF8C00)',
    dark: 'linear-gradient(45deg, #4B0082, #9400D3)',
  }
  return (
    <Flex
      position="relative"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100%"
      bgGradient={gradient[colorMode]}
      color={colorMode === 'light' ? 'gray.800' : 'gray.100'}>
      <Box textAlign="center" zIndex="1" w={'60%'}>
        <Text fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight={200} mb={4} fontFamily="DelaGothicOne-Regular">
          Daopia: Empowering DAOs, Streamlining Finance
        </Text>
        <Text fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} fontWeight="medium" fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
          Empower Your DAO with Daopia: Elevate Financing, Streamline Contributions, and Unlock Exclusive Resources - All in One Dynamic Dashboard!
        </Text>
      </Box>
    </Flex>
    // <Flex
    //   position="relative"
    //   direction="column"
    //   align="center"
    //   justify="center"
    //   h="95vh"
    //   w="100%"
    //   bg={colorMode === 'light' ? 'teal.100' : 'gray.900'}
    //   color={colorMode === 'light' ? 'gray.800' : 'gray.100'}>
    //   <Box textAlign="center" zIndex="1">
    //     <Text fontSize="7xl" fontWeight="extrabold" mb={4} fontFamily="DelaGothicOne-Regular">
    //       Finance Dashboard For DataDaos
    //     </Text>
    //     <Text fontSize="2xl" fontWeight="medium" fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
    //       Build your research group and self-fund your contributors
    //     </Text>
    //   </Box>
    // </Flex>
  )
}

export default MainSection
