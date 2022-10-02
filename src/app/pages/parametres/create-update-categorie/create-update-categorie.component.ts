import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Categorie} from "../../../models/categorie.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../common/services/notification.service";
import {CategorieService} from "../categorie.service";

@Component({
  selector: 'app-create-update-categorie',
  templateUrl: './create-update-categorie.component.html',
  styleUrls: ['./create-update-categorie.component.scss']
})
export class CreateUpdateCategorieComponent implements OnInit {
  formCategorie = this.fb.group({
    superCategorie: [],
    categId: [],
    libelle: [null, Validators.required],
    description: [null, Validators.required],
    typeCategorie: [null, Validators.required]
  });
  categorie: Categorie = {};
  listeCategories: Categorie[] = [];

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private categorieService: CategorieService,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.getCategorie();
    this.createForm();
  }

  fermer(): void {
    this.activeModal.close(false);
  }

  getCategorieInfos(): void {
    this.categorie.libelle = this.formCategorie.get('libelle').value;
    this.categorie.description = this.formCategorie.get('description').value;
    if(this.formCategorie.get('categId').value){
      this.categorie.superCategorie = this.listeCategories.find(item=>item.id == this.formCategorie.get('categId').value);
    }
    console.log(this.formCategorie.getRawValue());
    if (this.categorie.id) {
      this.updateCategorie();
    } else {
      this.saveCategorie();
    }
  }

  createForm() {
    if (this.categorie !== null) {
      this.formCategorie.patchValue({
        libelle: this.categorie.libelle,
        description: this.categorie.description,
        superCategorie: this.categorie.superCategorie,
        categId: this.categorie.superCategorie? this.categorie.superCategorie.id : null,
        typeCategorie: this.categorie.superCategorie? 2 : 1
      });
    } else {
      this.categorie = new Categorie();
    }
  }

  saveCategorie() {
    // On reset le champs parent quand il bascule sous-domaine et domaine
    if(this.formCategorie.get('typaCategorie').value == 1){
      this.categorie.superCategorie = null;
    }
    const result = this.categorieService.createCategorie(this.categorie).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de l'enregistrement de la catégorie !`);
        } else {
          this.activeModal.close(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de l'enregistrement de la catégorie !`;
        this.notification.open('danger', message);
      }
    );
  }

  updateCategorie() {
    const result = this.categorieService.updateCategorie(this.categorie).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de la modification de la catégorie !`);
        } else {
          this.activeModal.close(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la modification de la catégorie !`;
        this.notification.open('danger', message);
      }
    );
  }

  getCategorie(): void{
    this.categorieService.getCategories().subscribe(data=>{
      if(data.body){
        this.listeCategories = data.body.filter(item => item.id != this.categorie.id);
      }
    })
  }

  setValidator(): void {
    if(this.formCategorie.get('typeCategorie').value == 2){
      this.formCategorie.controls['categId'].setValidators([Validators.required]);
    }else{
      this.formCategorie.controls['categId'].setValidators([]);
    }
  }
}
