import { NgModule } from '@angular/core';
import {CommonModule, DatePipe, LowerCasePipe} from '@angular/common';
import {MaterialUiModule} from "../material-ui/material-ui.module";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddEditProductComponent } from './product-management/add-edit-product/add-edit-product.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { SubCategoryManagementComponent } from './sub-category-management/sub-category-management.component';
import { AddEditCategoryComponent } from './category-management/add-edit-category/add-edit-category.component';
import { AddEditSubcategoryComponent } from './sub-category-management/add-edit-subcategory/add-edit-subcategory.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { MyAccountComponent } from './user-management/my-account/my-account.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    AdminDashboardComponent,
    ProductManagementComponent,
    AddEditProductComponent,
    CategoryManagementComponent,
    SubCategoryManagementComponent,
    AddEditCategoryComponent,
    AddEditSubcategoryComponent,
    MyAccountComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialUiModule,FormsModule,ReactiveFormsModule
  ],
  exports:[MaterialUiModule],
  providers: [DatePipe,LowerCasePipe],
})
export class DashboardModule { }
