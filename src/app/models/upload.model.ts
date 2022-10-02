import {Auteur} from "./auteur.model";
import {Utilisateur} from "./utilisateur.model";
import {Document} from "./document.model";

export class Upload {
  constructor(
    public id?: number,
    public dateUpload?: string,
    public description?: string,
    public statut?: string,
    public auteur?: Auteur,
    public utilisateur?: Utilisateur,
    public documents?: Document[],
  ) {
    this.auteur = new Auteur();
    this.utilisateur = new Utilisateur();
    this.documents = [];
  }
}
