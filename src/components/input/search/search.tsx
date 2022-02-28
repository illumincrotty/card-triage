import './search.css';
function Search(props: {
	placeholder?: string;
	labelVisible?: boolean;
	label: string;
	id: string;
	options?: string[];
	onChange: (input: string) => void;
}) {
	// const styleProps:Record<string,string> = {"margin-left":"100%"}

	const options = props.options ? (
		<datalist id={`${props.id}-list`}>
			{props.options.map((val) => (
				<option value={val}></option>
			))}
		</datalist>
	) : (
		{}
	);

	return (
		<div>
			<label
				htmlFor={props.id}
				className={props.labelVisible ?? false ? '' : 'sr-only'}
			>
				{props.label}
			</label>
			<input
				id={props.id}
				type={'search'}
				placeholder={props.placeholder}
				onChange={(ev) => props.onChange(ev.target.value)}
				list={`${props.id}-list`}
			></input>
			{options}
		</div>
	);
}

export { Search };
