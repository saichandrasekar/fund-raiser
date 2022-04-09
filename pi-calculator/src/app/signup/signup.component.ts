import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	constructor(private fb: FormBuilder) { }

	user: User = {
		id: 0,
		name: '',
		role: '',
		email: '',
	};

	ngOnInit(): void {
	}

	signUpForm = new FormGroup({
		name: new FormControl(this.user.name, [Validators.required]),
		role: new FormControl(this.user.role, [Validators.required]),
		email: new FormControl(this.user.email, [Validators.required, Validators.email]),
	});


	public createUser() {
		console.log('crete user');
		console.log(this.signUpForm.value)
	}

}
