import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() functionCalled = new EventEmitter();

  public callFunction(): void {
    this.functionCalled.emit();
  }

  isUserLoggedIn: boolean = false

  constructor(protected authservice: AuthService, protected router: Router) { }

  ngOnInit(): void {
    this.isuserloggedInFn()
  }

  isuserloggedInFn() {
    if (this.authservice.gettoken() != null) {
      this.isUserLoggedIn = true
    }
    else {
      this.isUserLoggedIn = false
    }
  }

  public someFunction(): void {
    console.log('Function called in Component 1');
  }

  logout() {
    this.authservice.destroytoken()
    this.authservice.destroyEmail()
    this.authservice.destroyId()
    this.router.navigateByUrl('/login')
  }

}
