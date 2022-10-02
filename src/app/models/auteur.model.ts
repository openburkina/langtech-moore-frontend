import {Utilisateur} from "./utilisateur.model";

export class Auteur {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public contact?: string,
    public dateNaissance?: string,
    public lieuNaissance?: string,
    public nationalite?: string,
    public utilisateur?: Utilisateur,
  ) {
    this.utilisateur = new Utilisateur();
  }
}
