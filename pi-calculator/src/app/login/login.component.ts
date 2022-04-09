import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private route: ActivatedRoute,
    private router: Router ) { }

	ngOnInit(): void {
	}	

	emailFormControl = new FormControl('', [Validators.required, Validators.email]);
	
	loginForm = new FormGroup({
		email: this.emailFormControl,
	});

	matcher = new MyErrorStateMatcher();
	
	public signIn(){
		console.log('signIn');
	}
	


}
