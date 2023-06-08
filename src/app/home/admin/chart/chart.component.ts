import { Component, Input, OnInit } from '@angular/core';
import { SurveyData } from '../model';
// import { OlxTestServicesService } from 'src/app/shared/olx/olx-test-services.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ApiService } from 'src/app/shared/api/api.service';
import {
  // ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chartOptions: any;
  chartOptions1: any;
  chartOptions2: any;
  chartOptions3: any;

  surveyData: SurveyData[];
  countries: string[] | unknown[];

  indianSeries: ApexNonAxisChartSeries;
  australiaSeries: ApexNonAxisChartSeries;
  spainSeries: ApexNonAxisChartSeries;
  unitedStateSeries: ApexNonAxisChartSeries;

  totalUsers: number;

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  }

  labels = ['student', 'salaried', 'self-employed', 'buisness']

  constructor(private apiService: ApiService, private toastr: ToastrService) {



  }


  ngOnInit(): void {
    this.getSurveyData();
  }

  getSurveyData() {
    this.apiService.getSurveyData().subscribe({
      next: async (res: any) => {
        if (res.success == true) {
          this.toastr.success('data loaded');

          this.surveyData = res.data;
          this.totalUsers = res.data.length;
          // console.log(this.totalUsers,res.data)
          this.countries = [...new Set(res.data.map((obj: SurveyData) => {
            return obj.userId.address.country
          }))]


          this.AssignIndiaData(res.data);
          this.AssignAustraliaData(res.data);
          this.AssignSpainData(res.data);
          this.AssignUsData(res.data);

          this.AssignVerticalData(res.data);
          this.AssignHorizontalData(res.data);

        }

        else {
          this.surveyData = []
          this.toastr.success(res.message);

        }

      },
      error: (err: any) => {
        this.toastr.success('something went wrong');
      }

    })
  }


  // pie charts data Assigning
  AssignIndiaData(responseData: any) {
    this.indianSeries = [
      responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.occupation === 'student' }).length,
      responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.occupation === 'salaried' }).length
      , responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.occupation === 'self-buisness' }).length
      , responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.occupation === 'buisness' }).length

    ]
  }


  AssignAustraliaData(responseData: any) {
    this.australiaSeries = [
      responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.occupation === 'student' }).length,
      responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.occupation === 'salaried' }).length
      , responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.occupation === 'self-buisness' }).length
      , responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.occupation === 'buisness' }).length
    ]

  }

  AssignSpainData(responseData: any) {
    this.spainSeries = [

      responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.occupation === 'student' }).length,
      responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.occupation === 'salaried' }).length
      , responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.occupation === 'self-buisness' }).length
      , responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.occupation === 'buisness' }).length
    ]

  }

  AssignUsData(responseData: any) {
    this.unitedStateSeries = [
      responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.occupation === 'student' }).length,
      responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.occupation === 'salaried' }).length
      , responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.occupation === 'self-buisness' }).length
      , responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.occupation === 'buisness' }).length
    ]
  }
  // pie charts data Assigning


  // Vertical chart data Assiging
  AssignVerticalData(responseData: any) {

    this.chartOptions2 = {
      series: [
        {
          name: 'India',
          data: [
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.income === '<5LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.income === '5-10LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.income === '10-20LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.income === '>20LPA' }).length / this.totalUsers) * 100).toFixed(1),
          ]
        },
        {
          name: 'Us', data: [
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.income === '<5LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.income === '5-10LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.income === '10-20LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.income === '>20LPA' }).length / this.totalUsers) * 100).toFixed(1),]
        },
        {
          name: 'Australia',
          data: [
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.income === '<5LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.income === '5-10LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.income === '10-20LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.income === '>20LPA' }).length / this.totalUsers) * 100).toFixed(1),]
        },
        {
          name: 'Spain',
          data: [
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.income === '<5LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.income === '5-10LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.income === '10-20LPA' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.income === '>20LPA' }).length / this.totalUsers) * 100).toFixed(1),]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: ['<5LPA', '5-10LPA', '10-20LPA', '>20LPA']
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          formatter: (value: any) => { return value + '%' },
        },
        min: 0,
        max: 100,
        tickAmount: 4,

      },
      fill: {
        opacity: 1
      },
      tooltip: {
        shared: true,
        y: {
          formatter: function (val: any) {
            return "$ " + val + " thousands";
          }
        }
      }
    };
  }
  // Vertical chart data Assiging

  // Horizontal chart data Assigning
  AssignHorizontalData(responseData: any) {
    this.chartOptions3 = {
      series: [
        {
          name: 'India',
          data: [
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.education === 'graduate' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.education === 'post-graduate' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.education === 'doctrate' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'India' && obj.education === '12th/diploma' }).length / this.totalUsers) * 100).toFixed(1),
          ],
        },
        {
          name: 'Us',
          data: [
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.education === 'graduate' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.education === 'post-graduate' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.education === 'doctrate' }).length / this.totalUsers) * 100).toFixed(1),
           ( (responseData.filter((obj: any) => { return obj.userId.address.country === 'United States' && obj.education === '12th/diploma' }).length / this.totalUsers) * 100).toFixed(1),]
        },
        {
          name: 'Australia',
          data: [
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.education === 'graduate' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.education === 'post-graduate' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.education === 'doctrate' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Australia' && obj.education === '12th/diploma' }).length / this.totalUsers) * 100).toFixed(1),]
        },
        {
          name: 'Spain',
          data: [
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.education === 'graduate' }).length / this.totalUsers) * 100).toFixed(1),
           ( (responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.education === 'post-graduate' }).length / this.totalUsers) * 100).toFixed(1),
            ((responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.education === 'doctrate' }).length / this.totalUsers) * 100).toFixed(1),
           ( (responseData.filter((obj: any) => { return obj.userId.address.country === 'Spain' && obj.education === '12th/diploma' }).length / this.totalUsers) * 100).toFixed(1),]
        }
      ],
      chart: {
        type: 'bar',
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value: any) => {
            return value + '%';
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
      },

      xaxis: {
        categories: ['Graduate', 'Post-graduate', 'Doctrate', '12th/Diploma'],
        labels: {
          formatter: (value: any) => { return value + '%' },
        },
        tickAmount: 4,

      },
      fill: {
        opacity: 1
      },

    };
  };
}
