import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { OlxTestServicesService } from '../shared/olx/olx-test-services.service';
import { Country, State } from './models';
import { ApiService } from '../shared/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // buttonValidation: Boolean = false
  addUserForm: FormGroup;
  countries: Country[] = [];
  states: State[] = [];
  isCountrySelected = false;
  isStateSelected = false;

  passwordIsValid = false;

  constructor(private toastr: ToastrService, private router: Router, private apiService: ApiService, private spinner: NgxSpinnerService) {

    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]+([ \-''][a-zA-Z0-9]+)*(\s*)$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:\+91|0)?[6789]\d{9}\s?$/)]),
      email: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*$/)]),
      dob: new FormControl('', [Validators.required, this.validDateofBirth()]),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).+$/), Validators.minLength(6), Validators.maxLength(50)]),
      confirm_pass: new FormControl('', [Validators.required, this.confirmPass()])
    })
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*$/)


    this.countries = [
      { name: 'Australia', code: 'AU', flageImage: "../../assets/flag/au.png" },
      { name: 'India', code: 'INR', flageImage: "../../assets/flag/inr.png" },
      { name: 'Spain', code: 'ES', flageImage: "../../assets/flag/spn.png" },
      { name: 'United States', code: 'US', flageImage: "../../assets/flag/us.png" }

    ];
  }


  ngOnInit(): void {
    // console.log(this.addUserForm.status === 'INVALID')
  }
  // Jag@123


  register() {

    // this.buttonValidation = true
    if (this.addUserForm.status === 'INVALID' || this.passwordIsValid == false) {
      return this.addUserForm.markAllAsTouched();
    }
    else {
      this.spinner.show()
      this.apiService.userRegister(this.addUserForm.value).subscribe({
        next: (res: any) => {
          console.log(res)
          if (res.success == true) {

            setTimeout(() => {
              this.toastr.success('sucess', res.message)
              this.router.navigateByUrl('login')
              this.spinner.hide()
            }, 3000);

          }
          else {
            // console.log(res)
            setTimeout(() => {
              this.toastr.error('error', res.message)
              this.spinner.hide()
            }, 3000);

          }

        },
        error: (err) => {
          this.toastr.error('error', 'some thing went Wrong')
          setTimeout(() => {
            this.spinner.hide()
          }, 3000);

        }
      })
    }

  }

  get get() {
    return this.addUserForm.controls
  }

  onSelectCountry(event: any) {
    // this.address.country = event.value.name
    // console.log(event.value.name)

    if (event.value.name == 'Australia') {
      this.states = [
        { name: 'New South Wales' },
        { name: 'Northern Territory' },
        { name: 'Tasmania' },
        { name: 'Victoria' }
      ]
    }
    if (event.value.name == 'India') {
      this.states = [
        { name: 'Punjab' },
        { name: 'Himachal Pardesh' },
        { name: 'Haryana' },
        { name: 'Uttar Pardesh' }
      ]
    }
    if (event.value.name == 'Spain') {
      this.states = [
        { name: 'Barcelona' },
        { name: 'Alava' },
        { name: 'Biscay' },
        { name: 'seville' }
      ]
    }
    if (event.value.name == 'United States') {
      this.states = [
        { name: 'California' },
        { name: 'Texas' },
        { name: 'Florida' },
        { name: 'Ohio' }
      ]
    }
    this.isCountrySelected = true;
  }

  confirmPass(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let password = this.addUserForm?.controls['password']?.value
      let confirm_pass = this.addUserForm?.controls['confirm_pass']?.value
      if (password === confirm_pass) {
        return null
      }
      else {
        return { 'confirmPassword': true }
      }
    }
  }


  validDateofBirth(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let dateOfBirth = this.addUserForm?.controls['dob']?.value

      const today = new Date();
      const dob = new Date(dateOfBirth);

      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDay = today.getDate();

      const dobDay = dob.getDate();
      const dobMonth = dob.getMonth();
      const dobYear = dob.getFullYear();

      const age = today.getFullYear() - dob.getFullYear();

      if (dobYear > todayYear) {
        return { 'validDob': true };
      } else if (dobYear === todayYear && dobMonth > todayMonth) {
        return { 'validDob': true };
      } else if (dobYear === todayYear && dobMonth === todayMonth && dobDay > todayDay) {
        return { 'validDob': true };
      }
      if (dobYear < 1923) {
        return { 'validDob': true };
      }
      if (age < 18) {
        return { 'ageRestriction': true }
      }

      return null; // Valid date of birth
    };
  }


  passwordValid(event: any) {
    this.passwordIsValid = event;
    console.log(event)
  }



}
