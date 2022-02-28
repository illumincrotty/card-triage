//import styles
import './triageApp.css';

// import built in
import { useEffect, useState } from 'react';

// import external
import { Flipper } from 'react-flip-toolkit';

// import internal components
import { ListComponent } from './components/layout/list/list';
import { Card } from './components/layout/card/card';
import { Search } from './components/input/search/search';
import { MultiSelect } from './components/input/select/multiSelect';

// import utilities and services
import { getTriageData } from './services/triageData';
import { biject } from './util/bijection';
import { arrhythmias } from './util/arrhythmias';
import { patient } from './util/types';

/** Options formatted to fit react-select */
const arrhythmiaOptions = Array.from(arrhythmias).map((value) => ({
	value: value,
	label: value,
}));

const swapPatientList = (
	patient: patient,
	source: patient[],
	output: patient[]
) => {
	return [
		source.filter((element) => element !== patient),
		[...output, patient],
	];
};

const AnimationContainer = (props: {
	animationKey: number;
	children?: JSX.Element[];
}) => (
	<Flipper
		flipKey={props.animationKey}
		element="section"
		
		className="column-parent"
		spring={{ stiffness: 250, damping: 24 }}
		staggerConfig={{
			default: {
				reverse: true,
				speed: 2,
			},
		}}
	>
		{props.children}
	</Flipper>
);

const App = () => {
	/* Component State */
	/** List of triage cards with status pending + rejected*/
	const [todo, setTodo] = useState([] as patient[]);
	/** List of triage cards with status done*/
	const [done, setDone] = useState([] as patient[]);
	/** Set of conditions to filter by */
	const [selectedConditions, setSelectedCondition] = useState(
		new Set() as Set<string>
	);
	/** Names of patients to filter by */
	const [nameFilter, setnameFilter] = useState('');
	/** Names of all patients for search autocomplete */
	const [names, setNames] = useState([] as string[])


	// On mount - runs once to get initial data from server
	useEffect(() => {
		getTriageData().then((data) => {
			const todoInit = [] as patient[];
			const doneInit = [] as patient[];
			const namesInit = [] as string[]

			// sort cards into todo and completed
			data.forEach((value) => {
				namesInit.push(value.patient_name)
				if (value.status === 'DONE') {
					doneInit.push(value);
				} else {
					todoInit.push(value);
				}
			});


			// Batch updates
			// set todo (after sorting by pending and rejected)
			setTodo(
				todoInit.sort((a, b) => {
					if (a.status === b.status) {
						return 0;
					}
					if (a.status === 'PENDING') return -1;
					return 1;
				})
			);
			setDone(doneInit);
			setNames(namesInit)
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// click events, kept out of the markup
	/**
	 * Moves a patient from the todo list to the done list and changes its status to reflect that (status becomes `"DONE"`)
	 * @param input patient card to switch lists
	 */
	const listConvertTodo = (input: patient) => {
		const [nuTodo, nuDone] = swapPatientList(input, todo, done);
		input.status = 'DONE';
		setTodo(nuTodo);
		setDone(nuDone);
	};
	/**
	 * Moves a patient from the done list to the todo list and changes its status to reflect that (status becomes `"REJECTED"`)
	 * @param input patient card to switch lists
	 */
	const listConvertDone = (input: patient) => {
		const [nuDone, nuTodo] = swapPatientList(input, done, todo);
		input.status = 'REJECTED';
		setTodo(nuTodo);
		setDone(nuDone);
	};

	/**
	 * Filters the todo lists by name and condition
	 * @param list the list to be filtered
	 * @returns the list with only those that match the filter
	 */
	const filter = (list: patient[]) =>
		list
			.filter((value) => {
				if (selectedConditions.size === 0) return true;
				return value.arrhythmias.some((condition) =>
					selectedConditions.has(condition)
				);
			})
			.filter((value) => {
				if (nameFilter.length === 0) return true;
				return (
					nameFilter.toLowerCase() ===
					value.patient_name.slice(0, nameFilter.length).toLowerCase()
				);
			});

		
	// create components outside of the markup
	const Filters = (
		<div
			className="stack"
			style={
				{
					'--gap': '0',
					'alignItems': 'flex-end',
				} as React.CSSProperties
			}
		>
			<Search
				placeholder="Filter by Name"
				id='search-name'
				label='Filter by Name:'
				onChange={setnameFilter}
				options={names}
			></Search>
			<MultiSelect
				placeholder="Filter by Condition"
				options={arrhythmiaOptions}
				onChange={setSelectedCondition}

			></MultiSelect>
		</div>
	);
	const TodoList = () => (
		<ListComponent
			title="To Do"
			list={filter(todo)}
			keyify={(input) => input.id}
			componentifier={(input) => (
				<Card onClick={() => listConvertTodo(input)} {...input}></Card>
			)}
		></ListComponent>
	);

	const DoneList = () => (
		<ListComponent
			title="Done"
			list={filter(done)}
			keyify={(input) => input.id}
			componentifier={(input) => (
				<Card onClick={() => listConvertDone(input)} {...input}></Card>
			)}
		></ListComponent>
	);

	return (
		<main
			className="stack box"
			style={{ '--gap': '1rem' } as Record<string, string>}
		>
			<header>
				<h1>Patient Triage</h1>
				{Filters}
			</header>
			<AnimationContainer animationKey={biject(todo.length, done.length)}>
				<div>
					<TodoList />
				</div>
				<div>
					<DoneList />
				</div>
			</AnimationContainer>
		</main>
	);
};

export default App;
