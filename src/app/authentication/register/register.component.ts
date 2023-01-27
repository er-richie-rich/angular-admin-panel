import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AdminApiService} from "../../../Service/admin-api.service";
import swal from 'sweetalert2'
import {Router} from "@angular/router";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    userList: any
    userData: any
    isSubmitted: boolean = false;

    constructor(private fb: FormBuilder,private router: Router ,private _location: Location, private adminApiService: AdminApiService) {
        this.registerForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            birthDate: ['', [Validators.required]],
            mobile: [,[Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
            email: ['', [Validators.required, Validators.pattern('\\w+([-+.]\\w+)*@yahoo.(com|in)|gmail.(com|in)|hotmail.(com|in)|redmail.(com|in)|microsoft.(com|in)')]],
            password: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        // console.log(this.registerForm.get('mobile'))
    }

    // alert(){
    //     swal.fire({
    //         icon:'success',
    //         title:'success',
    //         text:'Registered successfully',
    //     }).then(res=>{
    //         if(res){
    //             this.router.navigate(['/'])
    //         }
    //     })
    // }
    onSubmit() {
        if (this.registerForm.valid) {
            this.userData = this.registerForm.value;
            console.log("isSubmitted first", this.isSubmitted)
            this.isSubmitted = this.adminApiService.registerUserService(this.userData);
            swal.fire({
                icon:'success',
                title:'success',
                text:'Registered successfully',
            }).then(res=>{
                if(res){
                    this.router.navigate(['/'])
                }
            })
        }
    }

    backClicked() {
        this._location.back();
    }
}
