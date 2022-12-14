import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Langue} from "../../models/langue.model";
import {Traduction} from "../../models/traduction.model";
import {Utilisateur} from "../../models/utilisateur.model";
import {StatistiqueCriteria} from "../../models/statistiqueCriteria";
import {Statistique} from "../../models/statistique.model";
import {StateMois} from "../../models/stateMois.model";

@Injectable({
  providedIn: 'root'
})
export class ContributionService {
  traductions$: BehaviorSubject<Traduction[]> = new BehaviorSubject<Traduction[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.init();
  }

  public init(): void {
    this.http.get<Langue[]>(`/api/traductions`, { observe: 'response' }).subscribe({
      next: response => {
        if (response.body) {
          this.traductions$.next(response.body);
        }
      }
    });
  }

  public getTraductions(traduction: Traduction, req: any): Observable<HttpResponse<Traduction[]>> {
    let options: HttpParams = new HttpParams();
    Object.keys(req).forEach(
      key => {
        options = options.set(key, req[key]);
      }
    );
    return this.http.post<Langue[]>(`/api/traductions/criteria`, traduction, { params: options, observe: 'response' });
  }

  public delete(traductionId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`/api/traductions/${traductionId}`, { observe: "response"});
  }

  public getOne(traductionId: number): Observable<HttpResponse<Traduction>> {
    return this.http.get<Traduction>(`/api/document/traduction?traductionId=${traductionId}`, { observe: "response"});
  }

  public onValide(traduction: Traduction): Observable<HttpResponse<Traduction>> {
    // const t: Traduction = new Traduction();
    // t.id = traductionId;
    // t.etat = statut;
    return this.http.post<Traduction>(`/api/traductions/validation`, traduction, { observe: "response"});
  }

  public onGetStatistiques(statistiqueCriteria: StatistiqueCriteria): Observable<HttpResponse<Statistique[]>> {
    return this.http.post<Statistique[]>(`/api/getStatistique`, statistiqueCriteria, { observe: "response"});
  }

  public getContributionByContributeur(id: number): Observable<HttpResponse<Traduction[]>> {
    return this.http.get<Traduction[]>(`/api/traductions-by-contibuteur/${id}`, { observe: "response"});
  }

  public getContributionBySource(id: number): Observable<HttpResponse<Traduction[]>> {
    return this.http.get<Traduction[]>(`/api/traductions-by-source/${id}`, { observe: "response"});
  }

  public getStatistique(): Observable<HttpResponse<StateMois[]>> {
    return this.http.get<StateMois[]>(`/api/traductions-get-info-stats-mois`, { observe: "response"});
  }

  public getNbreSourceTranslated(): Observable<HttpResponse<number>> {
    return this.http.get<number>(`/api/traductions/count-translated`, { observe: "response"});
  }

  public getTraductionsPerso(traduction: Traduction, req: any): Observable<HttpResponse<Traduction[]>> {
    let options: HttpParams = new HttpParams();
    Object.keys(req).forEach(
      key => {
        options = options.set(key, req[key]);
      }
    );
    return this.http.post<Langue[]>(`/api/traductions/count/criteria`, traduction, { params: options, observe: 'response' });
  }
}
