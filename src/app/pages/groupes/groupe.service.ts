import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Groupe} from "../../models/groupe.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  constructor(
    private http: HttpClient,
  ) { }

  public createGroupe(groupe: Groupe): Observable<HttpResponse<Groupe>> {
    return this.http.post<Groupe>(`/api/groupes`, groupe, { observe: 'response' });
  }

  public updateGroupe(groupe: Groupe): Observable<HttpResponse<Groupe>> {
    return this.http.put<Groupe>(`/api/groupes/${groupe.id}`, groupe, { observe: 'response' });
  }

  public deleteGroupe(groupeId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`/api/groupes/${groupeId}`, { observe: 'response' });
  }

  public getGroupes(): Observable<HttpResponse<Groupe[]>> {
    return this.http.get<Groupe[]>(`/api/groupes`, { observe: 'response' });
  }
}
