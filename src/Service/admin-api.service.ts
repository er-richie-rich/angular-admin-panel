import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AdminApiService {
	userData: any = localStorage.getItem('userList')
	categoryData:any =localStorage.getItem('categoryList')
	subcategoryData:any =localStorage.getItem('subcategoryList')
	userList: any;
	categoryList:any;
	subcategoryList: any;
	result: boolean = false;

	
	constructor() {
		if (this.userData === null || this.userData === undefined) {
			this.userList = [];
		} else {
			this.userList = JSON.parse(this.userData);
		}
		if (this.categoryData === null || this.categoryData === undefined) {
			this.categoryList = [];
		} else {
			this.categoryList = JSON.parse(this.categoryData);
		}
		if (this.subcategoryData === null || this.subcategoryData === undefined) {
			this.subcategoryList = [];
		} else {
			this.subcategoryList = JSON.parse(this.subcategoryData);
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

	 // add category service
	addCategoryService(categoryitem: any) {
		this.categoryList.push(categoryitem);
		localStorage.setItem('categoryList', JSON.stringify(this.categoryList));
		return true;
	}
	// list category service
	listCategoryService() {
		return this.categoryList;
	}

	// add sub category service
	addSubCategoryService(subcategoryitem: any) {
		this.subcategoryList.push(subcategoryitem);
		localStorage.setItem('subcategoryList', JSON.stringify(this.subcategoryList));
		return true;
	}
}
