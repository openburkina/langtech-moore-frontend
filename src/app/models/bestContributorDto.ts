import {Utilisateur} from "./utilisateur.model";

export class BestContributorDto {
  constructor(
    public utilisateurs?: Utilisateur[],
    public pointFidelite?: number,

  ) {
  }
}
