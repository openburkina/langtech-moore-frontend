import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Domaine} from "../../models/domaine.model";

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  constructor(
    private http: HttpClient,
  ) { }

  public createDomaine(domaine: Domaine): Observable<HttpResponse<Domaine>> {
    return this.http.post<Domaine>(`/api/domaines`, domaine, { observe: 'response' });
  }

  public updateDomaine(domaine: Domaine): Observable<HttpResponse<Domaine>> {
    return this.http.put<Domaine>(`/api/domaines/${domaine.id}`, domaine, { observe: 'response' });
  }

  public deleteDomaine(domaineId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`/api/domaines/${domaineId}`, { observe: 'response' });
  }

  public getDomaines(): Observable<HttpResponse<Domaine[]>> {
    return this.http.get<Domaine[]>(`/api/domaines`, { observe: 'response' });
  }

  public findBySuperDomaineId(id: number): Observable<HttpResponse<Domaine[]>> {
    return this.http.get<Domaine[]>(`/api/domaines/sous-domaine/${id}`, { observe: 'response' });
  }
}
