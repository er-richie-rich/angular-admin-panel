import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialUiModule} from "../material-ui/material-ui.module";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';


@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,MaterialUiModule
  ],
  exports:[MaterialUiModule]
})
export class DashboardModule { }
