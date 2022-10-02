import {Categorie} from "./categorie.model";

export class CategorieTreeView {
  constructor(
    public id?: number,
    public libelle?: string,
    public description?: string,
    public categorie?: Categorie[],
    public authorities?: string[]
  ) {
  }
}
