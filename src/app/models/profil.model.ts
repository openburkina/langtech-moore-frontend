export class Profil {
  constructor(
    public id?: number,
    public libelle?: string,
    public description?: string,
    public profilsChange?: boolean,
    public authorities?: string[],
  ) {
    this.authorities = [];
    this.profilsChange = false;
  }
}
