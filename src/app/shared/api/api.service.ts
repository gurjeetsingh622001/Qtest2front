import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userUrl: string

  constructor(@Inject('userurl') _userUrl: any, private http: HttpClient) {
    this.userUrl = _userUrl
  }

  userRegister(form: any) {
    return this.http.post(this.userUrl + 'adduser', form)
  }

  userLogin(form: any) {
    return this.http.post(this.userUrl + 'userlogin', form)
  }

  addSurvey(form: any) {
    return this.http.post(this.userUrl + "addSurvey", form)
  }


  getSurveyData() {
    return this.http.get(this.userUrl + 'getSurveyData')
  }

}
