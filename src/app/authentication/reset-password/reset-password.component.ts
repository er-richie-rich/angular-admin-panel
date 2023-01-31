import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminApiService} from "../../../Service/admin-api.service";
import swal from "sweetalert2";

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	resetPasswordForm: FormGroup
	email: string | null
	isSubmitted: boolean = false;
	
	constructor(private _location: Location, private fb: FormBuilder, private route: ActivatedRoute, private adminApiService: AdminApiService,private router:Router) {
		this.resetPasswordForm = this.fb.group({
			password: ['', [Validators.required]],
			confirmpassword: ['', [Validators.required]]
			
		})
		this.email = this.route.snapshot.paramMap.get('email');
	}
	
	ngOnInit(): void {
	}
	
	resetPassword() {
		if (this.resetPasswordForm.valid) {
			if (this.resetPasswordForm.value.password === this.resetPasswordForm.value.confirmpassword) {
				this.isSubmitted = this.adminApiService.resetPasswordService(this.email, this.resetPasswordForm.value.password);
				if(this.isSubmitted === true){
					swal.fire({
						icon:'success',
						title:'Success',
						text:'Your Password Is Reseted Successfully',
					}).then(res=>{
						if(res){
							this.router.navigate(['/'])
						}
					})
				}
			} else {
				swal.fire({
					icon: 'error',
					title: 'ERROR',
					text: 'Sorry ! Password And Confirm Password',
				}).then(res => {
					if (res) {
						this.router.navigate(['/reset-password'])
					}
				})
			}
		}
	}
	
	backClicked() {
		this._location.back();
	}
}
