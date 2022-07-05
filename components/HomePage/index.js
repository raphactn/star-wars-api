import Card from "../Card";
import { Center, Text, Box, Divider } from '@chakra-ui/react'
import Image from "next/dist/client/image";
import { Container } from "@chakra-ui/react";

const HomePage = () => {
    return (
        <>
        <Container maxW='7xl' color='white'>
            <Center marginTop={50} display={"flex"} flexDirection={'column'}>
                <Image
                    src={'/logo.png'}
                    width={250}
                    height={110}
                    alt={'logo'}
                />
                <Text textAlign={'center'} fontSize='2xl' marginTop={10}>Encontre seus personagens favoritos da saga Star Wars!</Text>
            </Center>
            <Card color='white' />
            <Divider marginTop={10} orientation='horizontal' />
            <Box margin={6}>
                <Text textAlign={'center'} fontSize='1xl'>Developed by: <a href="https://www.linkedin.com/in/raphael-caetano-39aa8519a/" target={'_blank'}>Raphael Caetano</a></Text>
            </Box>
        </Container>
        </>
    )
};
export default HomePage;