/* eslint-disable react/display-name */
import React, { useState } from 'react';
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
	Checkbox as ChakraCheckbox,
} from '@chakra-ui/react';
import { WithContext as ReactTags } from 'react-tag-input';

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
			border: 'none',
		}}
	>
		{children}
	</ChakraLink>
));

export const Tag = ({ suggestions }) => {
	const [tags, setTags] = useState([]);

	const KeyCodes = {
		comma: 188,
		enter: 13,
	};

	const delimiters = [KeyCodes.comma, KeyCodes.enter];

	const handleDelete = (i) => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleAddition = (tag) => {
		setTags([...tags, tag]);
	};

	const handleDrag = (tag, currPos, newPos) => {
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		setTags(newTags);
	};

	return (
		<ReactTags
			tags={tags}
			// suggestions={suggestions}
			delimiters={delimiters}
			handleDelete={handleDelete}
			handleAddition={handleAddition}
			handleDrag={handleDrag}
			handleTagClick={handleTagClick}
			inputFieldPosition="bottom"
			// autocomplete
		/>
	);
};
