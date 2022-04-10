import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  ngOnInit(): void {
  }

constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

	user: User = {
		id: 0,
		name: '',
		role: '',
		email: '',
	};

	signUpForm = new FormGroup({
		name: new FormControl(this.user.name, [Validators.required]),
		role: new FormControl(this.user.role, [Validators.required]),
		email: new FormControl(this.user.email, [Validators.required, Validators.email]),
	});


	public createUser() {		
		console.log(this.signUpForm.value);
		this.router.navigate(['/home']);
	}

}
