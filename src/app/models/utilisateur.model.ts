import {Profil} from "./profil.model";
import {User} from "./user.model";

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
    public user?: User,
  ) {
    this.profil = new Profil();
    this.user = new User();
  }
}
