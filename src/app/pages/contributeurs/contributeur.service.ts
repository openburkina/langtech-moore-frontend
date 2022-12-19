import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Utilisateur} from "../../models/utilisateur.model";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {StatistiqueCriteria} from "../../models/statistiqueCriteria";
import {Statistique} from "../../models/statistique.model";
import {DateDto} from "../../models/dateDto";
import {BestContributorDto} from "../../models/bestContributorDto";

@Injectable({
  providedIn: 'root'
})
export class ContributeurService {
  contributeurs$: BehaviorSubject<Utilisateur[]> = new BehaviorSubject<Utilisateur[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.getContributeurs();
  }

  getContributeurs(): void {
    this.http.get<Utilisateur[]>(`/api/utilisateurs/contributeurs`, { observe: 'response' }).subscribe({
      next: response => {
        if (response.body) {
          console.log(response.body);
          this.contributeurs$.next(response.body);
        }
      }
    })
  }

  public getContributeursWitCriteria(contributeur: Utilisateur, req: any): Observable<HttpResponse<Utilisateur[]>> {
    let options: HttpParams = new HttpParams();
    Object.keys(req).forEach(
      key => {
        options = options.set(key, req[key]);
      }
    );
    return this.http.post<Utilisateur[]>(`/api/utilisateurs/criteria`, contributeur, { params: options, observe: 'response' });
  }

  public deleteContributeur(contriId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`/api/utilisateurs/${contriId}`, { observe: 'response' });
  }

  public getBestContributor(dateDto: DateDto): Observable<HttpResponse<BestContributorDto>> {
    return this.http.post<BestContributorDto>(`/api/traductions/best-contributor`, dateDto, { observe: "response"});
  }

  public getNbreContributor(): Observable<HttpResponse<number>> {
    return this.http.get<number>(`/api/utilisateurs/count-contributor`, { observe: "response"});
  }

  public getContributor(id:number): Observable<HttpResponse<Utilisateur>> {
    return this.http.get<Utilisateur>(`/api/utilisateurs/${id}`, { observe: "response"});
  }

}
