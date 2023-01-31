import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AdminApiService} from "../../../../Service/admin-api.service";



@Component({
    selector: 'app-add-edit-category',
    templateUrl: './add-edit-category.component.html',
    styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
    addCategoryForm: FormGroup;
    randomId:any
    categoryData: any
    isSubmitted: boolean = false;
    constructor(private fb: FormBuilder, private router:Router,private adminApiService: AdminApiService) {
        this.addCategoryForm = this.fb.group(
            {
                categoryId:[''],
                categoryName:['',Validators.required],
                categoryStatus:['',Validators.required]
            }
        )
    }
    ngOnInit(): void {
    }

    onAddCategoryFormSave(){
       this.addCategoryForm.value.categoryId = uniqeId()
        if(this.addCategoryForm.valid){
            this.categoryData = this.addCategoryForm.value;
            console.log(this.categoryData)
            this.isSubmitted = this.adminApiService.addCategoryService(this.categoryData);
            swal.fire({
                icon:'success',
                title:'success',
                text:' category Added  successfully',
            }).then(res=>{
                if(res){
                    this.router.navigate(['/home/category-management'])
                }
            })
        }
    }
}
function uniqeId(length: number=6) {
    return Math.random().toString(36).substring(2, length + 2);
}



