import {Utilisateur} from "./utilisateur.model";
import {SourceDonnee} from "./sourceDonnee.model";
import {Langue} from "./langue.model";

export class Traduction {
  constructor(
    public id?: number,
    public libelle?: string,
    public contenuTexte?: string,
    public contenuAudio?: any,
    public contenuAudioContentType?: string,
    public type?: string,
    public note?: number,
    public etat?: string,
    public motif?: string,
    public mois?: string,
    public utilisateur?: Utilisateur,
    public sourceDonnee?: SourceDonnee,
    public langue?: Langue,
  ) {
    this.utilisateur = new Utilisateur();
    this.sourceDonnee = new SourceDonnee();
    this.langue = new Langue();
  }
}


