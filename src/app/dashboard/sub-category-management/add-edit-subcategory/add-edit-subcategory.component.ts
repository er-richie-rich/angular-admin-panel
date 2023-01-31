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
    categoriesarr=this.categories.categoryName

  constructor(private fb: FormBuilder, private router:Router,private adminApiService: AdminApiService) {
    this.addSubCategoryForm = this.fb.group(
        {
          subcategoryId:[''],
          subcategoryName:['',Validators.required],
          categoryName:['',Validators.required],
          subcategoryStatus:['',Validators.required]
        }
    )
  }

  ngOnInit(): void {
  }

  onAddSubCategoryFormSave(){
    this.addSubCategoryForm.value.categoryId = uniqeId()
      if(this.addSubCategoryForm.valid){
          this.SubcategoryData = this.addSubCategoryForm.value;
          console.log(this.SubcategoryData)
          this.isSubmitted = this.adminApiService.addSubCategoryService(this.SubcategoryData);
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
function uniqeId(length: number=6) {
  return Math.random().toString(36).substring(2, length + 2);
}