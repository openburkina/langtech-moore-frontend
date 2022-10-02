import {Utilisateur} from "./utilisateur.model";
import {Groupe} from "./groupe.model";

export class GroupeUser {
  constructor(
    public id?: number,
    public dateAffection?: string,
    public statut?: string,
    public groupe?: Groupe,
    public utilisateur?: Utilisateur,
  ) {
    this.groupe = new Groupe();
    this.utilisateur = new Utilisateur();
  }
}

