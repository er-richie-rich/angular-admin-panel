import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort,MatSortable} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AdminApiService} from "../../../Service/admin-api.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmDeletePopupComponent} from "../../popup/confirm-delete-popup/confirm-delete-popup.component";
import {MatDialog} from "@angular/material/dialog";

export interface subcategoryData {
    id: string;
    subcategoryName: string;
    subcategoryStatus: string;
    categoryId: string;
    action: any
}

@Component({
    selector: 'app-sub-category-management',
    templateUrl: './sub-category-management.component.html',
    styleUrls: ['./sub-category-management.component.scss']
})
export class SubCategoryManagementComponent implements OnInit,AfterViewInit {
    displayedColumns: string[] = ['id', 'subcategoryName', 'subcategoryStatus', 'categoryId', 'action'];
    dataSource: MatTableDataSource<subcategoryData>;
    subcategories = this.adminApiService.listSubCategoryService()
    categories = this.adminApiService.listCategoryService()
    @ViewChild(MatPaginator) paginator: any = MatPaginator;
    @ViewChild(MatSort) sort: any = new MatSort;

    constructor(private adminApiService: AdminApiService,private router:Router, private route:ActivatedRoute, public dialog: MatDialog) {
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
                    let isSubmitted = this.adminApiService.changeSubCategoryStatusService(e, row)
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

    onDeleteSubCategory(e: any, row: any) {
        const dialogRef = this.dialog.open(ConfirmDeletePopupComponent, {
            width: "500px",
            data: {message: 'Are you sure you want to delete this sub category ?'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let isSubmitted = this.adminApiService.deleteSubCategoryService(row)
                if (isSubmitted == true) {
                    Swal.fire(
                        'Deleted!',
                        'Your sub category has been deleted.',
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

    editSubcategory(event:any,parameterData:any){
        let rowData=encodeURIComponent(JSON.stringify(parameterData))
        this.router.navigate(['/home/sub-category-management/add-edit-subcategory',{data:rowData}])
    }
    sortDataSource(id: any, start: any){
        let sortedData: any;
        sortedData = this.dataSource.data.sort(this.subcategories({id: id, start: start}));
    }
}
