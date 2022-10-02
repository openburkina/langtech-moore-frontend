import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthJwtService} from "../pages/auth/services/auth-jwt.service";
import {SpinnerService} from "../common/services/spinner.service";
import {finalize} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authJWT: AuthJwtService,
    private spinner: SpinnerService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.authJWT.getToken();
    this.spinner.loading();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(finalize(() => {this.spinner.close()}));
  }
}
