import { Box, Flex, Heading, Text, useColorMode, Icon, Stack, VStack } from '@chakra-ui/react'
import { InfoIcon, AtSignIcon, LockIcon, TimeIcon, RepeatIcon } from '@chakra-ui/icons'

const DaoHowItWorksSection = () => {
  const { colorMode } = useColorMode()
  const bgColor = {
    light: 'linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1))',
    dark: 'linear-gradient(45deg, rgba(75, 0, 130, 0.7), rgba(148, 0, 211, 0.7))',
  }
  const textColor = { light: 'gray.700', dark: 'gray.200' }
  const glassBg = { light: 'rgba(255, 255, 255, 0.1)', dark: 'rgba(0, 0, 0, 0.1)' }
  const steps = [
    {
      title: 'Step 1: Provide Basic Information',
      description: 'Enter the name, description, logo URL, and communication string (email or URL) for your DAO.',
      icon: InfoIcon,
    },
    {
      title: 'Step 2: Set Payment Details',
      description: 'Specify the price, period, and payment type (native coin or token) for your DAO.',
      icon: TimeIcon,
    },
    {
      title: 'Step 3: Configure Renewal & Replication',
      description: 'Provide details for renewal and replication to complete the registration process.',
      icon: RepeatIcon,
    },
  ]

  return (
    <Box color={textColor[colorMode]} py={12}>
      <Flex direction="column" align="center">
        <Heading mb={6} fontWeight={200} fontFamily="DelaGothicOne-Regular" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
          How DAOs Register
        </Heading>
        <VStack spacing={8} w={{ base: '90%', md: '70%' }}>
          {steps.map((step, index) => (
            <Flex
              key={index}
              direction={{ base: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
              align="center"
              justify="center"
              p={6}
              borderRadius="md"
              boxShadow="lg"
              bg={glassBg[colorMode]}
              backdropFilter="blur(10px)"
              w="full">
              <Box flexShrink={0}>
                <Icon as={step.icon} boxSize={{ base: '64px', md: '128px' }} />
              </Box>
              <Box
                mt={{ base: 2, md: 0 }}
                ml={{ md: index % 2 === 0 ? 4 : 0 }}
                mr={{ md: index % 2 === 0 ? 0 : 4 }}
                textAlign={{ base: 'center', md: 'left' }}
                w={{ base: 'full', md: '60%' }}>
                <Heading size="lg" mb={2}>
                  {step.title}
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }}>{step.description}</Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Box>
  )
}

export default DaoHowItWorksSection
