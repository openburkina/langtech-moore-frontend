import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";
import {PasswordChange} from "../../models/passwordChange.model";
import {KeyAndPasswod} from "../../models/key-and-passwod.model";
import {Utilisateur} from "../../models/utilisateur.model";
import {MResponse} from "../../models/m-response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  public createUser(utilisateur: Utilisateur): Observable<HttpResponse<Utilisateur>> {
    return this.http.post<User>(`/api/utilisateurs`, utilisateur, { observe: 'response' });
  }

  public updateUser(utilisateur: Utilisateur): Observable<HttpResponse<Utilisateur>> {
    return this.http.put<User>(`/api/utilisateurs/${utilisateur.id}`, utilisateur, { observe: 'response' });
  }

  public enableOrDisableUser(utilisateur: Utilisateur): Observable<HttpResponse<MResponse>> {
    return this.http.put<MResponse>(`/api/utilisateurs/enable-desable`, utilisateur, { observe: 'response' });
  }

  public deleteUser(userId: number): Observable<HttpResponse<MResponse>> {
    return this.http.delete<MResponse>(`/api/utilisateurs/${userId}`, { observe: 'response' });
  }

  public getOneUser(userId: number): Observable<HttpResponse<Utilisateur>> {
    return this.http.get<Utilisateur>(`/api/utilisateurs/${userId}`, { observe: 'response' });
  }

  public getUsers(req: any): Observable<HttpResponse<User[]>> {
    let options: HttpParams = new HttpParams();
    Object.keys(req).forEach(
      key => {
        options = options.set(key, req[key]);
      }
    );
    return this.http.get<User[]>(`/api/utilisateurs`, { params: options, observe: 'response' });
  }

  public getUsersByCriteria(user: Utilisateur, req: any): Observable<HttpResponse<Utilisateur[]>> {
    let options: HttpParams = new HttpParams();
    Object.keys(req).forEach(
      key => {
        options = options.set(key, req[key]);
      }
    );
    return this.http.post<Utilisateur[]>(`/api/utilisateurs/criteria`, user, { params: options, observe: 'response' });
  }

  public changePassword(password: PasswordChange): Observable<HttpResponse<void>> {
    return this.http.post<void>(`/api/account/change-password`, password, { observe: 'response'});
  }

  public requestPasswordReset(email: string): Observable<HttpResponse<void>> {
    return this.http.post<void>(`api/account/reset-password/init`, email, { observe: 'response' });
  }

  public finishPasswordReset(keyAndPasswod: KeyAndPasswod): Observable<HttpResponse<void>> {
    return this.http.post<void>(`api/account/reset-password/finish`, keyAndPasswod, { observe: 'response' });
  }
}
