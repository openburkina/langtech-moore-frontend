import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {GroupeService} from "../groupe.service";
import {Groupe} from "../../../models/groupe.model";
import {FormBuilder, Validators} from "@angular/forms";
import {NotificationService} from "../../../common/services/notification.service";

@Component({
  selector: 'app-create-update-groupe',
  templateUrl: './create-update-groupe.component.html',
  styleUrls: ['./create-update-groupe.component.scss']
})
export class CreateUpdateGroupeComponent implements OnInit {
  @Input() groupe: Groupe;
  formGroupe = this.fb.group({
    libelle: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(
    private activeModal: NgbActiveModal,
    private groupeService: GroupeService,
    private fb: FormBuilder,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    if (this.groupe !== null) {
      this.formGroupe.patchValue({
        libelle: this.groupe.libelle,
        description: this.groupe.description,
      });
    } else {
      this.groupe = new Groupe();
    }
  }

  onDismiss(b: boolean) {
    this.activeModal.close(b);
  }

  getGroupeInfos() {
    this.groupe.libelle = this.formGroupe.get('libelle').value;
    this.groupe.description = this.formGroupe.get('description').value;
    if (this.groupe.id) {
      this.updateGroupe();
    } else {
      this.saveGroupe();
    }
  }

  saveGroupe() {
    const result = this.groupeService.createGroupe(this.groupe).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de l'enregistrement du groupe !`);
        } else {
          this.notification.open('success', `Le groupe #${this.groupe.libelle} a été ajouté avec succès !`);
          this.onDismiss(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de l'enregistrement du groupe !`;
        this.notification.open('danger', message);
      }
    );
  }

  updateGroupe() {
    const result = this.groupeService.updateGroupe(this.groupe).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de la modification du groupe !`);
        } else {
          this.notification.open('success', `Le groupe #${this.groupe.libelle} a été modifié avec succès !`);
          this.onDismiss(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue de la modification du groupe !`;
        this.notification.open('danger', message);
      }
    );
  }
}
