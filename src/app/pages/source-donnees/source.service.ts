import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {SourceDonnee} from "../../models/sourceDonnee.model";

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor( private http: HttpClient,) { }
  public createSourceDonnee(file: any): Observable<HttpResponse<SourceDonnee>> {
    return this.http.post<SourceDonnee>(`/api/source-donnees/upload`, file, { observe: 'response' });
  }

  public updateSourceDonnee(source: SourceDonnee): Observable<HttpResponse<SourceDonnee>> {
    return this.http.put<SourceDonnee>(`/api/source-donnees/${source.id}`, source.file, { observe: 'response' });
  }

  public deleteSourceDonnee(sourceId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`/api/source-donnees/${sourceId}`, { observe: 'response' });
  }

  public getSourceDonnees(): Observable<HttpResponse<SourceDonnee[]>> {
    return this.http.get<SourceDonnee[]>(`/api/source-donnees`, { observe: 'response' });
  }

  public findBySuperSourceDonneeId(id: number): Observable<HttpResponse<SourceDonnee[]>> {
    return this.http.get<SourceDonnee[]>(`/api/source-donnees/sous-source/${id}`, { observe: 'response' });
  }
}
