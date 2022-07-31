import React from 'react';
import { PagButton } from './PagButton/PagButton';
import { Flex, Icon } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { CurrentPagBtn } from './PagButton/CurrentPageBtn';

export const Paging = ({
	BooksPerPage,
	TotalBooksLength,
	setCurrentPage,
	CurrentPage,
}) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(TotalBooksLength / BooksPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<Flex w='full' alignItems='center' justifyContent='center'>
			<Flex>
				<PagButton
					onClick={() => {
						if (CurrentPage != 1) setCurrentPage(CurrentPage - 1);
					}}
				>
					<Icon
						as={IoIosArrowBack}
						color='gray.700'
						boxSize={4}
						_dark={{
							color: 'gray.200',
						}}
					/>
				</PagButton>
				{pageNumbers &&
					pageNumbers.map((e) =>
						CurrentPage === e ? (
							//Renderiza currentPage
							<CurrentPagBtn key={e} p onClick={() => setCurrentPage(e)}>
								{e}
							</CurrentPagBtn>
						) : (
							<PagButton key={e} p onClick={() => setCurrentPage(e)}>
								{e}
							</PagButton>
						)
					)}
				<PagButton
					onClick={() => {
						if (CurrentPage != Math.ceil(TotalBooksLength / BooksPerPage))
							setCurrentPage(CurrentPage + 1);
					}}
				>
					<Icon
						as={IoIosArrowForward}
						color='gray.700'
						_dark={{
							color: 'gray.200',
						}}
						boxSize={4}
					/>
				</PagButton>
			</Flex>
		</Flex>
	);
};
