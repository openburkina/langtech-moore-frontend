import {Document} from "./document.model";
import {Utilisateur} from "./utilisateur.model";

export class Partage {
  constructor(
    public id?: number,
    public datePartage?: string,
    public document?: Document,
    public utilisateur?: Utilisateur,
  ) {
    this.document = new Document();
    this.utilisateur = new Utilisateur();
  }
}
