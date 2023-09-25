import { Box, Text } from '@chakra-ui/react'
import Dashboard from 'components/Dashboard'
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
      {!isConnected ? (
        <>
          <MainSection />
          <Box borderBottom="2px solid" borderColor="gray.200" />
          <FeaturesSection />
          <Box borderBottom="2px solid" borderColor="gray.200" />
          <DaoHowItWorksSection />
          <Box borderBottom="2px solid" borderColor="gray.200" />
          <UserHowItWorksSection />
        </>
      ) : (
        <Dashboard />
      )}
    </>
  )
}
