import {Profil} from "./profil.model";

export class Utilisateur {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public telephone?: string,
    public email?: string,
    public login?: string,
    public typeUtilisateur?: string,
    public pointFidelite?: number,
    public profil?: Profil,
    public statut?: boolean,
  ) {
    this.profil = new Profil();
  }
}
