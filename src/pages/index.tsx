import { Box, Text } from '@chakra-ui/react'
import FeaturesSection from 'components/landing/FeaturesSection'
import DaoHowItWorksSection from 'components/landing/HowItWorksDaoSection'
import UserHowItWorksSection from 'components/landing/HowItWorksUserSection'
import MainSection from 'components/landing/MainSection'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useAccount, useSignMessage } from 'wagmi'
export default function Home() {
  const { isConnected } = useAccount()
  return (
    <>
      {/* <Head /> */}

      <MainSection />
      <Box borderBottom="2px solid" borderColor="gray.200" />
      <FeaturesSection />
      <Box borderBottom="2px solid" borderColor="gray.200" />
      <DaoHowItWorksSection />
      <Box borderBottom="2px solid" borderColor="gray.200" />
      <UserHowItWorksSection />
      {/* <HeadingComponent as="h2">Next.js + Ethereum starter kit</HeadingComponent>
        {isConnected ? <Text>Quickly ship Web3 Apps ⚡</Text> : <Text>Connect your wallet</Text>}
        <Text py={4}>
          <LinkComponent href="examples">View examples</LinkComponent> to bootstrap development.
        </Text> */}
    </>
  )
}
