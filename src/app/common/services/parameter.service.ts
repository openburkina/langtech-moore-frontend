import { Injectable } from '@angular/core';
import {Utilisateur} from "../../models/utilisateur.model";

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  private _currentUser: Utilisateur;

  constructor() { }


  get currentUser(): Utilisateur {
    return this._currentUser;
  }

  set currentUser(value: Utilisateur) {
    this._currentUser = value;
  }
}
