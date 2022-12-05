import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse} from "@angular/common/http";
import {SourceDonnee} from "../../models/sourceDonnee.model";
import {MResponse} from "../../models/m-response.model";
import {Traduction} from "../../models/traduction.model";
import {Langue} from "../../models/langue.model";

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor( private http: HttpClient,) { }

  public createSourceDonnee(sourceDonnee: SourceDonnee): Observable<HttpResponse<MResponse>> {
    return this.http.post<MResponse>(`/api/source-donnees/upload`, sourceDonnee, { observe: 'response' });
  }

  upload(file: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post<SourceDonnee>(`/api/source-donnees/upload`, formData, { observe: 'response' });

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

  public updateSourceDonneeLigne(source: SourceDonnee): Observable<HttpResponse<SourceDonnee>> {
    return this.http.put<SourceDonnee>(`/api/source-donnees/${source.id}`, source, { observe: 'response' });
  }
  public createSourceDonneeLigne(sourceDonnee: SourceDonnee): Observable<HttpResponse<MResponse>> {
    return this.http.post<MResponse>(`/api/source-donnees`, sourceDonnee, { observe: 'response' });
  }

  public getSourceDonneWithCriteria(sourceDonnee: SourceDonnee, req: any): Observable<HttpResponse<Traduction[]>> {
    let options: HttpParams = new HttpParams();
    Object.keys(req).forEach(
      key => {
        options = options.set(key, req[key]);
      }
    );
    return this.http.post<Langue[]>(`/api/source-donnees/criteria`, sourceDonnee, { params: options, observe: 'response' });
  }

  public getNbreSourceDonnee(): Observable<HttpResponse<number>> {
    return this.http.get<number>(`/api/source-donnees/count`, { observe: 'response' });
  }

}
