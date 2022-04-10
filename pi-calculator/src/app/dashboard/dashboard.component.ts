import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
	id: string;
	name: string;
	progress: string;
	fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
	'blueberry',
	'lychee',
	'kiwi',
	'mango',
	'peach',
	'lime',
	'pomegranate',
	'pineapple',
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


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
	/** Based on the screen size, switch from standard to one column per row */
	cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(({ matches }) => {
			if (matches) {
				return [
					{ title: 'Card 1', cols: 1, rows: 1 },
					{ title: 'Card 2', cols: 1, rows: 1 },
					{ title: 'Card 3', cols: 1, rows: 1 },
					{ title: 'Card 4', cols: 1, rows: 1 }
				];
			}

			return [
				{ title: 'Card 1', cols: 2, rows: 1 },
				{ title: 'Card 2', cols: 1, rows: 1 },
				{ title: 'Card 3', cols: 1, rows: 2 },
				{ title: 'Card 4', cols: 1, rows: 1 }
			];
		})
	);

	//constructor(private breakpointObserver: BreakpointObserver) {}


	displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
	dataSource: MatTableDataSource<UserData>;

	@ViewChild(MatTable) table: MatTable<UserData>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private breakpointObserver: BreakpointObserver) {
		// Create 100 users
		const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

		// Assign the data to the data source for the table to render
		this.dataSource = new MatTableDataSource(users);
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	addData() {		
		this.dataSource.data.push(createNewUser(Math.floor(Math.random() * 3)));
		this.table.renderRows();
		
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	removeData() {
		this.dataSource.data.pop();
		this.table.renderRows();
		
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}


/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
	const name =
		NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
		' ' +
		NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
		'.';

	return {
		id: id.toString(),
		name: name,
		progress: Math.round(Math.random() * 100).toString(),
		fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
	};
}