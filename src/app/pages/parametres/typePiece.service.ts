import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypePiece} from "../../models/typePiece.model";

@Injectable({
  providedIn: 'root'
})
export class TypePieceService {
  constructor(
    private http: HttpClient,
  ) { }

  public createTypePiece(typePiece: TypePiece): Observable<HttpResponse<TypePiece>> {
    return this.http.post<TypePiece>(`/api/type-pieces`, typePiece, { observe: 'response' });
  }

  public updateTypePiece(typePiece: TypePiece): Observable<HttpResponse<TypePiece>> {
    return this.http.put<TypePiece>(`/api/type-pieces`, typePiece, { observe: 'response' });
  }

  public deleteTypePiece(typePieceId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`/api/type-pieces/${typePieceId}`, { observe: 'response' });
  }

  public getTypePieces(): Observable<HttpResponse<TypePiece[]>> {
    return this.http.get<TypePiece[]>(`/api/type-pieces`, { observe: 'response' });
  }
}
