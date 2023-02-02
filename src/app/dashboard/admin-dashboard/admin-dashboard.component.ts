import { Component, OnInit } from '@angular/core';
import {AdminApiService} from "../../../Service/admin-api.service";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers:any
  totalCategory:any
  totalSubCategory:any
  totalProducts:any
  constructor(private adminApiService:AdminApiService) {
  this.totalUsers=this.adminApiService.listUserService().length
  this.totalCategory=this.adminApiService.listCategoryService().length
  this.totalSubCategory=this.adminApiService.listSubCategoryService().length
  this.totalProducts=this.adminApiService.listProductService().length
  }

  ngOnInit(): void {
  }

}
