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
        <Text fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight={200} mb={4} fontFamily="DelaGothicOne-Regular">
          New Finance For DataDao
        </Text>
        <Text fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} fontWeight="medium" fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
          Build your research group and self-fund your contributors
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
