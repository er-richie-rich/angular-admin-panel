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
    urlData:any
    constructor(private fb: FormBuilder, private router:Router,private adminApiService: AdminApiService,private route:ActivatedRoute) {
        this.addCategoryForm = this.fb.group(
            {
                categoryId:[''],
                categoryName:['',Validators.required],
                categoryStatus:['',Validators.required]
            })
        if(this.route.snapshot.params['data']){
            this.urlData=JSON.parse(decodeURIComponent(this.route.snapshot.params['data']))
        }
    }
    ngOnInit(): void {
        if(this.route.snapshot.params['data']) {
            this.addCategoryForm.patchValue({
                categoryId: this.urlData.categoryId,
                categoryName: this.urlData.categoryName,
                categoryStatus: this.urlData.categoryStatus,
            })
        }
    }

    onAddCategoryFormSave(){
        if(this.addCategoryForm.valid){
            if(this.route.snapshot.params['data']){
                this.isSubmitted = this.adminApiService.updateCategoryService(this.addCategoryForm.value);
            }else{
                this.addCategoryForm.value.categoryId = uniqeId()
                this.categoryData = this.addCategoryForm.value;
                this.isSubmitted = this.adminApiService.addCategoryService(this.categoryData);
            }
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



