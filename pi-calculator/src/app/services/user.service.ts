import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';
import { USERS } from '../mocks/users';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	usersUrl = 'assets/users.json';

	users: User[];
	
	loggedInUser: User;

	constructor(private http: HttpClient) {
		this.users = USERS;
	}

	doLogin(email: string): User | null {
		let users = this.users.filter(user => user.email === email);
		if (users.length == 0) {
			return null;
		} else {
			return users[0];
		}
	}

	createUser(user: User): User | null {
		if (user.email != null && this.doLogin(user!.email) == null) {
			user.id = Math.round((Math.random() * Math.random()) * 1000);
			console.log(user)
			this.users.push(user);
		} else {
			return null;
		}
		return user;
	}

	getUser(id: number): User | null {
		return this.users.filter(user => user.id === id)[0];
	}
	
	
	setLoggedInUser(user: User) {
		this.loggedInUser = user;
	}
	
	getLoggedInUser(): User | null {
		return this.loggedInUser;
	}

}