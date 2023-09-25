import { Box, Flex, Link, Icon, useColorMode } from '@chakra-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const { colorMode } = useColorMode()
  const textColor = { light: 'gray.700', dark: 'gray.200' }

  return (
    <Box bg={colorMode === 'light' ? 'gray.50' : 'gray.900'} py={4}>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <Flex align="center" mb={{ base: 2, md: 0 }}>
          <Link href="https://github.com/your-github-username" isExternal mr={4}>
            <Icon as={FaGithub} boxSize={6} />
          </Link>
          <Link href="https://twitter.com/your-twitter-handle" isExternal>
            <Icon as={FaTwitter} boxSize={6} />
          </Link>
        </Flex>
        <Link href="https://www.encode.club/open-data-hack" isExternal textAlign={{ base: 'center', md: 'right' }} color={textColor[colorMode]}>
          Created for <strong>Encode Club Open Data Hack</strong>
        </Link>
      </Flex>
    </Box>
  )
}

export default Footer
