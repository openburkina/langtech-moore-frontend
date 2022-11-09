import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Langue} from "../../models/langue.model";
import {Traduction} from "../../models/traduction.model";
import {tap} from "rxjs/operators";

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
}
