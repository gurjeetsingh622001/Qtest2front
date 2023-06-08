import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // saving token user token in local storge  code starts 
  storeTokenEmail(data: any) {
    localStorage.setItem("token", data.token)
    localStorage.setItem("email", data.email)
  }

  gettoken() {
    return localStorage.getItem("token")
  }

  getEmail() {
    return localStorage.getItem("email")
  }

  destroytoken() {
    localStorage.removeItem("token")
  }
  
  destroyEmail() {
    localStorage.removeItem("email")

  }
  // saving token user token in local storge  code starts 

  //saving user Id 
  saveuserId(data: any) {
    localStorage.setItem('userId', data.userId)
  }

  getuserId() {
    return localStorage.getItem('userId')
  }

  destroyId() {
    localStorage.removeItem('userId')
  }

  // 

  constructor() { }

}
