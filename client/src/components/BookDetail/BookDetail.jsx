import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { getDetails } from '../../../redux/actions'
import { Box, Container, Stack, Text, Image, Flex, VStack, Button, Heading, SimpleGrid, StackDivider, useColorModeValue, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { TiShoppingCart } from "react-icons/ti"
import StarRatings from "react-star-ratings"

function handleonclick() {
  alert("Branch develop deleted successfully")
}


function BookDetail(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDetails(props.match.params.id))
  }, [dispatch])

  let detail = useSelector((state) => state.details)
  console.log(detail, "Detalless")


  return (

    <Container align={"center"} bg={"lightgray"} minW={"100%"} minH={"90vh"}>

    <Box maxW={'7xl'}>

    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 23, lg: 24 }}>

      <Flex paddingTop={{sm: "45px", base: "45px"}}>
        <Image
          rounded={'md'}
          alt={'book image'}
          src={detail?.image}
          fit={'container'}
          align={'center'}
          w={'100%'}
          h={{ base: '100%', sm: '400px', lg: '680px' }}
        />
      </Flex>
      <Stack justify ={"space-between"} spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={300}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            {detail?.title}
          </Heading>
          
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
          }>
          <VStack color={useColorModeValue('gray.500', 'gray.400')} fontWeight={'300'} justify={"space-evenly"} align={"center"} flexDir={"row"} spacing={{ base: 2, sm: 4 }}>
            
            <Text>            
                Author:             
              <Text>
                {detail?.authors}
              </Text>
            </Text>

            <Text paddingBottom={"15px"}>
              Rating:
              <Text>
              <StarRatings starDimension="20px" name="react-star-rating" rating={detail?.rating ? detail.rating : 0} totalStars={5} starRatedColor="yellow" />
              </Text>
            </Text>
            

          </VStack>
        
        </Stack>

      <Stack flexDir={"row"}>

          <Text
            mt={2}
            py={'3'}         
            w="45%"
            fontSize={{ base: '1xl', sm: '1xl', lg: '2xl' }}>
            Price: {detail?.price ? "$" + detail?.currency + " " + detail?.price : "No existe el precio"}
          </Text>

        <Button
          onClick= {handleonclick}
          rounded={'100px'}
          w={'50%'}
          mt={8}
          size={'lg'}
          py={'7'}
          bg={useColorModeValue('gray.900', 'gray.50')}
          color={useColorModeValue('white', 'gray.900')}
          leftIcon={<TiShoppingCart />}
          textTransform={'uppercase'}
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}>
          Add to cart
        </Button>

      </Stack>

        <Stack direction="row" alignItems="center" justifyContent={'center'}>
        <Accordion minW={"100%"} allowMultiple padding={"15px"}>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Description
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>  
  
    <div
									dangerouslySetInnerHTML={{
										__html: detail?.description,
									}}
								/>
                  
    </AccordionPanel>
  </AccordionItem>
  </Accordion>

        </Stack>

      </Stack>
      
    </SimpleGrid>
  </Box>
  </Container>
  )
}

export default BookDetail