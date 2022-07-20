import { Box } from '@chakra-ui/react'
import * as React from 'react'
import BookHolder from '../BookHolder/BookHolder'
import Book from '../Book'

export const BookShelf = () => (
    <Box
      maxW="7xl"
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
    >
      <BookHolder>
        {products.map((product) => (
          <Book key={product.id} product={product} />
        ))}
      </BookHolder>
    </Box>
  )