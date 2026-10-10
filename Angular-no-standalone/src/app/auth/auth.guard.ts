import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
   return authService.userSub.pipe(
    take(1),
    map(user =>
    {
      const isAuth =  !!user
    if(isAuth){
      return true;
    }
    //in Angular allows you to programmatically construct a URL tree for navigation,
    //including paths, query parameters, fragments, and auxiliary outlets.
    return router.createUrlTree(['/auth'])
  }
  ))
};
