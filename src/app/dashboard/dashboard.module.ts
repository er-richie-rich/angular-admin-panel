import { NgModule } from '@angular/core';
import {CommonModule, DatePipe, LowerCasePipe} from '@angular/common';
import {MaterialUiModule} from "../material-ui/material-ui.module";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MAT_DATE_LOCALE} from "@angular/material/core";

@NgModule({
  declarations: [
    UserManagementComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialUiModule
  ],
  exports:[MaterialUiModule],
  providers: [DatePipe,LowerCasePipe],
})
export class DashboardModule { }
