import {Profil} from "./profil.model";
import {User} from "./user.model";
import {Groupe} from "./groupe.model";

export class Utilisateur {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public fonction?: string,
    public telephone?: string,
    public email?: string,
    public lieuNaissance?: string,
    public dateNaissance?: string,
    public twitter?: string,
    public facebook?: string,
    public linkedIn?: string,
    public photo?: any,
    public photoContentType?: string,
    public specialite?: string,
    public matricule?: string,
    public statut?: boolean,
    public profilId?: number,
    public groupes?: Groupe[],
    public profil?: Profil,
    public userDTO?: User,
  ) {
    this.profil = new Profil();
    this.userDTO = new User();
    this.groupes = [];
  }
}

