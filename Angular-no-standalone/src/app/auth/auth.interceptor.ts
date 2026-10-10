import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";
@Injectable(

)
// the main idea here, instead of creating teh same logic for token handling for fetch and save data t the data storgae
// we can simply create a interceptor to handle it for both at the same time

export class AuthInterceptor implements HttpInterceptor{

    constructor(private authSer: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authSer.userSub.pipe(take(1), exhaustMap(user => {
            if(!user){
                return next.handle(req)
            }
            const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
            return next.handle(modifiedReq)
        }));
    }
    // now the intercaptor is not working as I have add this intercaptor for both login and signup 
    // and I have init the behavior subjectto null so no request will be even sent 
    // so to fix that we will check wether we have a user or not 

}