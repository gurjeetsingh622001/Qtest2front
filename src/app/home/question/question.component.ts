import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
// import { OlxTestServicesService } from 'src/app/shared/olx/olx-test-services.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  surveyForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private authService: AuthService, private toastr: ToastrService, private router: Router, private spinner: NgxSpinnerService) {
    this.surveyForm = this.formBuilder.group({
      occupation: ['', Validators.required],
      income: ['', Validators.required],
      education: ['', Validators.required],
      email: [''],
      userId: ['']
    });
  }

  userEmail: String | null;
  value = 0;
  questions = [
    "Question one / out of three",
    "Question two /out of three",
    "Question three /out of three"
  ];

  //  this.value += 33.3333333333;

  ngOnInit(): void {

    this.surveyForm.patchValue({
      'email': this.authService.getEmail(),
      'userId': this.authService.getuserId()
    });

  }

  submit() {
    this.spinner.show()
    this.apiService.addSurvey(this.surveyForm.value).subscribe({
      next: (res: any) => {
        if (res.success == true) {
          setTimeout(() => {
            this.router.navigateByUrl('home/thanku');
            this.toastr.success(res.message);
            this.spinner.hide();
          }, 3000);
        }
        else {
          setTimeout(() => {
            this.toastr.success(res.message);
            this.spinner.hide();
          }, 3000);
        }
      },
      error: (err: any) => {
        setTimeout(() => {
          this.toastr.success('something went wrong');
          this.spinner.hide();
        }, 3000);

      }
    }
    )
  }

  numberOfQuestions = 3;
  currentQuestionIndex = 0;

  nextQuestion() {
    if (this.currentQuestionIndex == 0 && this.surveyForm.value.occupation != '') {
      this.currentQuestionIndex++;
    }
    if (this.currentQuestionIndex == 1 && this.surveyForm.value.income != '') {
      this.currentQuestionIndex++;
    }
    if (this.currentQuestionIndex == 1 && this.surveyForm.value.education != '') {
      this.currentQuestionIndex++;
    }

    // if (this.currentQuestionIndex < 2) {
    // }

  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  get get() {
    return this.surveyForm.controls
  }

  changeEventCount = 0;
  changeEventCount1 = 0;
  changeEventCount2 = 0;

  changeOccupation(event: any) {
    this.changeEventCount++;
    if (this.changeEventCount == 1) {
      this.value += 33.3333333333;
    }
  }

  changeIncome() {
    // console.log()
    this.changeEventCount1++;
    if (this.changeEventCount1 == 1) {
      this.value += 33.3333333333;
    }
  }
  changeEducation() {
    this.changeEventCount2++;
    if (this.changeEventCount2 == 1) {
      this.value += 33.3333333333;
    }
  }

}
