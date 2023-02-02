import { Component, OnInit } from '@angular/core';
import {AdminApiService} from "../../../../Service/admin-api.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  categoriesArr=this.adminApiService.listCategoryService()
  subCategoryArr=this.adminApiService.listSubCategoryService()
  subCategories: any = []
  addProductForm:FormGroup;
  addProductData:any
  isSubmitted: boolean = false;
  urlData: any;
  constructor(private fb: FormBuilder, private router:Router,private adminApiService:AdminApiService,private route:ActivatedRoute) {
    this.addProductForm=this.fb.group({
      productId:[''],
      productCode:['',Validators.required],
      productName:['',Validators.required],
      categoryId:['',Validators.required],
      subCategoryId:['',Validators.required],
      productPrice:['',Validators.required],
      productStock:['',Validators.required],
      productStatus:['',Validators.required],
      productDescription:['',Validators.required],
    })
    if(this.route.snapshot.params['data']){
      this.urlData=JSON.parse(decodeURIComponent(this.route.snapshot.params['data']))

    }
    // console.log(this.urlData)
    if(this.route.snapshot.params['data']) {
      this.addProductForm.patchValue({
        productId:this.urlData.productId,
        productCode:this.urlData.productCode,
        productName:this.urlData.productName,
        categoryId:this.urlData.categoryId,
        subCategoryId:this.urlData.subCategoryId,
        productPrice:this.urlData.productPrice,
        productStock:this.urlData.productStock,
        productStatus:this.urlData.productStatus,
        productDescription:this.urlData.productDescription,
      })
      // console.log("thrtehd",this.addProductForm.value)
    }
  }

  ngOnInit(): void {

  }
  onSaveaddProductForm(){
    this.addProductForm.value.productId = this.uniqeId()
    if(this.addProductForm.valid){
      this.addProductData = this.addProductForm.value;
      this.isSubmitted = this.adminApiService.addProductService(this.addProductData);
      swal.fire({
        icon:'success',
        title:'success',
        text:'Product Added successfully',
      }).then(res=>{
        if(res){
          this.router.navigate(['/home/product-management'])
        }
      })
    }
  }

  fetchSubCategory(e:any){
    this.subCategories=[]
    for(let i = 0; i <this.subCategoryArr.length; i++) {
      if( this.subCategoryArr[i].categoryId == e.value) {
        this.subCategories.push(this.subCategoryArr[i]);
      }
    }
  }
  uniqeId(length: number=6) {
    return Math.random().toString(36).substring(2, length + 2);
  }
}
