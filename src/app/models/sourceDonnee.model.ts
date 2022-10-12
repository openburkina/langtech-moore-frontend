export class Categorie {
  constructor(
    public id?: number,
    public libelle?: string,
    public description?: string,
    public superCategorie?: Categorie,
    public categId?: number,
  ) {
  }
}
