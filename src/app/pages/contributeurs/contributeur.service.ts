import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Utilisateur} from "../../models/utilisateur.model";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Traduction} from "../../models/traduction.model";
import {Langue} from "../../models/langue.model";

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
    this.http.get<Utilisateur[]>(`/api/utilisateurs`, { observe: 'response' }).subscribe({
      next: response => {
        if (response.body) {
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
}
