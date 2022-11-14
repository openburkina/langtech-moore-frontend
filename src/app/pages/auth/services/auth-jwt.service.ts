import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

import * as jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoginVM} from "../../../models/LoginVM";
import {User} from "../../../models/user.model";
import {AccountService} from "./account.service";
import {ParameterService} from "../../../common/services/parameter.service";

interface JwtToken {
  id_token: string;
  utilisateur: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthJwtService {
  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private router: Router,
    private accoutService: AccountService,
    private parameter: ParameterService,
  ) { }

  getToken(): string {
    return (this.$sessionStorage.retrieve('authenticationToken')
      || this.$localStorage.retrieve('authenticationToken')) || '';
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode.default(token);

    // @ts-ignore
    if (decoded.exp === undefined) return null;

    const date = new Date(0);

    // @ts-ignore
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(credentials: LoginVM): Observable<void> {
    return this.http
      .post<JwtToken>('/api/authenticate', credentials)
      .pipe(map((response: JwtToken) => {
        console.log(response);
          this.authenticateSuccess(response, credentials.rememberMe);
        }),
      );
  }

  logout(): void {
    this.$localStorage.clear();
    this.$sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    this.accoutService.saveCurrentUserInfos(response.utilisateur);
    this.parameter.currentUser = response.utilisateur;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }

}
