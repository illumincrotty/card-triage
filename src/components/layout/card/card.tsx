import { patient } from '../../../util/types';
import './card.css';

const card = (props: patient & { onClick: () => void }) => {
	const date = new Date(props.created_date);
	console.log(date);
	return (
		<div
			className="card box stack shadow"
			style={{ '--gap': '0.5rem' } as Record<string, string>}
		>
			<div>
				<strong>Name: &nbsp;</strong> {props.patient_name}
			</div>
			<div>
				<strong>Arrhythmias: &nbsp;</strong>
				{props.arrhythmias.join(', ')}
			</div>
			<div><strong>Date Created: &nbsp;</strong>{date.toDateString()} </div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				<strong>Status: &nbsp; </strong> {props.status}
				<button
					className={`shadow state-button button-${
						props.status === 'DONE' ? 'done' : 'todo'
					}`}
					onClick={props.onClick}
				>
					{props.status === 'DONE' ? 'Reject' : 'Complete'}
				</button>
			</div>
		</div>
	);
};

export { card as Card };
