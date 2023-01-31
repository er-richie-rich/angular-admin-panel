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
import {MAT_DATE_LOCALE} from "@angular/material/core";
Router
import {MatDatepickerModule} from "@angular/material/datepicker";


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,MaterialUiModule,FormsModule,ReactiveFormsModule,MatDatepickerModule
  ],
  providers : [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class AuthenticationModule { }
