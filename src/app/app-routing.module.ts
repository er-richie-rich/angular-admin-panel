import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./authentication/login/login.component";
import {ForgotPasswordComponent} from "./authentication/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./authentication/reset-password/reset-password.component";
import {LoginLayoutComponent} from "./layout/login-layout/login-layout.component";
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";
import {UserManagementComponent} from "./dashboard/user-management/user-management.component";

const routes: Routes = [
  {path:'home',component:HomeLayoutComponent},
  {path:'user-management',component:UserManagementComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
