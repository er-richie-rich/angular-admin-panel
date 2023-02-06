import {Component, OnInit} from '@angular/core';
import {DatePipe, Location} from "@angular/common";
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AdminApiService} from "../../../Service/admin-api.service";
import swal from 'sweetalert2'
import {Router} from "@angular/router";
import {birthDateValidation} from "./register.custom.validators";



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
    maxDate : any;
    minDate : any;
    currentDate = new Date();
    minBirthDate: any;

    constructor(private fb: FormBuilder,private router: Router ,private _location: Location, private adminApiService: AdminApiService,private dateFormate:DatePipe,) {
        this.registerForm = this.fb.group({
            userId:[''],
            fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            birthDate: ["",[Validators.required]],
            mobile: ["",[Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
            email: ['', [Validators.required, Validators.pattern('\\w+([-+.]\\w+)*@yahoo.(com|in)|gmail.(com|in)|hotmail.(com|in)|redmail.(com|in)|microsoft.(com|in)')]],
            password: ['', [Validators.required]]
        });

        this.registerForm.setValidators(birthDateValidation(this.dateFormate))
    }

    ngOnInit(): void {
        // console.log(this.registerForm.get('mobile'))

        let minDay = this.currentDate.getDate();
        let minMonth = this.currentDate.getMonth();
        let minYear = this.currentDate.getFullYear() - 18;
        this.minBirthDate = new Date(minYear, minMonth, minDay);
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

    test(){
        localStorage.setItem("date", JSON.stringify(this.registerForm.value));
        console.log(this.registerForm.value)

    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.registerForm.value.userId = this.uniqeId()
            this.userData = this.registerForm.value;
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

    uniqeId(length: number=6) {
        return Math.random().toString(36).substring(2, length + 2);
    }

}
