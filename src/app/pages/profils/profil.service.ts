import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Profil} from "../../models/profil.model";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  profils$: BehaviorSubject<Profil[]> = new BehaviorSubject<Profil[]>([]);
  constructor(
    private http: HttpClient,
  ) {
    this.init();
  }

  init(): void {
    this.getProfils().subscribe({
      next: response => {
        this.profils$.next(response.body);
      }
    });
  }

  public createProfil(profil: Profil): Observable<HttpResponse<Profil>> {
    return this.http.post<Profil>(`/api/profils`, profil, { observe: 'response' }).pipe(
      tap(() => this.init())
    );
  }

  public updateProfil(profil: Profil): Observable<HttpResponse<Profil>> {
    return this.http.put<Profil>(`/api/profils/${profil.id}`, profil, { observe: 'response' }).pipe(
      tap(() => this.init())
    );
  }

  public deleteProfil(profilId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`/api/profils/${profilId}`, { observe: 'response' }).pipe(
      tap(() => this.init())
    );
  }

  public getProfils(): Observable<HttpResponse<Profil[]>> {
    return this.http.get<Profil[]>(`/api/profils`, { observe: 'response' });
  }

  public getAuthorities(): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(`/api/admin/users/authorities`, { observe: 'response' });
  }
}
