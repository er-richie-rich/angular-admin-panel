import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AdminApiService {
	data: any = localStorage.getItem('userList')
	userList: any
	result: boolean = false;
	
	constructor() {
		if (this.data === null || this.data === undefined) {
			this.userList = [];
		} else {
			this.userList = JSON.parse(this.data);
		}
	}
	
	// register user api
	registerUserService(useritem: any) {
		this.userList.push(useritem);
		localStorage.setItem('userList', JSON.stringify(this.userList));
		return true;
	}
	
	listUserService() {
		return this.userList;
	}
	
	//login form api
	
	loginService(email: any, password: any) {
		let object = this.userList.find((object: { email: any, password: any }) => (object.email === email && object.password === password));
		if (object === null || object === undefined) {
			this.result = false;
		} else {
			if (object.email === email && object.password == password) {
				this.result = true;
			}
		}
		return this.result
	}
	
	// forgot password api
	forgotPasswordService(email: any) {
		let object = this.userList.find((object: { email: any }) => (object.email === email));
		console.log(this.userList)
		if (object) {

			if (object.email === email) {
				this.result = true
			}
		}
		return this.result
	}
	
	// reset password service
	 resetPasswordService(email: any, password: any){
		 for(let i = 0; i <this.userList.length; i++) {
			 if( this.userList[i].email == email) {
				 this.userList[i].password = password;
			 }
		 }
		 localStorage.setItem('userList', JSON.stringify(this.userList));
		 return true
	 }
	
}
