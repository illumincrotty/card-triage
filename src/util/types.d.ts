export interface patient {
	arrhythmias: string[];
	created_date: string;
	id: number;
	patient_name: string;
	status: 'PENDING' | 'REJECTED' | 'DONE';
}
