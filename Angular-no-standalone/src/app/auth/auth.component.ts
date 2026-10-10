import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoggedIn: boolean = true;
  isLoading: boolean = false;
  error = '';

  constructor(
    private authSer: AuthService,
    private router: Router
  ) { }
  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(authForm: NgForm) {
  if (!authForm.valid) {
    return;
  }

  const email = authForm.value.email;
  const password = authForm.value.password;

  this.isLoading = true;
  // we can handle an observable where we will handle all the subscribtion for the signup and login once fo avoid DRY
  let authObs$: Observable<AuthResponseData>;

  if(this.isLoggedIn){
    // login method
    authObs$ = this.authSer.loginMethod(email, password)
  } else {
    authObs$ = this.authSer.signupMethod(email, password)
  }



  authObs$.subscribe({
  next: (res) => {
    console.log(res);
    this.isLoading = false;
    this.router.navigate(['/recipes']);
  },
  error: (errorMessage) => {
    console.log(errorMessage);
    this.error = errorMessage;
    this.isLoading = false;
  }
})

  authForm.reset();

  }
  onHandleClose(){
    this.error = '';
  }
}
