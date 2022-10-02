import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";
import {TypePiece} from "../../../models/typePiece.model";
import {Profil} from "../../../models/profil.model";
import {TypePieceService} from "../typePiece.service";
import {NotificationService} from "../../../common/services/notification.service";

@Component({
  selector: 'app-create-update-type-piece',
  templateUrl: './create-update-type-piece.component.html',
  styleUrls: ['./create-update-type-piece.component.scss']
})
export class CreateUpdateTypePieceComponent implements OnInit {
  formTypePiece = this.fb.group({
    libelle: [null, Validators.required],
    description: [null, Validators.required]
  });
  typePiece: TypePiece = {};

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private typePieceService: TypePieceService,
              private notification: NotificationService,) { }

  ngOnInit(): void {
    this.createForm();
  }

  fermer(): void {
    this.activeModal.close(false);
  }

  getTypePieceInfos(): void {
    this.typePiece.libelle = this.formTypePiece.get('libelle').value;
    this.typePiece.description = this.formTypePiece.get('description').value;
    console.log(this.formTypePiece.getRawValue());
    if (this.typePiece.id) {
     this.updateTypePiece();
    } else {
      this.saveTypePiece();
    }
  }

  createForm() {
    if (this.typePiece !== null) {
      this.formTypePiece.patchValue({
        libelle: this.typePiece.libelle,
        description: this.typePiece.description,
      });
    } else {
      this.typePiece = new TypePiece();
    }
  }

  saveTypePiece() {
    const result = this.typePieceService.createTypePiece(this.typePiece).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de l'enregistrement du type pièce !`);
        } else {
          this.activeModal.close(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de l'enregistrement du type pièce !`;
        this.notification.open('danger', message);
      }
    );
  }

  updateTypePiece() {
    const result = this.typePieceService.updateTypePiece(this.typePiece).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de la modification du type pièce !`);
        } else {
          this.activeModal.close(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la modification du type pièce !`;
        this.notification.open('danger', message);
      }
    );
  }
}
