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
import {ReactiveFormsModule} from "@angular/forms";

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
        CoreModule,DashboardModule,ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
