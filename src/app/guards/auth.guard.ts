import { AuthServiceService } from './../services/auth/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public _auth: AuthServiceService,
    private router: Router,

  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise((resolve, reject) => {
      this._auth.getCurrentUser()
        .then(user => {
       
          
          return resolve(true);
        }, err => {
          
           this.router.navigate(['/login']);
          return resolve(false);
        });
    });
  }
}
