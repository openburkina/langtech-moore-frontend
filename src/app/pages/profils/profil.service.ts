import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profil} from "../../models/profil.model";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  constructor(
    private http: HttpClient,
  ) { }

  public createProfil(profil: Profil): Observable<HttpResponse<Profil>> {
    return this.http.post<Profil>(`/api/profils`, profil, { observe: 'response' });
  }

  public updateProfil(profil: Profil): Observable<HttpResponse<Profil>> {
    return this.http.put<Profil>(`/api/profils/${profil.id}`, profil, { observe: 'response' });
  }

  public deleteProfil(profilId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`/api/profils/${profilId}`, { observe: 'response' });
  }

  public getProfils(): Observable<HttpResponse<Profil[]>> {
    return this.http.get<Profil[]>(`/api/profils`, { observe: 'response' });
  }

  public getAuthorities(): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(`/api/getAutorities`, { observe: 'response' });
  }
}
