import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";
import {AdminDashboardComponent} from "./dashboard/admin-dashboard/admin-dashboard.component";
import {UserManagementComponent} from "./dashboard/user-management/user-management.component";


const routes: Routes = [
    {path: 'home', component:HomeLayoutComponent,
    children:[
        {path:'',component:AdminDashboardComponent},
        {path:'user-management',component:UserManagementComponent}
        ]
    }
    ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
