import { useState, useEffect } from 'react'
import { Grid, GridItem, Image, Box, Text, Stack } from '@chakra-ui/react'
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftAddon, Center, Flex, Spacer } from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import api from '../../pages/api/main'
import { useDisclosure } from '@chakra-ui/react'

const Card = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState([])
    const [character, setCharacter] = useState([])
    const [value, setValue] = useState('');
    const [isLoaded, setIsLoaded] = useState(true)
    const [valueInput, setValueInput] = useState('');
    const [characterId, setCharacterId] = useState();

    useEffect(() => {
        setIsLoaded(true);
        const timer = setTimeout(() => {
            api.get('/all.json')
                .then(response => setData(response.data))
                .catch(err => console.log(err))
                setIsLoaded(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        api.get(`/id/${characterId}.json`)
            .then(response => setCharacter(response.data))
            .catch(err => console.log(err))
    }, [isOpen])

    const speciesList = data.map(item => item.species);
    const uniqueUFList = [...new Set(speciesList)];
    let filter = data

    if (valueInput !== "") {
        filter = data.filter((data) => data.name.toString().toLowerCase().startsWith(valueInput))
    }
    if (value !== "") {
        filter = data.filter((data) => data.species == value)
    }

    return (
        <>
            <Center display={"flex"} flexDirection={'column'}>
                <Flex flexDirection={'row'} alignItems={'end'} gap={2}>
                    <Box>
                        <InputGroup marginTop={10} w={[200, 300, 400, 500, 700]}>
                            <InputLeftAddon children={<SearchIcon w={6} color="black" />} />
                            <Input type='text' placeholder='Search Character' onChange={(e) => setValueInput(e.target.value)} />
                        </InputGroup>
                    </Box>
                    <Spacer />
                    <Box>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color="black">
                                Espécie
                            </MenuButton>
                            <MenuList color="black" maxH={250} overflow={'auto'}>
                                <MenuItem onClick={(e) => setValue("")}>Mostrar Todos</MenuItem>
                                {uniqueUFList.map(info =>
                                    <MenuItem onClick={(e) => setValue(info)}>{info}</MenuItem>
                                )}
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader bg={'#ecc94b'}>{character.name}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box boxSize='150px' marginBottom={10} marginLeft={'auto'} marginRight={'auto'}>
                                <Image src={character.image} borderRadius={5}></Image>
                            </Box>
                            <Stack spacing={1.5}>
                                <Text fontSize='lg' marginTop={5}><b>Gênero:</b> {character.gender}</Text>
                                <Text fontSize='lg' marginTop={5}><b>Espécie:</b> {character.species}</Text>
                                <Text fontSize='lg' marginTop={5}><b>Altura:</b> {character.height}</Text>
                                <Text fontSize='lg' marginTop={5}><b>Cor dos olhos:</b> {character.eyeColor}</Text>
                                <Text fontSize='lg' marginTop={5}><b>Planeta Natal:</b> {character.homeworld}</Text>
                                <Text fontSize='lg' marginTop={5}><b>Mais informações:</b> <a href={character.wiki} target={'_blank'}>{character.wiki}</a></Text>
                            </Stack>
                            <Accordion allowMultiple marginTop={5}>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                <b>Afiliações</b>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel display={'table-caption'}>
                                        {character.affiliations}
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='yellow' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Box marginTop={100} w='100%' p={4} color='white'>
                    <Grid templateColumns={{ md: 'repeat(4, 1fr)', base: 'repeat(2, 1fr)' }} gap={10}>
                        {filter.map(info =>
                            <Skeleton isLoaded={!isLoaded}>
                                <GridItem cursor={'pointer'} onClick={(e) => setCharacterId(info.id)}>
                                    <Image src={info.image} boxSize={[200, 300]} borderRadius={5} onClick={onOpen} />
                                    <Text fontSize='lg' marginTop={5}>{info.name}</Text>
                                </GridItem>
                            </Skeleton>
                        )}
                    </Grid>
                </Box>

            </Center>
        </>

    )
};
export default Card;