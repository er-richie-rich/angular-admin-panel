import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AdminApiService} from "../../../Service/admin-api.service";
import {categoryData} from "../category-management/category-management.component";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";

export interface subcategoryData {
    id: string;
    subcategoryname: string;
    subcategoryStatus: string;
    catagoryid: string;
    action: any
}

@Component({
    selector: 'app-sub-category-management',
    templateUrl: './sub-category-management.component.html',
    styleUrls: ['./sub-category-management.component.scss']
})
export class SubCategoryManagementComponent implements OnInit {
    displayedColumns: string[] = ['id', 'subcategoryname', 'subcategoryStatus', 'catagoryid', 'action'];
    dataSource: MatTableDataSource<categoryData>;
    subcategories = this.adminApiService.listSubCategoryService()
    categories = this.adminApiService.listCategoryService()
    @ViewChild(MatPaginator) paginator: any = MatPaginator;
    @ViewChild(MatSort) sort: any = MatSort;

    constructor(private adminApiService: AdminApiService,private router:Router, private     route:ActivatedRoute) {
        for (let i = 0; i < this.subcategories.length; i++) {
            for (let j = 0; j < this.categories.length; j++) {
                if (this.subcategories[i].categoryId === this.categories[j].categoryId) {
                    Object.assign(this.subcategories[i], {categoryName: this.categories[j].categoryName});
                }
            }
        }
        this.dataSource = new MatTableDataSource(this.subcategories);
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
                    for (let i = 0; i < this.subcategories.length; i++) {
                        if (this.subcategories[i].categoryId == row.categoryId) {
                            this.subcategories[i].categoryStatus = 1;
                        }
                    }
                } else {
                    for (let i = 0; i < this.subcategories.length; i++) {
                        if (this.subcategories[i].categoryId == row.categoryId) {
                            this.subcategories[i].categoryStatus = 0;
                        }
                    }
                }
                localStorage.setItem('subcategoryList', JSON.stringify(this.subcategories));
            } else {
                location.reload()
            }
        })
    }
    onDeleteSubCategory(e: any, row: any) {
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
                for (let i = 0; i < this.subcategories.length; i++) {
                    if (this.subcategories[i].subcategoryId == row.subcategoryId) {
                        this.subcategories.splice(i, 1);
                    }
                }
                localStorage.setItem('subcategoryList', JSON.stringify(this.subcategories));
            }
            location.reload()
        })
    }

    editSubcategory(event:any,parameterData:any){
        let rowData=encodeURIComponent(JSON.stringify(parameterData))
        this.router.navigate(['/home/sub-category-management/add-edit-subcategory',{data:rowData}])
    }
}
