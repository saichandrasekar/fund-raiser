import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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

	constructor(private snackBar: MatSnackBar, private route: ActivatedRoute,
		private router: Router, private userService: UserService) { 
		}

	ngOnInit(): void {
	}


	emailFormControl = new FormControl('', [Validators.required, Validators.email]);

	loginForm = new FormGroup({
		email: this.emailFormControl,
	});

	matcher = new MyErrorStateMatcher();

	public signIn() {
		let user = this.userService.doLogin(this.loginForm.value.email);
		if (user == null) {
			this.openSnackBar();
		} else {
			this.userService.setLoggedInUser(user);
			this.router.navigate(['/home']);
		}
	}

	openSnackBar() {
		this.snackBar.open('Email Id is not registered', 'Please Sign Up', {
			horizontalPosition: 'center',
			verticalPosition: 'top',
			duration: 3000,
		}).onAction().subscribe(() => {
			this.router.navigate(['/signup']);
		});
	}

}
