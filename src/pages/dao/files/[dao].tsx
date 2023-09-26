// pages/dao/files/[dao].tsx

import { Box, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button, Icon, useColorModeValue } from '@chakra-ui/react'
import { FaDownload } from 'react-icons/fa' // Importing download icon
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface FileData {
  contributor: string
  cid: string
  description: string
}

const DaoFilesPage: React.FC = () => {
  const router = useRouter()
  const { dao } = router.query
  const [files, setFiles] = useState<FileData[]>([])

  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)')
  const borderColor = useColorModeValue('teal.500', 'blue.500')

  useEffect(() => {
    if (dao) {
      // Fetch the file data related to the dao and set it to the state
      // Replace the following line with the actual data fetching logic
      setFiles([
        {
          contributor: 'Contributor1',
          cid: 'CID1',
          description: 'Description1',
        },
        {
          contributor: 'Contributor2',
          cid: 'CID2',
          description: 'Description2',
        },
      ])
    }
  }, [dao])

  const handleDownload = (cid: string) => {
    // Implement the download logic here
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
              <Th isNumeric>Download</Th>
            </Tr>
          </Thead>
          <Tbody>
            {files.map((file, index) => (
              <Tr key={index}>
                <Td>{file.contributor}</Td>
                <Td>{file.cid}</Td>
                <Td>{file.description}</Td>
                <Td isNumeric>
                  <Button onClick={() => handleDownload(file.cid)} colorScheme="teal" leftIcon={<Icon as={FaDownload} />}>
                    Download
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  )
}

export default DaoFilesPage
