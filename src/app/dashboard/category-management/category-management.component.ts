import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AdminApiService} from "../../../Service/admin-api.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

export interface categoryData {
    id: string;
    categoryname: string;
    status: string;
    action: any
}


@Component({
    selector: 'app-category-management',
    templateUrl: './category-management.component.html',
    styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
    displayedColumns: string[] = ['id', 'categoryname', 'status', 'action'];
    dataSource: MatTableDataSource<categoryData>;
    categories: any = this.adminApiService.listCategoryService()
    @ViewChild(MatPaginator) paginator: any = MatPaginator;
    @ViewChild(MatSort) sort: any = MatSort;

    constructor(private adminApiService: AdminApiService,private router:Router) {

        this.dataSource = new MatTableDataSource(this.categories);
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
    statusChange(e: any, row: any) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to change status!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'warn',
            cancelButtonColor: 'warn',
            confirmButtonText: 'Change it'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Changed!',
                    'Your status has been changed.',
                    'success'
                )
                if (e.checked == true) {
                    for (let i = 0; i < this.categories.length; i++) {
                        if (this.categories[i].categoryId == row.categoryId) {
                            this.categories[i].categoryStatus = 1;
                        }
                    }
                } else {
                    for (let i = 0; i < this.categories.length; i++) {
                        if (this.categories[i].categoryId == row.categoryId) {
                            this.categories[i].categoryStatus = 0;
                        }
                    }
                }
                localStorage.setItem('categoryList', JSON.stringify(this.categories));
            } else {
                location.reload()
            }
        })
    }


    onDeleteCategory(e:any,row:any) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete category!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'warn',
            cancelButtonColor: 'warn',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your category has been deleted.',
                    'success'
                )
                for(let i = 0; i <this.categories.length; i++) {
                    if(this.categories[i].categoryId == row.categoryId) {
                        this.categories.splice(i, 1);
                    }
                }
                localStorage.setItem('categoryList', JSON.stringify(this.categories));
            }
            location.reload()
        })
    }

    editCategory(event:any,parameterData:any){
        let rowData=encodeURIComponent(JSON.stringify(parameterData))
        this.router.navigate(['/home/category-management/add-edit-category',{data:rowData}])
    }
}
