import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Langue} from "../../models/langue.model";
import {Traduction} from "../../models/traduction.model";

@Injectable({
  providedIn: 'root'
})
export class ContributionService {
  traductions$: BehaviorSubject<Traduction[]> = new BehaviorSubject<Traduction[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.getTraductions();
  }

  public getTraductions(): void {
    this.http.get<Langue[]>(`/api/traductions`, { observe: 'response' }).subscribe({
      next: response => {
        if (response.body) {
          this.traductions$.next(response.body);
        }
      }
    });
  }
}
