import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categorie} from "../../models/categorie.model";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  constructor(
    private http: HttpClient,
  ) { }

  public createCategorie(categorie: Categorie): Observable<HttpResponse<Categorie>> {
    return this.http.post<Categorie>(`/api/categories`, categorie, { observe: 'response' });
  }

  public updateCategorie(categorie: Categorie): Observable<HttpResponse<Categorie>> {
    return this.http.put<Categorie>(`/api/categories/${categorie.id}`, categorie, { observe: 'response' });
  }

  public deleteCategorie(categorieId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`/api/categories/${categorieId}`, { observe: 'response' });
  }

  public getCategories(): Observable<HttpResponse<Categorie[]>> {
    return this.http.get<Categorie[]>(`/api/categories`, { observe: 'response' });
  }
  public findBySuperCategorieId(id: number): Observable<HttpResponse<Categorie[]>> {
    return this.http.get<Categorie[]>(`/api/categories/sous-categorie/${id}`, { observe: 'response' });
  }
}
