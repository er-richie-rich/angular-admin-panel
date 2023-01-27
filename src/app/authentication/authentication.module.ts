import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MaterialUiModule} from "../material-ui/material-ui.module";
import { RegisterComponent } from './register/register.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
Router
@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,MaterialUiModule,FormsModule,ReactiveFormsModule
  ],
  providers : []
})
export class AuthenticationModule { }
