import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginLayoutComponent} from "../layout/login-layout/login-layout.component";
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {RegisterComponent} from "./register/register.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: '',component:LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      {path:'register',component:RegisterComponent},
      {path:'reset-password',component:ResetPasswordComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
