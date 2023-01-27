import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AdminApiService} from "../../../Service/admin-api.service";
import swal from 'sweetalert2'
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private isSubmitted: boolean = false;
  constructor(private fb: FormBuilder,private router: Router , private adminApiService: AdminApiService) {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.pattern('\\w+([-+.]\\w+)*@yahoo.(com|in)|gmail.(com|in)|hotmail.(com|in)|redmail.(com|in)|microsoft.(com|in)')]],
      password : ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onLogin(){
    this.isSubmitted = this.adminApiService.login(this.loginForm.value.email,this.loginForm.value.password);
    if(this.isSubmitted === true){
      swal.fire({
        icon:'success',
        title:'success',
        text:'Registered successfully',
      }).then(res=>{
        if(res){
          this.router.navigate(['/'])
        }
      })
    }

  }
}
