import {Utilisateur} from "./utilisateur.model";
import {Document} from "./document.model";

export class DemandeAutorisation {
  constructor(
    public id?: number,
    public etat?: string,
    public dateDemande?: string,
    public description?: string,
    public document?: Document,
    public utilisateur?: Utilisateur,
  ) {
    this.document = new Document();
    this.utilisateur = new Utilisateur();
  }
}

