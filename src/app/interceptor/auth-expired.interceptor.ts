import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../pages/auth/services/login.service";
import {Router} from "@angular/router";
import {AccountService} from "../pages/auth/services/account.service";
import {tap} from "rxjs/operators";
import {SessionStorageService} from "ngx-webstorage";
import {SpinnerService} from "../common/services/spinner.service";

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private accountService: AccountService,
    private $sessionStorage: SessionStorageService,
    private spinner: SpinnerService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          this.spinner.close();
          if (err.status === 401 && err.url && !err.url.includes('api/account') && this.accountService.isAuthenticated()) {
            this.$sessionStorage.store('url', this.router.routerState.snapshot.url);
            this.loginService.logout();
            this.router.navigate(['/auth/login']);
          }
        },
      })
    );
  }
}
