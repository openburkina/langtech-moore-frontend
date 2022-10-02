import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../common/services/notification.service";
import {DomaineService} from "../domaine.service";
import {Domaine} from "../../../models/domaine.model";

@Component({
  selector: 'app-create-update-domaine',
  templateUrl: './create-update-domaine.component.html',
  styleUrls: ['./create-update-domaine.component.scss']
})
export class CreateUpdateDomaineComponent implements OnInit {
  formDomaine = this.fb.group({
    superDomaine: [],
    domaineId: [],
    typeDomaine: [null, Validators.required],
    libelle: [null, Validators.required],
    description: [null, Validators.required]
  });
  domaine: Domaine = {};
  listeDomaines: Domaine[] = [];

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private domaineService: DomaineService,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.getDomaines();
    this.createForm();
  }

  fermer() {
    this.activeModal.close(false);
  }

  getDomaines(): void{
    this.domaineService.getDomaines().subscribe(data=>{
      if(data.body){
        this.listeDomaines = data.body.filter(item=>item.id != this.domaine.id);
      }
    })
  }

  getDomaineInfos(): void {
    this.domaine.libelle = this.formDomaine.get('libelle').value;
    this.domaine.description = this.formDomaine.get('description').value;
    if(this.formDomaine.get('domaineId').value){
      this.domaine.superDomaine = this.listeDomaines.find(item=>item.id == this.formDomaine.get('domaineId').value);
    }
    console.log(this.formDomaine.getRawValue());
    if (this.domaine.id) {
      this.updateDomaine();
    } else {
      this.saveDomaine();
    }
  }

  createForm() {
    if (this.domaine !== null) {
      this.formDomaine.patchValue({
        libelle: this.domaine.libelle,
        description: this.domaine.description,
        superDomaine: this.domaine.superDomaine,
        domaineId: this.domaine.superDomaine? this.domaine.superDomaine.id : null,
        typeDomaine: this.domaine.superDomaine ? 2 : 1
      });
    } else {
      this.domaine = new Domaine();
    }
  }

  saveDomaine() {
    // On reset le champs parent quand il bascule sous-categorie et categorie
    if(this.formDomaine.get('typeDomaine').value == 1){
      this.domaine.superDomaine = null;
    }
    const result = this.domaineService.createDomaine(this.domaine).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de l'enregistrement de la domaine !`);
        } else {
          this.activeModal.close(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de l'enregistrement du domaine !`;
        this.notification.open('danger', message);
      }
    );
  }

  updateDomaine() {
    const result = this.domaineService.updateDomaine(this.domaine).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de la modification du domaine !`);
        } else {
          this.activeModal.close(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la modification du domaine !`;
        this.notification.open('danger', message);
      }
    );
  }

  setValidator(): void {
    if(this.formDomaine.get('typeDomaine').value == 2){
      this.formDomaine.controls['domaineId'].setValidators([Validators.required]);
    }else{
      this.formDomaine.controls['domaineId'].setValidators([]);
    }
  }
}
