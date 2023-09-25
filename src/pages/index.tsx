import { Text } from '@chakra-ui/react'
import FeaturesSection from 'components/landing/FeaturesSection'
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
      <FeaturesSection />
      {/* <HeadingComponent as="h2">Next.js + Ethereum starter kit</HeadingComponent>
        {isConnected ? <Text>Quickly ship Web3 Apps ⚡</Text> : <Text>Connect your wallet</Text>}
        <Text py={4}>
          <LinkComponent href="examples">View examples</LinkComponent> to bootstrap development.
        </Text> */}
    </>
  )
}
