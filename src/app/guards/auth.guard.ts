import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AlertsService } from '../services/alerts/alerts.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const authGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const alert = inject(AlertsService);

  let isLoggedIn = false;

  auth.loggedIn$.subscribe(res => isLoggedIn = res);
  if(isLoggedIn){
    console.log(auth.isLoggedIn());
    return true;
  } else {
    console.log(auth.isLoggedIn());
    alert.notify('Inicia sesion primero','','error');
    router.navigate(['/login']);
    return false;
  }
}
