/* eslint-disable react/display-name */
import React, { useCallback } from 'react';
import {
	Box,
	Text,
	Button as ChakraButton,
	FormLabel as ChakraFormLabel,
	Input as ChakraInput,
	InputGroup as ChakraInputGroup,
	InputLeftElement as ChakraInputLeftElement,
	InputRightElement as ChakraInputRightElement,
	IconButton as ChakraIconButton,
	Textarea as ChakraTextarea,
	Radio as ChakraRadio,
	RadioGroup as ChakraRadioGroup,
	Stack as ChakraStack,
	Select as ChakraSelect,
	Link as ChakraLink,
	Checkbox as ChakraCheckbox,
	Breadcrumb as ChakraBreadcrumb,
	BreadcrumbItem as ChakraBreadcrumbItem,
	BreadcrumbLink as ChakraBreadcrumbLink,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
// import { WithContext as ReactTags } from 'react-tag-input';

// const focusBoxShadow = '0 0 0 3px #D6BCFA';
const focusBoxShadow = '0 0 0 3px rgba(159, 122, 234, 0.6)';
const focusBorderColor = 'purple.300';

export const Button = React.forwardRef(
	({ children, colorScheme, noOutline, ...rest }, ref) => (
		<ChakraButton
			ref={ref}
			colorScheme={colorScheme}
			{...rest}
			_focus={{
				boxShadow: noOutline ? 'none' : focusBoxShadow,
			}}
		>
			{children}
		</ChakraButton>
	)
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

export const InputGroup = React.forwardRef(
	({ icon, size, rightButton, ...rest }, ref) => {
		return (
			<ChakraInputGroup size={size}>
				{icon && (
					<ChakraInputLeftElement pointerEvents="none">
						{icon}
					</ChakraInputLeftElement>
				)}
				<ChakraInput focusBorderColor={focusBorderColor} {...rest} ref={ref} />
				<ChakraInputRightElement>{rightButton}</ChakraInputRightElement>
			</ChakraInputGroup>
		);
	}
);

export const Textarea = React.forwardRef((props, ref) => (
	<ChakraTextarea focusBorderColor={focusBorderColor} {...props} ref={ref} />
));

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

export const Checkbox = React.forwardRef(
	({ children, value, ...rest }, ref) => (
		<ChakraCheckbox value={value} {...rest} ref={ref}>
			{children}
		</ChakraCheckbox>
	)
);

export const Link = React.forwardRef(({ children, ...rest }, ref) => (
	<ChakraLink
		ref={ref}
		{...rest}
		_focus={{
			boxShadow: focusBoxShadow,
		}}
	>
		{children}
	</ChakraLink>
));

export const UploadComponent = React.forwardRef(
	({ children, accept, watchFile, ...rest }, ref) => (
		<label>
			<Text
				px="3"
				py="2"
				bgColor="gray.200"
				display="inline-block"
				borderRadius="md"
				cursor="pointer"
				fontSize="sm"
				fontWeight="medium"
				_active={{
					boxShadow: '0 0 0 3px rgba(159, 122, 234, 0.6)',
				}}
			>
				{children}
			</Text>
			<input
				{...rest}
				ref={ref}
				type="file"
				accept={accept}
				style={{
					display: 'none',
				}}
			/>
			{watchFile && (
				<Box display="inline-block" mx="2">
					<Text display="inline-block">{watchFile[0]?.name}</Text>
				</Box>
			)}
		</label>
	)
);

export const Breadcrumb = React.forwardRef(({ paths, ...rest }, ref) => (
	<ChakraBreadcrumb
		spacing="8px"
		separator={<ChevronRightIcon color="gray.500" />}
		{...rest}
		ref={ref}
	>
		{paths.map((item, index) => (
			<ChakraBreadcrumbItem key={index}>
				<ChakraBreadcrumbLink>{item}</ChakraBreadcrumbLink>
			</ChakraBreadcrumbItem>
		))}
	</ChakraBreadcrumb>
));
