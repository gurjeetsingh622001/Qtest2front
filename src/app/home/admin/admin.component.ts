import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import { OlxTestServicesService } from 'src/app/shared/olx/olx-test-services.service';
import { SurveyData } from './model';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  surveyData: SurveyData[];
  countries: string[] | unknown[];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.getSurveyData();
    // console.log(this.surveyData?.filter((obj: any) => obj.userId))
  }

  getSurveyData() {
    this.apiService.getSurveyData().subscribe({
      next: async (res: any) => {
        if (res.success == true) {
          console.log(res.data)
          this.toastr.success('data loaded')

          this.surveyData = await res.data;

          this.countries = [...new Set(res.data.map((obj: SurveyData) => {
            return obj.userId.address.country
          }))]

          console.log(this.countries)

        }
        else {
          this.toastr.success(res.message)

        }

      },
      error: (err: any) => {
        this.toastr.success('something went wrong')
      }

    })
  }

}
