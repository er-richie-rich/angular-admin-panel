import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  data:any =localStorage.getItem('userlist')
  userList:any
  constructor() {
   if(this.data === null || this.data=== undefined){
     this.userList = [];
   }else {
     this.userList = JSON.parse(this.data) ;
   }
  }

  registerUserService(useritem:any) {
    this.userList.push(useritem);
    localStorage.setItem('userList', JSON.stringify(this.userList));
    return true;
  }

  listUserService(){
    return  this.userList;
  }


}
