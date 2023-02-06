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
  fullName:string,
  birthDate:string,
  mobile:string,
  email:string,
  password:string
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id','fullName', 'birthDate', 'mobile','email'];
  users:any  =this.adminApiService.listUserService()
  dataSource: any = new MatTableDataSource([]);
  selection = new SelectionModel<UserData>(true, []);
  data:any =[]
  @ViewChild(MatPaginator) paginator:any= MatPaginator;

  @ViewChild(MatSort) sort:any= MatSort;
  constructor(private adminApiService:AdminApiService) {
     if(this.users){
       this.dataSource = new MatTableDataSource(this.users) ;
     }else{
       this.dataSource = new MatTableDataSource() ;
     }

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
  sortDataSource(id: any, start: any){
    let sortedData: any;
    sortedData = this.dataSource.data.sort(this.users({id: id, start: start}));
  }
}

