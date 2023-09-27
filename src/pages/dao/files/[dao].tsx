// pages/dao/files/[dao].tsx

import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Icon,
  useColorModeValue,
  Toast,
  useToast,
} from '@chakra-ui/react'
import { FaDownload } from 'react-icons/fa' // Importing download icon
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useReadTable } from 'hooks/useReadTable'
import * as lighthouse from '@lighthouse-web3/sdk'
import { ethers } from 'ethers-new'
interface FileData {
  contributer: string
  cid: string
  description: string
  status: number
  url?: string
}

const encryptionSignature = async () => {
  //@ts-ignore
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()
  console.log('Message Requested')
  const messageRequested = (await lighthouse.getAuthMessage(address)).data.message
  console.log(messageRequested)
  const signedMessage = await signer.signMessage(messageRequested)
  console.log('Sign complete', signedMessage)
  return {
    signedMessage: signedMessage,
    publicKey: address,
  }
}

const DaoFilesPage: React.FC = ({ daoData }: any) => {
  //   const router = useRouter()
  const { dao } = daoData
  const toast = useToast()
  const [files, setFiles] = useState<FileData[]>([])
  const [downloadUrl, setDownloadUrl] = useState<string>('')
  const queryResult = useReadTable()
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)')
  const borderColor = useColorModeValue('teal.500', 'blue.500')

  /* Decrypt file */
  const decrypt = async (cid: string) => {
    // Fetch file encryption key
    try {
      const { publicKey, signedMessage } = await encryptionSignature()
      /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
      const keyObject: any = await lighthouse.fetchEncryptionKey(cid, publicKey, signedMessage)
      console.log('encryption key received')
      // Decrypt file
      /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */

      const fileType = 'image/jpeg'
      const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType)
      console.log(decrypted)
      /*
      Response: blob
    */

      // View File
      const url = URL.createObjectURL(decrypted)
      let newFiles = [...files]
      newFiles.forEach((file) => {
        if (file.cid === cid) {
          file.url = url
        }
      })
      setFiles(newFiles)
      toast({
        title: 'Success',
        description: 'File decrypted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      return url
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Error decrypting file: You are not permissioned',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (queryResult) {
      // Fetch the file data related to the dao and set it to the state
      // Replace the following line with the actual data fetching logic
      console.log(queryResult)
      setFiles(queryResult)
      //   setFiles([
      //     {
      //       contributor: 'Contributor1',
      //       cid: 'CID1',
      //       description: 'Description1',
      //     },
      //     {
      //       contributor: 'Contributor2',
      //       cid: 'CID2',
      //       description: 'Description2',
      //     },
      //   ])
    }
  }, [queryResult])

  const handleDownload = (cid: string) => {
    // Implement the download logic here
    decrypt(cid)
    console.log(`Downloading file with CID: ${cid}`)
  }

  return (
    <Container maxW="container.xl" py={12} minH="100vh" display="flex" flexDirection="column" justifyContent="center">
      <Box mb={8} p={5} width="100%">
        <Heading mb={4} fontSize={{ base: '2xl', md: '3xl' }}>
          Files for DAO: {dao}
        </Heading>
        <Table bg={bgColor} borderRadius="md" border="2px" borderColor={borderColor} boxShadow="lg" variant="simple" size="md" width="100%">
          <TableCaption>Only DAO members can encrypt files</TableCaption>
          <Thead>
            <Tr>
              <Th>Contributor</Th>
              <Th>CID</Th>
              <Th>Description</Th>
              <Th isNumeric>Status</Th>
              <Th isNumeric>Download</Th>
            </Tr>
          </Thead>
          <Tbody>
            {files.map((file, index) => (
              <Tr key={index}>
                <Td>{file.contributer.slice(0, 13)}...</Td>
                <Td>{file.cid.slice(0, 13)}...</Td>
                <Td>{file.description}</Td>
                <Td isNumeric>{file?.status ? 'Approved' : 'Pending'}</Td>
                <Td isNumeric>
                  {file?.url ? (
                    <a href={file.url}>Download File</a>
                  ) : (
                    <Button onClick={() => handleDownload(file.cid)} colorScheme="teal" leftIcon={<Icon as={FaDownload} />}>
                      Download
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
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

export default DaoFilesPage
