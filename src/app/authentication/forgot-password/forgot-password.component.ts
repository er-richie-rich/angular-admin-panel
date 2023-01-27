import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Validators,FormBuilder,FormGroup} from "@angular/forms";
import {AdminApiService} from "../../../Service/admin-api.service";
import {Router} from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
forgotForm:FormGroup;
isSubmitted: boolean = false;
errFlag :boolean= false
  constructor(private _location: Location ,private router:Router, private fb:FormBuilder, private adminApiService: AdminApiService) {
    this.forgotForm=this.fb.group({
      email:['',[Validators.required,Validators.pattern('\\w+([-+.]\\w+)*@yahoo.(com|in)|gmail.(com|in)|hotmail.(com|in)|redmail.(com|in)|microsoft.(com|in)|multiqos.(com|in)')]]
    })
  }

  ngOnInit(): void {
  }
 forgotPassword(){
      if(this.forgotForm.valid){
          this.isSubmitted =  this.adminApiService.forgotPasswordService(this.forgotForm.value.email);
          let queryemail = this.forgotForm.value.email;
          if(this.isSubmitted){
              this.router.navigate(['/reset-password',{email: queryemail}])
          }else{
              swal.fire({
                  icon:'warning',
                  title:'ERROR',
                  text:'Sorry ! Email Is Not Found',
              }).then(res=>{
                  if(res){
                      this.router.navigate(['/forgot-password'])
                  }
              })
          }
      }
     
 }
  backClicked() {
    this._location.back();
  }
}
