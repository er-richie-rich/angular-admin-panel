import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Validators, FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  constructor(private _location: Location, private fb :FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      birthDate : [[Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/gi)]],
      email: ['', [Validators.required, Validators.pattern('\\w+([-+.]\\w+)*@yahoo.(com|in)|gmail.(com|in)|hotmail.(com|in)|redmail.(com|in)|microsoft.(com|in)')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)]],
    })
  }

  ngOnInit(): void {
  }


  backClicked() {
    this._location.back();
  }
}
