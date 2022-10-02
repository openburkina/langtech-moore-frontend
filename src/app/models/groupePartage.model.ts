import {Partage} from "./partage.model";
import {Groupe} from "./groupe.model";

export class GroupePartage {
  constructor(
    public id?: number,
    public datePartage?: string,
    public groupe?: Groupe,
    public partage?: Partage,
  ) {
    this.groupe = new Groupe();
    this.partage = new Partage();
  }
}
