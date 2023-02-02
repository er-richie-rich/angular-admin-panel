import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AdminApiService} from "../../../Service/admin-api.service";
import Swal from "sweetalert2";
import {Validators} from "@angular/forms";
import {categoryData} from "../category-management/category-management.component";
import {Router} from "@angular/router";

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
export class ProductManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'productCode', 'productName', 'categoryName','subCategoryName','productPrice','productStock','productDescription','productStatus','action'];
  dataSource: MatTableDataSource<categoryData>;
  products: any = this.adminApiService.listProductService()
  categories=this.adminApiService.listCategoryService()
  subcategories=this.adminApiService.listSubCategoryService()
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private adminApiService: AdminApiService,private router:Router) {
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
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].productId == row.productId) {
              this.products[i].productStatus = 1;
            }
          }
        } else {
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].productId == row.productId) {
              this.products[i].productStatus = 0;
            }
          }
        }
        localStorage.setItem('productList', JSON.stringify(this.products));
      } else {
        location.reload()
      }
    })
  }


  onDeleteProduct(e:any,row:any) {
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
        for(let i = 0; i <this.products.length; i++) {
          if(this.products[i].productId == row.productId) {
            this.products.splice(i, 1);
          }
        }
        localStorage.setItem('productList', JSON.stringify(this.products));
      }
      location.reload()
    })
  }

  editProduct(event:any,parameterData:any){
    let rowData=encodeURIComponent(JSON.stringify(parameterData))
    this.router.navigate(['/home/product-management/add-edit-product',{data:rowData}])
  }
}
