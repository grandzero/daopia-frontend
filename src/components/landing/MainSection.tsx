import { Box, Text, Center, useColorMode, Flex, Button } from '@chakra-ui/react'

const MainSection = () => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      position="relative"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100%"
      bg={colorMode === 'light' ? 'teal.100' : 'gray.900'}
      color={colorMode === 'light' ? 'gray.800' : 'gray.100'}>
      <Box textAlign="center" zIndex="1">
        <Text fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight="extrabold" mb={4} fontFamily="DelaGothicOne-Regular">
          New Finance For DataDao
        </Text>
        <Text fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} fontWeight="medium" fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
          Build your research group and self-fund your contributors
        </Text>
      </Box>
      <Button
        position="absolute"
        right="0"
        top="0"
        bottom="0"
        w="50px"
        bg={colorMode === 'light' ? 'linear-gradient(45deg, #7928CA, #FF0080)' : 'gray.800'}
        color={colorMode === 'light' ? 'white' : 'gray.200'}
        _hover={{ bg: colorMode === 'light' ? 'linear-gradient(45deg, #6C1FB2, #FF0072)' : 'gray.700' }}
        onClick={() => console.log('Connect Wallet')}>
        Connect Wallet
      </Button>
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
