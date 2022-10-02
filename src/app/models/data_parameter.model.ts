import {User} from './user.model';
import {Utilisateur} from "./utilisateur.model";
import {DemandeAutorisation} from "./demandeAutorisation.model";

export class DataParameter {
  constructor(
    public userDTO?: User,
    public utilisateur?: Utilisateur,
    public demandeAutorisations?: DemandeAutorisation[],
    public demandeAcceptes?: DemandeAutorisation[],
  ) {
    this.demandeAutorisations = [];
    this.demandeAcceptes = [];
  }
}
