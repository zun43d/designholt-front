/* eslint-disable react/display-name */
import React from 'react';
import {
	Button as ChakraButton,
	FormLabel as ChakraFormLabel,
	Input as ChakraInput,
	InputGroup as ChakraInputGroup,
	InputLeftElement as ChakraInputLeftElement,
	IconButton as ChakraIconButton,
	Radio as ChakraRadio,
	RadioGroup as ChakraRadioGroup,
	Stack as ChakraStack,
	Select as ChakraSelect,
	Link as ChakraLink,
} from '@chakra-ui/react';

// const focusBoxShadow = '0 0 0 3px #D6BCFA';
const focusBoxShadow = '0 0 0 3px rgba(159, 122, 234, 0.6)';
const focusBorderColor = 'purple.300';

export const Button = ({ children, colorScheme, ...rest }) => (
	<ChakraButton
		colorScheme={colorScheme}
		{...rest}
		_focus={{
			boxShadow: focusBoxShadow,
		}}
	>
		{children}
	</ChakraButton>
);

export const IconButton = ({ children, icon, ...rest }) => (
	<ChakraIconButton
		icon={icon}
		_focus={{
			boxShadow: focusBoxShadow,
		}}
		{...rest}
	/>
);

export const FormLabel = ({ children }) => (
	<ChakraFormLabel fontWeight="semibold" fontSize="md">
		{children}
	</ChakraFormLabel>
);

export const Input = React.forwardRef((props, ref) => (
	<ChakraInput focusBorderColor={focusBorderColor} {...props} ref={ref} />
));

export const InputGroup = React.forwardRef(({ icon, size, ...rest }, ref) => {
	return (
		<ChakraInputGroup size={size}>
			<ChakraInputLeftElement pointerEvents="none">
				{icon}
			</ChakraInputLeftElement>
			<ChakraInput focusBorderColor={focusBorderColor} {...rest} ref={ref} />
		</ChakraInputGroup>
	);
});

export const Radio = React.forwardRef(({ children, value, ...rest }, ref) => (
	<ChakraRadio
		colorScheme="purple"
		value={value}
		{...rest}
		ref={ref}
		_focus={{
			boxShadow: focusBoxShadow,
		}}
	>
		{children}
	</ChakraRadio>
));

export const RadioGroup = React.forwardRef(({ children, ...rest }, ref) => (
	<ChakraRadioGroup defaultValue="2" {...rest}>
		<ChakraStack spacing={5} direction="row">
			{children}
		</ChakraStack>
	</ChakraRadioGroup>
));

export const Select = React.forwardRef(
	({ children, placeholder, ...rest }, ref) => (
		<ChakraSelect
			focusBorderColor={focusBorderColor}
			placeholder={placeholder}
			{...rest}
			ref={ref}
		>
			{children}
		</ChakraSelect>
	)
);

export const Link = React.forwardRef(({ children, ...rest }, ref) => (
	<ChakraLink
		ref={ref}
		{...rest}
		_focus={{
			border: 'none',
		}}
	>
		{children}
	</ChakraLink>
));
