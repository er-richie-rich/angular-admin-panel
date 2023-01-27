import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminApiService {
    data: any = localStorage.getItem('userlist')
    userList: any
    result:boolean= false;
    constructor() {
        if (this.data === null || this.data === undefined) {
            this.userList = [];
        } else {
            this.userList = JSON.parse(this.data);
        }
    }

    registerUserService(useritem: any) {
        this.userList.push(useritem);
        localStorage.setItem('userList', JSON.stringify(this.userList));
        return true;
    }

    listUserService() {
        return this.userList;
    }

    login(email:any, password:any) {

        let object = this.userList.find((object: { email: any,password:any }) => (object.email === email && object.password === password));
            if(object != null || object!== undefined){
                this.result=true;
            }
        return this.result
    }

}
