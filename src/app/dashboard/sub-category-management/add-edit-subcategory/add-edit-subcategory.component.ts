import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AdminApiService} from "../../../../Service/admin-api.service";
@Component({
  selector: 'app-add-edit-subcategory',
  templateUrl: './add-edit-subcategory.component.html',
  styleUrls: ['./add-edit-subcategory.component.scss']
})
export class AddEditSubcategoryComponent implements OnInit {
  addSubCategoryForm: FormGroup;
  randomId:any
  SubcategoryData: any
  isSubmitted: boolean = false;
    categories=this.adminApiService.listCategoryService()
    categoriesarr=this.categories
    urlData:any
  constructor(private fb: FormBuilder, private router:Router,private adminApiService: AdminApiService, private route:ActivatedRoute) {
    this.addSubCategoryForm = this.fb.group(
        {
          subcategoryId:[''],
          subcategoryName:['',Validators.required],
            categoryId:['',Validators.required],
          subcategoryStatus:['',Validators.required]
        })
      if(this.route.snapshot.params['data']){
          this.urlData=JSON.parse(decodeURIComponent(this.route.snapshot.params['data']))
      }
  }

  ngOnInit(): void {
      if(this.route.snapshot.params['data']) {
          this.addSubCategoryForm.patchValue({
              subcategoryId: this.urlData.subcategoryId,
              subcategoryName: this.urlData.subcategoryName,
              categoryId: this.urlData.categoryId,
              subcategoryStatus: this.urlData.subcategoryStatus,
          })
      }
  }

  onAddSubCategoryFormSave(){
      if(this.addSubCategoryForm.valid){
          if(this.route.snapshot.params['data']){
               this.isSubmitted = this.adminApiService.updateSubCategoryService(this.addSubCategoryForm.value);
          }else{
              this.addSubCategoryForm.value.subcategoryId = this.uniqeId()
              this.SubcategoryData = this.addSubCategoryForm.value;
              this.isSubmitted = this.adminApiService.addSubCategoryService(this.SubcategoryData);
          }
          if(this.isSubmitted){
              swal.fire({
                  icon:'success',
                  title:'success',
                  text:'Sub category Added successfully',
              }).then(res=>{
                  if(res){
                      this.router.navigate(['/home/sub-category-management'])
                  }
              })
          }


      }
  }
    uniqeId(length: number=6) {
        return Math.random().toString(36).substring(2, length + 2);
    }
}
