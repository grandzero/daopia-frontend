import React from 'react'
// import { Flex, useColorModeValue, Spacer, Heading } from '@chakra-ui/react'
import { Box, Flex, Text, Button, useColorMode, IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { SITE_NAME } from 'utils/config'
import { LinkComponent } from './LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'
import { PassportScore } from './PassportScore'
import { Web3Button } from '@web3modal/react'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const className = props.className ?? ''
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box bg={colorMode === 'light' ? 'teal.500' : 'gray.800'} px={4} py={2} shadow="md" color={colorMode === 'light' ? 'white' : 'gray.200'}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="bold" fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
          Daopia
        </Text>
        <Flex alignItems="center">
          <IconButton
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            variant="outline"
            colorScheme="teal"
            fontSize="20px"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            ml={4}
            mr={15}
          />
          <Web3Button icon="hide" label="Connect" />
          {/* <Text
            fontSize="lg"
            fontWeight="medium"
            ml={4}
            fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            onClick={() => console.log('Connect Wallet')}>
            Connect Wallet
          </Text> */}
        </Flex>
      </Flex>
    </Box>
    // <Flex as="header" className={className} bg={useColorModeValue('gray.100', 'gray.900')} px={4} py={2} mb={8} alignItems="center">
    //   <LinkComponent href="/">
    //     <Heading as="h1" size="md">
    //       {SITE_NAME}
    //     </Heading>
    //   </LinkComponent>

    //   <Spacer />

    //   <Flex alignItems="center" gap={4}>
    //     <PassportScore />
    //     <Web3Button icon="hide" label="Connect" />
    //     <ThemeSwitcher />
    //   </Flex>
    // </Flex>
  )
}
