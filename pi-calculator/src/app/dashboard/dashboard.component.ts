import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { Project } from '../models/project';

import { User } from '../models/user';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

import { ProjectService } from '../services/project.service';

import { UserService } from '../services/user.service';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
	/** Based on the screen size, switch from standard to one column per row */
	cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(({ matches }) => {
			if (matches) {
				return [
					{ title: 'Review Project Terms', cols: 1, rows: 1, content: 'Display PI Calculations' },
					{ title: 'Supplies', cols: 1, rows: 1, content: 'List of Supplies' },
					{ title: 'Investment Breakup', cols: 1, rows: 1, content: 'Bar chart for breakup' },
					{ title: 'Project Metrics', cols: 1, rows: 1, content: 'Key items' },
				];
			}

			return [
				{ title: 'Review Project Terms', cols: 2, rows: 1, content: 'Display PI Calculations' },
				{ title: 'Supplies', cols: 1, rows: 1, content: 'List of Supplies' },
				{ title: 'Investment Breakup', cols: 1, rows: 2, content: 'Bar chart for breakup' },
				{ title: 'Project Metrics', cols: 1, rows: 1, content: 'Key items' },
			];
		})
	);

	displayedColumns: string[] = ['name', 'type', 'status', 'duration'];
	dataSource: MatTableDataSource<Project>;

	@ViewChild(MatTable) table: MatTable<Project>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private route: ActivatedRoute,
		private router: Router, private userService: UserService, private projectService: ProjectService, private breakpointObserver: BreakpointObserver) {


	}


	user: User | null = null;

	ngOnInit(): void {
		this.user = this.userService.getLoggedInUser();
		if (this.user == null) {
			this.router.navigate(['/launch']);
		} else {			
			let projects = this.projectService.getProjects(this.user!);
			if (projects == null) {
				projects = [];
			}
			// Assign the data to the data source for the table to render
			this.dataSource = new MatTableDataSource(projects);
		}

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

	removeData() {
		this.dataSource.data.pop();
		this.table.renderRows();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}


