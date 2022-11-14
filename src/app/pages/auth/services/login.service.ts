import { Injectable } from '@angular/core';
import {AccountService} from './account.service';
import {AuthJwtService} from './auth-jwt.service';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {LoginVM} from "../../../models/LoginVM";
import {User} from "../../../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private accountService: AccountService,
    private authServerProvider: AuthJwtService,
  ) {
  }

  login(credentials: LoginVM): Observable<User | null> {
    return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout();
  }
}
