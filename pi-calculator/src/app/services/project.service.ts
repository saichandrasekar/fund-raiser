import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';
import { Project } from '../models/project';
import { USERS } from '../mocks/users';

/** Constants used to fill up our data base. */
const TYPES: string[] = [
	'Automobile',
	'Food Products',
	'Construction',
	'Retail',
	'Education',
	'Marketing',
	'Transport',
	'Real Estate',
];
const STATUS: string[] = [
	'Draft',
	'In Progress',
	'Under Review',
	'Partially Funded',
	'Funds Achieved',
];
const NAMES: string[] = [
	'Maia',
	'Asher',
	'Olivia',
	'Atticus',
	'Amelia',
	'Jack',
	'Charlotte',
	'Theodore',
	'Isla',
	'Oliver',
	'Isabella',
	'Jasper',
	'Cora',
	'Levi',
	'Violet',
	'Arthur',
	'Mia',
	'Thomas',
	'Elizabeth',
];


@Injectable({
	providedIn: 'root',
})
export class ProjectService {


	projects: Project[];

	constructor(private http: HttpClient) {
		// Create 100 users
		this.projects = Array.from({ length: 18 }, (_, k) => createNewProject(k + 1));
	}

	getProjects(user: User): Project[] | null {		
		if(user.role==='PROJECT_OWNER'){
			let id = user.id;
			return this.projects.filter(project => project!.owner!.id === id);	
		}else{
			return this.projects;
		}
	}

	insertProject(project: Project): Project | null {
		project.id = Math.round(Math.random() * Math.random() * 1000);
		project.status = 'Draft';
		
		this.projects.unshift(project);
		
		return project;
	}

	updateProject(project: Project): Project | null {
		return null;
	}

	getProjectTypes(): string[] {
		return TYPES;
	}

}

/** Builds and returns a new User. */
function createNewProject(id: number): Project {
	const name =
		NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
		' ' +
		TYPES[Math.round(Math.random() * (TYPES.length - 1))] +
		'.';

	return {
		id: id,
		name: name,
		description: '',
		type: TYPES[Math.round(Math.random() * (TYPES.length - 1))],
		location: '',
		duration: Math.round(Math.random() * 100),
		expectedSellingPrice: 0,
		owner: { id: 234234, name: 'Patrick The Product Owner', role: 'PROJECT_OWNER', email: 'pat@own.com' },
		investors: null,
		fund: {
			id: 0,
			name: '',
			amount: Math.round(Math.random() * 100),
			sellingPrice: {
				id: 0,
				name: '',
				amount: 0,
				source: null,
			},
		},
		budget: null,
		milestones: null,
		documents: null,
		status: STATUS[Math.round(Math.random() * (STATUS.length - 1))],
		createDate: new Date(),
		updateDate: null,
	};
}