import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponseData, User } from "./auth.model";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
// best practice to hanle the error here in order to make the component as empty logic as possible
// catch error return an observable so we will handle that using throwError
export class AuthService{
  private userModel!: User;
  userSub = new BehaviorSubject<User | null>(null);
  private tokenTimer: any;
  private authRes!: AuthResponseData
  // we need to save the token in order I can get it with not need to get the user data and teh complete service instead
  // we can simply handle a prop to hold the token token!: string; or use behaviour subject()
  
  // the difference between subject and behavior subject that behaviour subject gives subscribers an immediate access to teh emitted value even they don't subscribe on it 

  constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    API_KEY = 'AIzaSyBOTUvpxglj7lL4PC3B0G0YbJyFXMN2riI'
    // signup 
    signupMethod(email: string, password: string) {
  return this.http.post<AuthResponseData>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true
    }
  ).pipe(catchError(this.handleError), tap(resData => this.handleAutentication(resData)))
  }
  // login method
  loginMethod(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, 
      {
      email,
      password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(resData => this.handleAutentication(resData)))
  }
  // logout
   logoutMethod(){
    this.userSub.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenTimer){
      clearTimeout(this.tokenTimer)
    }
    this.tokenTimer = null
  }

  // auto logout
 autoLogout(expirationDuration: number){
  this.tokenTimer = setTimeout(() => 
      this.logoutMethod(), 
      expirationDuration 
    )
    // for testing set the expirationDuration to 2000
 }
  // error handling function 
  private handleError(errorRes: HttpErrorResponse){
    let errorMesage = 'unknown error occurred'
    // errorRes.error || !errorRes.error.error error response shape from firbase 
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMesage)
        }
        switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMesage = 'This Email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMesage = 'This Email does not exists'
          break;
        case 'INVALID_PASSWORD':
          errorMesage = 'This password is nt correct';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMesage = 'Invalid email or password';
          break;
          
      }
      return throwError(errorMesage)
  }

 private handleAutentication(resData: AuthResponseData) {
    this.userModel = {
    email: resData.email,
    id: resData.localId,
    token: resData.idToken,
    _tokenExpirationDate: new Date(Date.now() + Number(resData.expiresIn) * 1000)
  };
  // don't forget tp transfer the expiresIn to string as it return as number then transfer it (to mile seconds *1000) expires in in seconds Date in ms
    this.userSub.next(this.userModel);
    this.autoLogout(this.userModel._tokenExpirationDate.getTime() - Date.now())
    localStorage.setItem('userData', JSON.stringify(this.userModel))
 }

 // auto login
autoLogin() {
  const userData = JSON.parse(localStorage.getItem('userData') || 'null') as User | null;
  if (!userData) return;

  const loadedUser: User = {
    email: userData.email,
    id: userData.id,
    token: userData.token,
    _tokenExpirationDate: new Date(userData._tokenExpirationDate)
  };
  if(loadedUser.token){

    this.userSub.next(loadedUser)
    const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
    this.autoLogout(expDuration)
  }
}


}