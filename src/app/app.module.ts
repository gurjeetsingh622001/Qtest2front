import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { ChartComponent } from './home/admin/chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { QuestionComponent } from './home/question/question.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { ThankuComponent } from './home/thanku/thanku.component';
import { FirstComponent } from './home/first/first.component';
import { AdminComponent } from './home/admin/admin.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { PasswordStrengthComponent } from './register/password-strength/password-strength.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SpinnerComponent } from './leela/spinner/spinner.component';
 
@NgModule({
  declarations: [
    AppComponent,
    // WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    // ViewuserComponent,
    // EdituserComponent,
    // AddBrandComponent,
    // ViewBrandComponent,
    // ProductsComponent,
    // CartComponent,
    HomeComponent,
    HeaderComponent,
    ChartComponent,
    QuestionComponent,
    ThankuComponent,
    FirstComponent,
    AdminComponent,
    PasswordStrengthComponent,
    SpinnerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ChartModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    StepsModule,
    ProgressBarModule,
    NgApexchartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
