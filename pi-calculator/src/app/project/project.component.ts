import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Project } from '../models/project';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


	projectForm: FormGroup;

	project: Project;

	projectTypes: string[];

	user: User | null;

	ngOnInit(): void {

		this.user = this.userService.getLoggedInUser();

		if (this.user == null) {
			this.router.navigate(['/launch']);
		} else {
			this.project = {
				id: 0,
				name: '',
				description: '',
				type: '',
				location: '',
				duration: 0,
				expectedSellingPrice: 0,
				owner: this.user,
				investors: null,
				fund: {
					id: 0,
					name: '',
					amount: 0,
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
				status: 'DRAFT',
				createDate: new Date(),
				updateDate: null,
			};
			this.projectForm = new FormGroup({
				name: new FormControl(this.project.name, [Validators.required]),
				description: new FormControl(this.project.description, [Validators.required]),
				type: new FormControl(this.project.type, [Validators.required]),
				location: new FormControl(this.project.location, [Validators.required]),
				duration: new FormControl(this.project.location, [Validators.required]),
				fund: new FormGroup({
					amount: new FormControl(this.project.fund!.amount, [Validators.required]),
					sellingPrice: new FormGroup({
						amount: new FormControl(this.project.fund!.sellingPrice!.amount, [Validators.required]),
						source: new FormControl(this.project.fund!.sellingPrice!.source, [Validators.required]),
					}),
				}),
			});

			this.projectTypes = this.projectService.getProjectTypes();
		}
	}

	constructor(private userService: UserService, private projectService: ProjectService, private fb: FormBuilder, private route: ActivatedRoute,
		private router: Router) { }


	public createProject() {
		this.project.name = this.projectForm.value.name;
		this.project.description = this.projectForm.value.description;
		this.project.type = this.projectForm.value.type;
		this.project.location = this.projectForm.value.location;
		this.project.duration = this.projectForm.value.duration;
		this.project!.fund!.amount = this.projectForm.value.fund!.amount;
		this.project!.fund!.sellingPrice!.amount = this.projectForm.value.fund!.sellingPrice!.amount;
		this.project!.fund!.sellingPrice!.source = this.projectForm.value.fund!.sellingPrice!.source;		
		
		let newProject = this.projectService.insertProject(this.project);
		
		if (newProject != null && newProject.id != null) {
			this.router.navigate(['/home']);
		} else {

		}
	}

}
