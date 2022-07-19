import React from 'react'
import { useState } from 'react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, Button, InputRightElement, Container, Center, Box, Image } from '@chakra-ui/react'



function SignIn() {

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
      <Container minW="100%" h="100vh">

        <Container maxW="30%" minH="100vh" display="flex" flexDir="column" justifyContent="center" alignItems="center" float="left">
          <FormControl >
            <InputGroup>
              <FormLabel>Username or email</FormLabel>
              <Input />
            </InputGroup>

            <br />

            <InputGroup>
              <FormLabel>Password</FormLabel>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
              />
              <InputRightElement w="10x" paddingRight="10px">
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Center paddingTop="20px">
              <Button type='submit' w="30%">
                Login
              </Button>
            </Center>
          </FormControl>         
        </Container>

        <Container size="100%" maxW="70%" minH="100vh" display="flex" flexDir="column" justifyContent="center" alignItems="center" float="right">
          <Image display="flex" justifyContent="flex-end" align="center" src="https://estaticos.muyinteresante.es/uploads/images/test/5899d3b75cafe85ef18b4568/test-libros0.jpg" alt="Imagen" />
        </Container>

      </Container>

    </>
  )
}

export default SignIn