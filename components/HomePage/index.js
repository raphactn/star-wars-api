import Card from "../Card";
import { Center, Square, Circle, Text, Stack } from '@chakra-ui/react'
import Image from "next/dist/client/image";
import { Container } from "@chakra-ui/react";


const HomePage = () => {
    return (
        <>
            <Container maxW='7xl' color='white' minWidth={'500px'}>
                <Center marginTop={100} display={"flex"} flexDirection={'column'} >
                    <Image
                        src={'/logo.png'}
                        width={300}
                        height={150}
                        alt={'logo'}
                    />
                    <Text textAlign={'center'} fontSize='2xl' marginTop={10}>Encontre seus personagens favoritos da saga Star Wars!</Text>
                </Center>
                <Card color='white' />
            </Container>
        </>
    )
};
export default HomePage;