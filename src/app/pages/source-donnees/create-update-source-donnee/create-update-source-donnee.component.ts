import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";
import {SourceDonnee} from "../../../models/sourceDonnee.model";
import {SourceService} from "../source.service";
import {Notification} from "rxjs";
import {NotificationService} from "../../../common/services/notification.service";

@Component({
  selector: 'app-create-update-source-donnee',
  templateUrl: './create-update-source-donnee.component.html',
  styleUrls: ['./create-update-source-donnee.component.scss']
})
export class CreateUpdateSourceDonneeComponent implements OnInit {
  formSourceDonnee = this.fb.group({
    source: [],
    categId: [],
  });
  sourceDonnee: SourceDonnee = new SourceDonnee();

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private sourceService: SourceService,
    private notification: NotificationService,
  ) {
  }

  ngOnInit(): void {
  }

  getSourceInfo() {
    this.sourceService.createSourceDonnee(this.sourceDonnee).subscribe({
      next: response => {
        if (response.body !== null && response.body.code === '0') {
          this.notification.open('success', `Votre source de données a été uploadée avec succès !`);
          this.onCloseModal();
        } else {
          this.notification.open('danger', `Une erreur est survenue lors de l'upload des sources de données !`);
        }
      },
      error: error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de l'upload des sources de données !`;
        this.notification.open('danger', message);
      }
    });

  }


  onFileChange(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      const file: any = reader.result;
      const fileBase64: string[] = file.split('base64,');
      this.sourceDonnee.file = fileBase64[1];
      this.formSourceDonnee.patchValue({
        source: this.sourceDonnee.file,
      });
    };
  }

  onCloseModal() {
    this.activeModal.close();
  }
}
