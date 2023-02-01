import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import{AdminApiService} from "../../../Service/admin-api.service";


export interface categoryData {
  id: string;
  categoryname: string;
  status: string;
}


@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'categoryname', 'status'];
  dataSource: MatTableDataSource<categoryData>;

  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @ViewChild(MatSort) sort:any= MatSort;
  constructor(private adminApiService:AdminApiService) {
      const categories = this.adminApiService.listCategoryService()
    this.dataSource = new MatTableDataSource(categories);
  }

  ngOnInit(): void {}


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
