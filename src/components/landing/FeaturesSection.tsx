import { Box, Flex, Heading, Text, useColorMode, Icon, Stack } from '@chakra-ui/react'
import { CheckCircleIcon, InfoIcon, TimeIcon, DownloadIcon, AddIcon } from '@chakra-ui/icons'

const FeaturesSection = () => {
  const { colorMode } = useColorMode()
  const textColor = { light: 'gray.700', dark: 'gray.200' }

  const features = [
    {
      title: 'DAO Registration',
      description:
        'With Daopia, you have the convenience of effortlessly registering your DAO, a process streamlined for user accessibility and efficiency. Once registered, you can begin to receive monthly payments, ensuring a consistent and reliable source of income for your organization. Daopia is designed to facilitate this process, making it simpler for users to manage their DAOs and financial transactions, thereby enhancing the overall user experience.',
      icon: CheckCircleIcon,
    },
    {
      title: 'User Dashboard',
      description:
        'Utilize a user-friendly dashboard, designed to provide a seamless experience, where you can effortlessly view all registered DAOs at your convenience. Daopia not only facilitates the viewing of DAOs but also enables you to execute payments with ease. Additionally, it offers the functionality to download folders that are specific to each DAO, ensuring that you have access to all the necessary documents and information.',
      icon: InfoIcon,
    },
    {
      title: 'Monthly Payments',
      description:
        'Lend your support to the DAOs of your choice through secure and consistent monthly payments, ensuring a stable and reliable contribution to the development and sustainability of the selected organizations. This method of support not only fosters the growth of the DAOs but also contributes to building a foundation of trust and reliability through secure transactions.',
      icon: TimeIcon,
    },
    {
      title: 'Contribution Requests',
      description:
        'Initiate a contribution request to actively engage in fostering the development of your selected DAOs. By doing so, you become a significant part of their growth journey, contributing not only financially but also by being an active participant in their evolution and success. This step allows you to be more involved and have a direct impact on the progress of the DAOs you believe in.',
      icon: AddIcon,
    },
    {
      title: 'DAO-specific Folders',
      description:
        'Procure folders that are meticulously compiled with files encrypted exclusively for each DAO, containing specific information and resources. This ensures that you have secure and privileged access to vital details and tools that are integral for each distinct DAO. The encryption guarantees the confidentiality and integrity of the information, allowing for a more secure and informed interaction with the DAOs.',
      icon: DownloadIcon,
    },
  ]
  const bgColor = {
    light: 'linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1))',
    dark: 'linear-gradient(45deg, rgba(75, 0, 130, 0.7), rgba(148, 0, 211, 0.7))',
  }

  return (
    <Box bgGradient={bgColor[colorMode]} color={textColor[colorMode]} py={12}>
      <Flex direction="column" align="center">
        <Heading mb={6} fontWeight={200} fontFamily="DelaGothicOne-Regular" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
          Features
        </Heading>
        <Stack spacing={8} w={{ base: '90%', md: '70%' }}>
          {features.map((feature, index) => (
            <Flex
              key={index}
              direction={{ base: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
              align="center"
              justify="center"
              mb={{ base: 4, md: 0 }}
              w="full">
              <Box flexShrink={0}>
                <Icon as={feature.icon} boxSize={{ base: '64px', md: '150px' }} />
              </Box>
              <Box
                mt={{ base: 2, md: 0 }}
                ml={{ md: index % 2 === 0 ? 35 : 0 }}
                mr={{ md: index % 2 === 0 ? 0 : 35 }}
                textAlign={{ base: 'center', md: 'left' }}
                w={{ base: 'full', md: '60%' }} // Set a fixed width for medium and larger screens
              >
                <Heading size="xl" mb={2}>
                  {feature.title}
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'xl' }}>{feature.description}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </Box>
  )
}

export default FeaturesSection
