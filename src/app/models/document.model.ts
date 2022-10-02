import {Upload} from "./upload.model";
import {Categorie} from "./categorie.model";
import {Domaine} from "./domaine.model";

export class Document {
  constructor(
    public id?: number,
    public format?: string,
    public contenu?: any,
    public contenuContentType?: string,
    public nom?: string,
    public portee?: string,
    public estDejaPublier?: boolean,
    public resume?: string,
    public auteur?: string,
    public jury?: string,
    public datePublication?: string,
    public lienPublication?: string,
    public upload?: Upload,
    public categorie?: Categorie,
    public domaine?: Domaine,
  ) {
    this.upload = new Upload();
    this.categorie = new Categorie();
    this.domaine = new Domaine();
  }
}
