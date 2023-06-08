import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authGuard/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './home/question/question.component';
import { ThankuComponent } from './home/thanku/thanku.component';
import { FirstComponent } from './home/first/first.component';
import { AdminComponent } from './home/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/first', pathMatch: 'full' },

  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'question', component: QuestionComponent, canActivate: [AuthGuard] },
      { path: 'thanku', component: ThankuComponent, canActivate: [AuthGuard] },
      { path: 'first', component: FirstComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
