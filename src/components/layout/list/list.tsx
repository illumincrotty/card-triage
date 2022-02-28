import { Flipped } from 'react-flip-toolkit';
import './list.css';

const listComponent = <t extends unknown>(props: {
	title: string;
	list: t[];
	keyify: (input: t, index: number) => React.Key;
	componentifier: (input: t, index: number) => JSX.Element | string;
}) => {
	return (
		<>
			<h2 className='underline'>{props.title}</h2>
			<ul className="unlist">
				{props.list.map((value, index) => (
					<Flipped key={props.keyify(value, index)} flipId={props.keyify(value, index)} >
						<li key={props.keyify(value, index)}>
							{props.componentifier(value, index)}
						</li>
					</Flipped>
				))}
			</ul>
		</>
	);
};

export { listComponent as ListComponent };
