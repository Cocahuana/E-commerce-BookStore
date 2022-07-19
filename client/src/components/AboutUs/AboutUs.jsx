import React from 'react'
import {
   Heading,
   Text,
   Box,
   Container,
   Avatar, 
   AvatarBadge, 
   AvatarGroup,
   Divider,
   Wrap,
   WrapItem
 } from '@chakra-ui/react'

function AboutUs() {
  return (
    <Container  bg='#2E3532' m='0' color='white' maxW='100%' h='80vh' gap='10px' centerContent>
      <Heading>What's E-Bookstore?</Heading>
      <Box padding='4' bg='#8B2635' color='white' maxW='md'>
        It's an online bookstore where you can save, comment, rate and buy your favorite digital and physical books
      </Box>
      <Divider orientation='horizontal' />
      <Heading>Why E-Bookstore?</Heading>
      <Box padding='4' bg='#8B2635' color='white' maxW='md'>
        Because it painted
      </Box>
      <Heading>Our Team</Heading>
      <Divider orientation='horizontal' />
      <Wrap>
        <WrapItem>
          <Avatar name='Mati Farias' src='https://media-exp1.licdn.com/dms/image/C4E03AQG1T43fQUxrXg/profile-displayphoto-shrink_200_200/0/1620223234059?e=1663804800&v=beta&t=XLAAn-oViBmX17S-k6tsiMCu1G0VQw1AEW6AMcf3Tn8' />
        </WrapItem>
        <WrapItem>
          <Avatar name='Rodri Soriano' src='https://media-exp1.licdn.com/dms/image/D4D35AQGTIKySsYzJ3A/profile-framedphoto-shrink_200_200/0/1652569710679?e=1658808000&v=beta&t=ZWHsY3kI_3HVV3jXGw2g0uX9UEs0L3FmhdVJapaBZFY' />
        </WrapItem>
        <WrapItem>
          <Avatar name='Luciano Carducci' src='https://media-exp1.licdn.com/dms/image/C5603AQGu6VKsTDyi4Q/profile-displayphoto-shrink_200_200/0/1614379338899?e=1663804800&v=beta&t=yVuO9DQMrYdymoEH95aGdV9Cb_EEH1-7eHJ4BTWGZVU' />
        </WrapItem>
        <WrapItem>
          <Avatar name='Trini Garcia' src='https://media-exp1.licdn.com/dms/image/C4D03AQEcb0vchcf9lw/profile-displayphoto-shrink_200_200/0/1654380893259?e=1663804800&v=beta&t=jeR_ICRGp6ZpObUz1D6044w77Jg2o8FFhwVBNPo_g7Y' />
        </WrapItem>
        <WrapItem>
          <Avatar name='Ale Diaz' src='https://media-exp1.licdn.com/dms/image/C5603AQEpi5VxOr05rw/profile-displayphoto-shrink_200_200/0/1632938782612?e=1663804800&v=beta&t=LEz42gvrQXgiDn8A5QuF5sP6LG4F4ZeqoWATjN5nG-w' />
        </WrapItem>
        <WrapItem>
          <Avatar name='Gabi Denis' src='https://media-exp1.licdn.com/dms/image/D4D35AQEjfcHMzjYW4g/profile-framedphoto-shrink_200_200/0/1652637831839?e=1658808000&v=beta&t=Kcb-Rfxi9a2ZYXtljBS_rV8Klg4SBENShUDb2ayBX88' />
        </WrapItem>
        <WrapItem>
          <Avatar name='Eze Dominguez' src='https://media-exp1.licdn.com/dms/image/C4D03AQEfHUP7juANMA/profile-displayphoto-shrink_200_200/0/1642718526971?e=1663804800&v=beta&t=14Umm55V3lGSm4PmuR7T-aDIbSvrOmb17aBaii8FgK8' />
        </WrapItem>
      </Wrap>
    </Container>
  )
}

export default AboutUs