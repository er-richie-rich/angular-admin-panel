import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AdminApiService {
    userData: any = localStorage.getItem('userList');
    userList: any;
    categoryData: any = localStorage.getItem('categoryList');
    categoryList: any;
    subcategoryData: any = localStorage.getItem('subcategoryList');
    subcategoryList: any;
    productData: any = localStorage.getItem('productList')
    productList: any
    result: boolean = false;


    constructor(private router:Router) {
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

        if (this.productData === null || this.productData === undefined) {
            this.productList = [];
        } else {
            this.productList = JSON.parse(this.productData);
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
                let loggedUserdata = {
                    userId: object.userId,
                    fullName: object.fullName,
                    birthDate: object.birthDate,
                    mobile: object.mobile,
                    email: object.email,
                }
                localStorage.setItem('loggedUser', JSON.stringify(loggedUserdata));
                this.result = true;
            }
        }
        return this.result
    }
    //logOut user service
    logOutService() {
        localStorage.setItem('loggedUser',JSON.stringify({}))
        this.router.navigate(['/']);
    }

    // list logged user service
    listLoggedUserService() {
        let loggedUser: any
        let loggedUserData = localStorage.getItem('loggedUser')
        if (loggedUserData != null) {
            loggedUser = JSON.parse(loggedUserData);
        } else {
            loggedUser = {}
        }
        return loggedUser;
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
    resetPasswordService(email: any, password: any) {
        for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].email == email) {
                this.userList[i].password = password;
            }
        }
        localStorage.setItem('userList', JSON.stringify(this.userList));
        return true
    }

    // add category service
    addCategoryService(categoryItem: any) {
        this.categoryList.push(categoryItem);
        localStorage.setItem('categoryList', JSON.stringify(this.categoryList));
        return true;
    }

    //update Sub Category Service
    updateCategoryService(categoryItem: any){
        for (let i = 0; i < this.categoryList.length; i++) {
            if(this.categoryList[i].categoryId == categoryItem.categoryId){
                this.categoryList[i] =  categoryItem
            }
        }
        localStorage.setItem('categoryList', JSON.stringify(this.categoryList));
        return true
    }

    // list category service
    listCategoryService() {
        return this.categoryList;
    }

    // add sub category service
    addSubCategoryService(subcategoryItem: any) {
        this.subcategoryList.push(subcategoryItem);
        localStorage.setItem('subcategoryList', JSON.stringify(this.subcategoryList));
        return true;
    }

    //update Sub Category Service
    updateSubCategoryService(subcategoryItem: any){
        for (let i = 0; i < this.subcategoryList.length; i++) {
            if(this.subcategoryList[i].subcategoryId == subcategoryItem.subcategoryId){
                this.subcategoryList[i] =  subcategoryItem
             }
            }
        localStorage.setItem('subcategoryList', JSON.stringify(this.subcategoryList));
        return true
        }




     // list category service
    listSubCategoryService() {
        return this.subcategoryList;
    }

    // add product service
    addProductService(productItem: any) {
        this.productList.push(productItem);
        localStorage.setItem('productList', JSON.stringify(this.productList));
        return true;
    }

    // list product service
    listProductService() {
        return this.productList;
    }

    //Update user service
    updateUserService(paraEmail:any,updateData:any){
        for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].email == paraEmail) {
                    this.userList[i].fullName= updateData.fullName,
                    this.userList[i].birthDate= updateData.birthDate,
                    this.userList[i].mobile= updateData.mobile,
                    this.userList[i].email= updateData.email
            }
        }
        localStorage.setItem('userList', JSON.stringify(this.userList));
        let loggedUser: any
        let loggedUserData = localStorage.getItem('loggedUser')
        if (loggedUserData != null) {
            loggedUser = JSON.parse(loggedUserData);
        }
            loggedUser.userId = loggedUser.userId,
            loggedUser.fullName= updateData.fullName,
            loggedUser.birthDate= updateData.birthDate,
            loggedUser.mobile= updateData.mobile,
            loggedUser.email= updateData.email
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        return true
    }

}
