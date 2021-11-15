/* eslint-disable react/display-name */
import React from 'react';
import {
	Button as ChakraButton,
	FormLabel as ChakraFormLabel,
	Input as ChakraInput,
	InputGroup as ChakraInputGroup,
	InputLeftElement as ChakraInputLeftElement,
	IconButton as ChakraIconButton,
} from '@chakra-ui/react';

// const focusBoxShadow = '0 0 0 3px #D6BCFA';
const focusBoxShadow = '0 0 0 3px rgba(159, 122, 234, 0.6)';

export const Button = ({ children, ...rest }) => (
	<ChakraButton
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

export const Input = (props) => (
	<ChakraInput focusBorderColor="purple.300" {...props} />
);

export const InputGroup = React.forwardRef(({ icon, ...rest }, ref) => {
	return (
		<ChakraInputGroup>
			<ChakraInputLeftElement pointerEvents="none">
				{icon}
			</ChakraInputLeftElement>
			<ChakraInput focusBorderColor="purple.300" {...rest} ref={ref} />
		</ChakraInputGroup>
	);
});
