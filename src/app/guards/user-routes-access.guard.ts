import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountService} from "../pages/auth/services/account.service";
import {AuthJwtService} from "../pages/auth/services/auth-jwt.service";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {SessionStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root',
})
export class UserRoutesAccessGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private authJWT: AuthJwtService,
    private router: Router,
    private $sessionStorage: SessionStorageService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.authJWT.isTokenExpired()) {
      return this.accountService.identity().pipe(
        map(account => {
          if (account) {
            const authorities = route.data['authorities'];

            if (!authorities || authorities.length === 0 || this.accountService.hasAnyAuthority(authorities)) {
              return true;
            }

            this.router.navigate(['error/error-404']);
            return false;
          }

          this.$sessionStorage.store('url', state.url);
          this.router.navigate(['auth/login']);
          return false;
        })
      );
    }
    this.router.navigate(['auth/login']);
    return of(false);
  }
}
