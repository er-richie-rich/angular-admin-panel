import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MaterialUiModule} from "./material-ui/material-ui.module";
import { LayoutComponent } from './layout/layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import {CoreModule} from "./core/core.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import {DatePipe} from '@angular/common';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginLayoutComponent,
    HomeLayoutComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule, MaterialUiModule,
        AuthenticationModule,
        CoreModule,DashboardModule,ReactiveFormsModule,FormsModule,MatDatepickerModule
    ],
  providers: [DatePipe,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
