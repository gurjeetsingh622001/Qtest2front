import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
// import { OlxTestServicesService } from '../shared/olx/olx-test-services.service';
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService, private spinner: NgxSpinnerService, private apiService: ApiService) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])

    })
  }

  ngOnInit(): void {

    if (this.authService.gettoken() != null) {
      this.router.navigateByUrl('home/thanku')
    }

  }

  login() {
    if (this.loginForm.status === 'INVALID') {
      return this.loginForm.markAllAsTouched();
    }
    else {
      this.spinner.show();

      setTimeout(() => {
        this.apiService.userLogin(this.loginForm.value).subscribe({
          next: (res: any) => {
            console.log(res)
            if (res.success == true) {
              this.toastr.success(res.message)
              this.authService.storeTokenEmail(res)
              this.authService.saveuserId(res)

              if (res.surveyDataFilled == false) {
                console.log('false')
                this.router.navigateByUrl('home/question')
                this.spinner.hide();

              }
              if (res.role == 'admin' && res.surveyDataFilled == false) {
                this.router.navigateByUrl('home/admin')
                this.spinner.hide();
              }
              if (res.surveyDataFilled == true) {
                console.log('true')
                this.router.navigateByUrl('home/thanku')
                this.spinner.hide();
              }

            }
            else {
              console.log('sakmskldm')
              this.toastr.error('Error', res.message)
              this.spinner.hide();
            }
          },
          error: (err: any) => {
            this.toastr.error('Error', err.message)
            this.spinner.hide();
          }
        })
      }, 3000);

    }
  }

  get get() {
    return this.loginForm.controls
  }
}
