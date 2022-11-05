import { Injectable } from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {User} from "../../../models/user.model";
import {DataParameter} from "../../../models/data_parameter.model";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userIdentity: User | null = null;
  private authenticationState = new ReplaySubject<User | null>(1);
  private accountCache$?: Observable<User | null>;
  readonly CURRENT_USER_INFOS_KEY = 'CURRENT_USER_INFOS_KEY';

  constructor(
    private http: HttpClient,
    private router: Router,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    // private parameter: ParameterService,
  ) {}

  save(account: Account): Observable<{}> {
    return this.http.post('/api/account', account);
  }

  authenticate(identity: User | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    console.log(authorities);
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  identity(force?: boolean): Observable<User | null> {
    const currentUserInfos = this.getCurrentUserInfos();
    console.log(currentUserInfos);
    if (!currentUserInfos) {
      if (!this.accountCache$ || force || !this.isAuthenticated()) {
        this.accountCache$ = this.fetch().pipe(
          catchError(() => {
            console.log('ERROR LOGING...');
            return of(null);
          }),
          tap((user: User | null) => {
            console.log(user);
            if (user) {
              this.saveCurrentUserInfos(user);
              this.authenticate(user);
              this.navigateToStoredUrl();
            }
          }),
          shareReplay(),
        );
      }
    } else {
      this.accountCache$ = of(currentUserInfos);
      this.authenticate(currentUserInfos);
      this.navigateToStoredUrl();
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<User | null> {
    return this.authenticationState.asObservable();
  }

  private fetch(): Observable<DataParameter> {
    return this.http.get<DataParameter>('/api/account');
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.$sessionStorage.retrieve('url');
    if (previousUrl) {
      this.$sessionStorage.clear('url');
      this.router.navigateByUrl(previousUrl);
    }
  }

  private saveCurrentUserInfos(currentUserInfos: User): void {
    this.$localStorage.store(this.CURRENT_USER_INFOS_KEY, currentUserInfos);
  }

  private getCurrentUserInfos(): User {
    return this.$localStorage.retrieve(this.CURRENT_USER_INFOS_KEY);
  }
}
