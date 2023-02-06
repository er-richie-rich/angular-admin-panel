import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AdminApiService} from "../../../Service/admin-api.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeletePopupComponent} from "../../popup/confirm-delete-popup/confirm-delete-popup.component";

export interface categoryData {
    id: string;
    categoryName: string;
    status: string;
    action: any
}


@Component({
    selector: 'app-category-management',
    templateUrl: './category-management.component.html',
    styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit,AfterViewInit {
    displayedColumns: string[] = ['id', 'categoryName', 'status', 'action'];
    dataSource: MatTableDataSource<categoryData>;
    categories: any = this.adminApiService.listCategoryService()

    @ViewChild(MatPaginator) paginator: any = MatPaginator;
    @ViewChild(MatSort) sort: any = new MatSort;

    constructor(private adminApiService: AdminApiService, private router: Router, public dialog: MatDialog,) {

        this.dataSource = new MatTableDataSource(this.categories);
    }

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    statusChange(e: any, row: any) {
        const dialogRef = this.dialog.open(ConfirmDeletePopupComponent, {
            width: "500px",
            data: {message: 'Are you sure you want to change status ?'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let isSubmitted = this.adminApiService.changeCategoryStatusService(e, row)
                if (isSubmitted == true) {
                    Swal.fire(
                        'changed!',
                        'Your category Status has been changed.',
                        'success').then(function () {
                        location.reload()
                    });
                } else {
                    Swal.fire(
                        'failed!',
                        'Something went to wrong !',
                        'error')
                }
            }
        })
    }


    onDeleteCategory(e: any, row: any) {
        const dialogRef = this.dialog.open(ConfirmDeletePopupComponent, {
            width: "500px",
            data: {message: 'Are you sure you want to delete this category ?'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let isSubmitted = this.adminApiService.deleteCategoryService(row)
                if (isSubmitted == true) {
                    Swal.fire(
                        'Deleted!',
                        'Your category has been deleted.',
                        'success').then(function () {
                        location.reload()
                    });
                } else {
                    Swal.fire(
                        'failed!',
                        'Something went to wrong !',
                        'error')
                }
            }
        })
    }

    editCategory(event: any, parameterData: any) {
        let rowData = encodeURIComponent(JSON.stringify(parameterData))
        this.router.navigate(['/home/category-management/add-edit-category', {data: rowData}])
    }

    sortDataSource(id: string, start: string){
       let SortedData= this.dataSource.data.sort(this.categories({id: id, start: start}));
    }
}
