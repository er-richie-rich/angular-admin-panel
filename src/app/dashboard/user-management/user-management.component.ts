import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from '@angular/cdk/collections';
// import {HttpClient} from "@angular/common/http";
import{AdminApiService} from "../../../Service/admin-api.service";

export interface UserData {
  id: string;
  fullname:string,
  birthdate:string, mobile:string,
  email:string,
  password:string
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['select','fullname', 'birthdate', 'mobile','email'];

  dataSource: any = new MatTableDataSource([]);
  selection = new SelectionModel<UserData>(true, []);
  data:any =[]
  @ViewChild(MatPaginator) paginator:any= MatPaginator;

  @ViewChild(MatSort) sort:any= MatSort;
  constructor(private adminApiService:AdminApiService) {
    const users =this.adminApiService.listUserService()
     if(users){
       this.dataSource = new MatTableDataSource(users) ;
     }else{
       this.dataSource = new MatTableDataSource() ;
     }

  }

  isAllSelected() {
    const numSelected = this.selection?.selected.length;
    const numRows = this.dataSource.data?.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

