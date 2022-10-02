export class Domaine {
  constructor(
    public id?: number,
    public libelle?: string,
    public description?: string,
    public superDomaine?: Domaine,
    public domaineId?: number,
  ) {
  }
}
