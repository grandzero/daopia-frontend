import { Box, Container, Heading, Input, Button, Text, VStack, Center, useToast, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useWriteDaopia } from 'hooks/useWriteDaopia'
import axios from 'axios'
import { Database } from '@tableland/sdk'
import { useAccount } from 'wagmi'
const MakeContribution = ({ daoData }: any) => {
  const router = useRouter()
  const { dao } = daoData
  const [step, setStep] = useState(1)
  const [description, setDescription] = useState('')
  const [Loading, setLoading] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const toast = useToast()
  const contract = useWriteDaopia()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const { address } = useAccount()
  const handleDescriptionSubmit = () => {
    if (description) setStep(2)
  }

  const handleOnchainRecord = async () => {
    try {
      setLoading(true)
      let result = await contract.makeProposalToDao(dao, description)
      await result.wait()

      setStep(3)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile: any = event.target.files?.[0]

    setFile(uploadedFile)
  }

  const handleSubmit = async () => {
    // Check if the file is selected and description is entered
    if (!file || !description) {
      alert('Please enter the description and select a file')
      return
    }
    setLoading(true)
    let id: any
    try {
      const db = new Database({ autoWait: false })
      const { results } = await db.prepare(`SELECT * FROM ${process.env.NEXT_PUBLIC_DAOPIA_TABLENAME};`).all()

      let contributionDetails: any = results.find(
        (item: any) =>
          item.cid == 'cid' &&
          item.dao.toLowerCase() == dao.toLowerCase() &&
          //@ts-ignore
          item.contributer.toLowerCase() == address.toLowerCase() &&
          item.description == description
      )
      if (contributionDetails) {
        id = contributionDetails.id
      } else {
        toast({
          title: 'Error uploading file: Please make sure your onchain record finalized',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setLoading(false)
        return
      }
    } catch (e) {
      setLoading(false)
      return
    }
    // Create a FormData object
    const formData = new FormData()

    // Append the file, dao, and a random id to the FormData object
    formData.append('file', file)
    formData.append('dao', dao) // Replace 'dao' with the actual dao value
    formData.append('id', id) // Append a random id

    try {
      // Make the POST request to the server
      const response = await axios.post('http://localhost:1337/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Handle the response
      if (response.status === 201) {
        setStep(4)
        toast({
          title: 'Contribution Recorded',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // Navigate to another page or reset the form as needed
      } else {
        console.error('Error uploading file:', response.data)
        console.log(response?.data?.error)
        //@ts-ignore
        console.log(response?.error)
        console.log(response)
        toast({
          title: 'Error uploading file:',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

      setLoading(false)
    } catch (error) {
      console.error('Network error:', error)
      toast({
        title: 'Network error:',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    setLoading(false)
  }

  //   const handleSubmit = () => {
  //     // Send the form data to the backend
  //     // ...
  //     setStep(4)
  //     toast({
  //       title: 'Contribution Recorded',
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //     })
  //   }

  return (
    <Container maxW="container.md" py={12} minH="100vh" centerContent>
      <Box mt="200" p={8} borderRadius="md" border="2px" borderColor={borderColor} boxShadow="lg" width="100%" bg={bgColor}>
        <VStack spacing={6} align="stretch">
          {step === 4 ? (
            <Heading mb={4} fontSize="3xl" textAlign="center">
              Contribution Recorded
            </Heading>
          ) : (
            <>
              <Heading mb={4} fontSize="3xl" textAlign="center">
                Make Contribution for DAO:
              </Heading>
              <Text fontSize={'2xl'} textAlign={'center'}>
                {dao}
              </Text>
              {step === 1 && (
                <VStack spacing={4} align="stretch">
                  <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  <Center>
                    <Button onClick={handleDescriptionSubmit} colorScheme="teal">
                      Continue
                    </Button>
                  </Center>
                </VStack>
              )}
              {step === 2 && (
                <VStack spacing={4} align="stretch">
                  <Input placeholder="Description" disabled value={description} onChange={(e) => setDescription(e.target.value)} />
                  <Center>
                    <Button disabled={Loading} onClick={handleOnchainRecord} colorScheme="teal">
                      {Loading ? 'Waiting...' : 'Record Contribution'}
                    </Button>
                  </Center>
                </VStack>
              )}
              {step === 3 && (
                <VStack spacing={4} align="stretch">
                  <Input type="file" onChange={handleFileUpload} />
                  <Center>
                    <Button disabled={Loading} onClick={handleSubmit} colorScheme="teal">
                      {Loading ? 'Uploading...' : 'Submit Contribution'}
                    </Button>
                  </Center>
                </VStack>
              )}
            </>
          )}
        </VStack>
      </Box>
    </Container>
  )
}

export async function getServerSideProps(context: any) {
  const { dao } = context.params
  let daoData = { dao }
  return {
    props: {
      daoData,
    },
  }
}

export default MakeContribution
