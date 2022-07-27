import { HStack, Text, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";

export const PriceTag = (props) => {
	const { price, salePrice, rootProps, priceProps, salePriceProps, currency } =
		props;

	return (
		<HStack spacing="1" {...rootProps}>
			<Text fontWeight={"bold"}>{currency == "USD" ? "US$ " : "AR$ "}</Text>
			<Price isOnSale={!!salePrice} textProps={priceProps}>
				{price}
			</Price>
			{salePrice && (
				<SalePrice {...salePriceProps}>{"$" + salePrice}</SalePrice>
			)}
		</HStack>
	);
};

const Price = (props) => {
	const { isOnSale, children, textProps } = props;
	const defaultColor = mode("gray.700", "gray.400");
	const onSaleColor = mode("gray.400", "gray.700");
	const color = isOnSale ? onSaleColor : defaultColor;
	return (
		<Text
			as="span"
			fontWeight="medium"
			color={color}
			textDecoration={isOnSale ? "line-through" : "none"}
			{...textProps}
		>
			{children}
		</Text>
	);
};

const SalePrice = (props) => (
	<Text
		as="span"
		fontWeight="semibold"
		color={mode("gray.800", "gray.100")}
		{...props}
	/>
);
