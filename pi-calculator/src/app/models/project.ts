import { User } from './user';
import { Fund } from './fund';
import { Budget } from './budget';
import { Milestone } from './milestone';
import { ProjectDocument } from './projectDocument';


export interface Project {
	id: number;
	name: string;	
	description: string;
	type: string;
	location: string;
	duration: number;
	expectedSellingPrice: number;
	owner: User | null;
	investors: User[] | null;
	fund: Fund | null;	
	budget: Budget | null;
	milestones: Milestone[] | null;
	documents: ProjectDocument[] | null;
	status: string;
	createDate: Date;
	updateDate: Date | null;	
}

