import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../common/services/notification.service";
import {Profil} from "../../../models/profil.model";
import {ProfilService} from "../profil.service";
import {IDropdownSettings} from "ng-multiselect-dropdown/multiselect.model";

@Component({
  selector: 'app-create-update-profil',
  templateUrl: './create-update-profil.component.html',
  styleUrls: ['./create-update-profil.component.scss']
})
export class CreateUpdateProfilComponent implements OnInit {
  @Input() profil: Profil;
  formProfil = this.fb.group({
    libelle: [null, Validators.required],
    description: [null, Validators.required],
    authorities: [null, Validators.required],
  });

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'authorities',
    textField: 'authorities',
    selectAllText: 'Tout Sélectionner',
    unSelectAllText: 'Desélectionner',
    itemsShowLimit: 100,
    allowSearchFilter: true,
    searchPlaceholderText: 'Rechercher...',
    maxHeight: 1000,
    noDataAvailablePlaceholderText: 'Aucun rôle trouvé...',
  };

  authorities: string[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private profilService: ProfilService,
    private fb: FormBuilder,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getAuthorities();
  }

  getAuthorities() {
    const result = this.profilService.getAuthorities().subscribe(
      response => {
        if (response.body === null || response.body.length === 0) {
          this.notification.open('warning', 'Aucun rôle trouvé !');
        } else {
          this.authorities = response.body;
          this.createForm();
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la recupération des rôles !`;
        this.notification.open('danger', message);
      }
    );
  }

  createForm() {
    if (this.profil !== null) {
      this.formProfil.patchValue({
        libelle: this.profil.libelle,
        description: this.profil.description,
        authorities: this.profil.authorities,
      });
    } else {
      this.profil = new Profil();
    }
  }

  onDismiss(b: boolean) {
    this.activeModal.close(b);
  }

  getProfilInfos() {
    this.profil.libelle = this.formProfil.get('libelle').value;
    this.profil.description = this.formProfil.get('description').value;
    this.profil.authorities = this.formProfil.get('authorities').value;
    console.log(this.profil);
    if (this.profil.id) {
      this.updateProfil();
    } else {
      this.saveProfil();
    }
  }

  saveProfil() {
    const result = this.profilService.createProfil(this.profil).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de l'enregistrement du profil !`);
        } else {
          this.notification.open('success', `Le profil #${this.profil.libelle} a été créé avec succès !`);
          this.onDismiss(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de l'enregistrement du profil !`;
        this.notification.open('danger', message);
      }
    );
  }

  updateProfil() {
    this.profil.profilsChange = true;
    const result = this.profilService.updateProfil(this.profil).subscribe(
      response => {
        result.unsubscribe();
        if (response.body === null || !response.body.id) {
          this.notification.open('danger', `Une erreur est survenue lors de la modification du profil !`);
        } else {
          this.notification.open('success', `Le profil #${this.profil.libelle} a été modifié avec succès !`);
          this.onDismiss(true);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue de la modification du profil !`;
        this.notification.open('danger', message);
      }
    );
  }
}
