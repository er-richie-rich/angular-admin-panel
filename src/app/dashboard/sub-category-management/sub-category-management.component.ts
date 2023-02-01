import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import{AdminApiService} from "../../../Service/admin-api.service";
import {categoryData} from "../category-management/category-management.component";

export interface subcategoryData {
  id: string;
  subcategoryname: string;
  subcategoryStatus: string;
  catagoryid:string;
  action:any
}
@Component({
  selector: 'app-sub-category-management',
  templateUrl: './sub-category-management.component.html',
  styleUrls: ['./sub-category-management.component.scss']
})
export class SubCategoryManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'subcategoryname', 'subcategoryStatus','catagoryid','action'];
  dataSource: MatTableDataSource<categoryData>;

  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @ViewChild(MatSort) sort:any= MatSort;
  constructor(private adminApiService:AdminApiService) {
    const categories = this.adminApiService.listSuCategoryService()
    this.dataSource = new MatTableDataSource(categories);
  }


  ngOnInit(): void {
  }
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;

}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
