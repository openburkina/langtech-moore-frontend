import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Utilisateur} from "../../models/utilisateur.model";
import {HttpClient} from "@angular/common/http";

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
}
