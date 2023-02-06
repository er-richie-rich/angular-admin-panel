import {Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort,MatSortable} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AdminApiService} from "../../../Service/admin-api.service";
import Swal from "sweetalert2";
import {Validators} from "@angular/forms";
import {categoryData} from "../category-management/category-management.component";
import {Router} from "@angular/router";
import {ConfirmDeletePopupComponent} from "../../popup/confirm-delete-popup/confirm-delete-popup.component";
import {MatDialog} from "@angular/material/dialog";


export interface productData {
  id: string;
  productCode: string;
  productName: string;
  categoryName: any
  subCategoryName:any
  productPrice:any
  productStock:any
  productDescription:any
  productStatus:any
  action:any
}
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id', 'productCode', 'productName', 'categoryName','subCategoryName','productPrice','productStock','productDescription','productStatus','action'];
  dataSource: MatTableDataSource<productData>;
  products: any = this.adminApiService.listProductService()
  categories=this.adminApiService.listCategoryService()
  subcategories=this.adminApiService.listSubCategoryService()
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = new MatSort;
  constructor(private adminApiService: AdminApiService,private router:Router , private dialog:MatDialog) {
    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < this.categories.length; j++) {
        if (this.products[i].categoryId == this.categories[j].categoryId) {
          Object.assign(this.products[i], {categoryName: this.categories[j].categoryName});
        }
      }
    }
    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < this.subcategories.length; j++) {
        if (this.products[i].subCategoryId == this.subcategories[j].subcategoryId) {
          Object.assign(this.products[i], {subcategoryName: this.subcategories[j].subcategoryName});
        }
      }
    }
    this.dataSource = new MatTableDataSource(this.products);
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
        let isSubmitted = this.adminApiService.changeProductStatusService(e, row)
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
  ;
  onDeleteProduct(e:any,row:any) {
    const dialogRef = this.dialog.open(ConfirmDeletePopupComponent, {
      width: "500px",
      data: {message: 'Are you sure you want to delete this product ?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let isSubmitted = this.adminApiService.deleteProductService(e,row)
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
  editProduct(event:any,parameterData:any){
    let rowData=encodeURIComponent(JSON.stringify(parameterData))
    this.router.navigate(['/home/product-management/add-edit-product',{data:rowData}])
  }
  sortDataSource(id: any, start: any){
    let sortedData: any;
    sortedData = this.dataSource.data.sort(this.products({id: id, start: start}));
  }
  // sortData(name:any){
  //   let sortedData = this.products.sort(function(a:any,b:any){
  //     let x = a.name.toString()
  //     let y = b.name.toString()
  //     if(x>y){return 1;}
  //     if(x<y){return -1;}
  //     return 0;
  //   });
  // }
}
