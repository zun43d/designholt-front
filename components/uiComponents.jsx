import {
	Button as ChakraButton,
	FormLabel as ChakraFormLabel,
	Input as ChakraInput,
	InputGroup as ChakraInputGroup,
	InputLeftElement as ChakraInputLeftElement,
	IconButton as ChakraIconButton,
} from '@chakra-ui/react';

const focusBoxShadow = '0 0 0 3px #D6BCFA';

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

export const InputGroup = ({ icon, ...rest }) => (
	<ChakraInputGroup>
		<ChakraInputLeftElement pointerEvents="none">{icon}</ChakraInputLeftElement>
		<ChakraInput focusBorderColor="purple.300" {...rest} />
	</ChakraInputGroup>
);
