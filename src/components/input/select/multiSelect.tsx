// import {GroupBase, StylesConfig, Select as MultiSelect } from 'react-select';

import Select, { GroupBase, MultiValue, StylesConfig } from 'react-select';

const customStyles: StylesConfig<
	{
		value: string;
		label: string;
	},
	true,
	GroupBase<{
		value: string;
		label: string;
	}>
> = {
	input: (provided, state) => {
		return {
			...provided,
			background: 'transparent',
			marginBottom: 0,
			paddingBottom: 0,
		};
	},
	container: (provided, state) => {
		return { ...provided, background: 'transparent' };
	},
	control: (provided, state) => {
		return {
			...provided,
			background: 'transparent',
			color: 'var(--dark)',
			border: 'none',
			borderRadius: '0',
			borderBottom: '.1em solid var(--dark)',
			alignItems: 'end',
			minWidth: '10rem',
			cursor: 'text',
		};
	},
	menu: (provided, state) => {
		return { ...provided, background: 'var(--light)', zIndex: 5 };
	},
	multiValue: (provided, state) => {
		return {
			...provided,
			background: 'transparent',
			border: '.1em solid var(--dark)',
			cursor: 'pointer',
		};
	},
	valueContainer: (provided, state) => {
		return {
			...provided,
			marginBottom: 0,
		};
	},
	indicatorsContainer: (provided, state) => {
		return {
			...provided,
			cursor: 'pointer',
		};
	},
	placeholder: (provided, state) => {
		return {
			...provided,
			color: 'var(--dark)',
			opacity: '70%',
		};
	},
};

/**
 *
 * @param props
 * @returns
 */
export const MultiSelect = (props: {
	placeholder?: string;
	options: { value: string; label: string }[];
	onChange: (selected: Set<string>) => void;
}) => {
	const onChange = (
		newValue: MultiValue<{
			value: string;
			label: string;
		}>
	) => {
		props.onChange(new Set(newValue.map((item) => item.value)));
	};

	const selectOptions = {
		onChange: onChange,
		placeholder: props.placeholder,
		styles: customStyles,
		closeMenuOnSelect: false,
		options: props.options,
	};
	
	return <Select isMulti {...selectOptions} />;
};
