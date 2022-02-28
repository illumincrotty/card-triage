import { patient } from '../util/types';

export const getTriageData = async () => {
	const response = await fetch('http://localhost:3000/cards');
	const json = await response.json();
	return json as patient[];
};
