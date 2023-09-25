import { Box, Flex, Heading, Text, useColorMode, Icon, Stack, VStack } from '@chakra-ui/react'
import { InfoIcon, AddIcon, DownloadIcon, TimeIcon, RepeatIcon } from '@chakra-ui/icons'

const UserHowItWorksSection = () => {
  const { colorMode } = useColorMode()
  const bgColor = {
    light: 'linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1))',
    dark: 'linear-gradient(45deg, rgba(75, 0, 130, 0.7), rgba(148, 0, 211, 0.7))',
  }
  const textColor = { light: 'gray.700', dark: 'gray.200' }
  const glassBg = { light: 'rgba(255, 255, 255, 0.1)', dark: 'rgba(0, 0, 0, 0.1)' }
  const steps = [
    {
      title: 'Step 1: Explore DAOs',
      description: 'Browse through the registered DAOs, explore their objectives, and find a DAO that aligns with your interests or expertise.',
      icon: InfoIcon, // Replace with an appropriate icon for exploring or searching
    },
    {
      title: 'Step 2: Contribute to a DAO',
      description:
        'Select a DAO and contribute by making monthly payments. Choose the payment type, amount, and period according to the DAO’s requirements.',
      icon: TimeIcon, // Replace with an appropriate icon for payments or contributions
    },
    {
      title: 'Step 3: Access Resources & Collaborate',
      description:
        'After contributing, access DAO-specific folders, download resources, and collaborate with other contributors and members of the DAO.',
      icon: DownloadIcon, // Replace with an appropriate icon for accessing resources or collaboration
    },
    {
      title: 'Step 4: Start a Contribution Request',
      description: 'Initiate a contribution request to propose new ideas, projects, or research initiatives and get funding or support from the DAO.',
      icon: AddIcon, // Replace with an appropriate icon for ideas or requests
    },
  ]

  return (
    <Box bg={colorMode === 'light' ? 'gray.300' : 'gray.900'} color={textColor[colorMode]} py={12}>
      <Flex direction="column" align="center">
        <Heading mb={6} fontWeight={200} fontFamily="DelaGothicOne-Regular" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
          Users & Contributors
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

export default UserHowItWorksSection
