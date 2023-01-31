import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";
import {AdminDashboardComponent} from "./dashboard/admin-dashboard/admin-dashboard.component";
import {UserManagementComponent} from "./dashboard/user-management/user-management.component";
import {ProductManagementComponent} from "./dashboard/product-management/product-management.component";
import {AddEditProductComponent} from "./dashboard/product-management/add-edit-product/add-edit-product.component";
import {CategoryManagementComponent} from "./dashboard/category-management/category-management.component";
import {SubCategoryManagementComponent} from "./dashboard/sub-category-management/sub-category-management.component";
import {AddEditCategoryComponent} from "./dashboard/category-management/add-edit-category/add-edit-category.component";
import {AddEditSubcategoryComponent} from "./dashboard/sub-category-management/add-edit-subcategory/add-edit-subcategory.component";


const routes: Routes = [
    {
        path: 'home', component: HomeLayoutComponent,
        children: [

            {path: '', component: AdminDashboardComponent, data: {title: 'Dashboard'}},

            {path: 'user-management', component: UserManagementComponent, data: {title: 'User Management'}},

            /*{path: 'Product-management', component: ProductManagementComponent, data: {title: 'Product Management'}
                ,children:[
                    {path:'add-product',component:AddEditProductComponent ,data: {title: 'Add Products'}},
                    {path:'edit-product',component:AddEditProductComponent ,data: {title: 'Edit Products'}}
                ]
            },*/

            {path: 'product-management', component: ProductManagementComponent, data: {title: 'Product Management'}},
            {
                path: 'product-management/add-edit-product',
                component: AddEditProductComponent,
                data: {title: 'Add-Edit Product'}
            },
            {path: 'category-management', component: CategoryManagementComponent, data: {title: 'Category Management'}},
            {
                path: 'category-management/add-edit-category',
                component: AddEditCategoryComponent,
                data: {title: 'Add-Edit Category'}
            },
            {path: 'sub-category-management', component: SubCategoryManagementComponent, data: {title: 'Sub Category Management'}},
            {
                path: 'sub-category-management/add-edit-subcategory',
                component: AddEditSubcategoryComponent,
                data: {title: 'Add-Edit Sub Category'}
            },
        ], data: {title: 'Dashboard'},
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
