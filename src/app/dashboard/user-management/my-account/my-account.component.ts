import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AdminApiService} from "../../../../Service/admin-api.service";
import swal from 'sweetalert2'
import {Router,ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
    registerForm: FormGroup;
    userList: any
    userData: any
    isSubmitted: boolean = false;
    userdata = this.adminApiService.listLoggedUserService()
    urlEmail:any
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private _location: Location,
        private adminApiService: AdminApiService,
        private route:ActivatedRoute
        ) {
        this.registerForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            birthDate: ["", [Validators.required]],
            mobile: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
            email: ['', [Validators.required, Validators.pattern('\\w+([-+.]\\w+)*@yahoo.(com|in)|gmail.(com|in)|hotmail.(com|in)|redmail.(com|in)|microsoft.(com|in)')]],
        });
        this.registerForm.patchValue({
            userId: this.userdata.userId,
            fullName: this.userdata.fullName,
            birthDate: this.userdata.birthDate,
            mobile: this.userdata.mobile,
            email: this.userdata.email,
        })
        this.urlEmail=this.route.snapshot.params['email']
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.isSubmitted = this.adminApiService.updateUserService(this.urlEmail,this.registerForm.value);
            swal.fire({
                icon: 'success',
                title: 'success',
                text: 'Changed successfully',
            }).then(res => {
                if (res) {
                    this.router.navigate(['/home'])
                }
            })
        }
    }

    backClicked() {
        this._location.back();
    }
}
