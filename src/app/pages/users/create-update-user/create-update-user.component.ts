import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {ProfilService} from "../../profils/profil.service";
import {Groupe} from "../../../models/groupe.model";
import {Profil} from "../../../models/profil.model";
import {NotificationService} from "../../../common/services/notification.service";
import {IDropdownSettings} from "ng-multiselect-dropdown/multiselect.model";
import {Utilisateur} from "../../../models/utilisateur.model";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent implements OnInit {
  utilisateur: Utilisateur;
  groupes: Groupe[] = [];
  profils: Profil[] = [];
  formUser = this.fb.group({
    nom: [null, Validators.required],
    prenom: [null, Validators.required],
    fonction: [null],
    email: [null, [Validators.required, Validators.email]],
    specialite: [null],
    matricule: [null],
    telephone: [null],
    profilId: [null, Validators.required],
    groupes: [null, Validators.required],
  });

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'libelle',
    selectAllText: 'Tout Sélectionner',
    unSelectAllText: 'Desélectionner',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    searchPlaceholderText: 'Rechercher...',
    maxHeight: 1000,
    noDataAvailablePlaceholderText: 'Aucun groupe trouvé...',
  };

  constructor(
    private fb: FormBuilder,
    private userSerice: UserService,
    private profilService: ProfilService,
    private notification: NotificationService,
    private activeRoute: ActivatedRoute,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.utilisateur = new Utilisateur();
    this.utilisateur.id = Number(this.activeRoute.snapshot.params.userId);
  }



  getProfils() {
    const result = this.profilService.getProfils().subscribe(
      response => {
        if (response.body === null || response.body.length === 0) {
          this.notification.open('warning', 'Aucun profil trouvé !');
        } else {
          this.profils = response.body;

          // Get infos to update user
          if (this.utilisateur.id) {
            this.getOneUser();
          }
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des profils !`;
        this.notification.open('danger', message);
      }
    );
  }

  getOneUser() {
    const result = this.userSerice.getOneUser(this.utilisateur.id).subscribe(
      response => {
        console.log(response.body);
        if (response.body === null) {
          this.notification.open('warning', `Aucune information trouvé pour cet utilisateur !`);
        } else {
          this.utilisateur = response.body;
          this.createUserForm();
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la recupération des informations de l'utilisateur !`;
        this.notification.open('danger', message);
      }
    );
  }

  createUserForm() {
    this.formUser.patchValue({
      nom: this.utilisateur.nom,
      prenom: this.utilisateur.prenom,
      email: this.utilisateur.email,
      telephone: this.utilisateur.telephone,
      profilId: this.utilisateur.profil.id,
    });
  }

  getUserInfos() {
    this.utilisateur.nom = this.formUser.get('nom').value;
    this.utilisateur.prenom = this.formUser.get('prenom').value;
    this.utilisateur.telephone = this.formUser.get('telephone').value;
    this.utilisateur.email = this.formUser.get('email').value;
    this.utilisateur.email = this.utilisateur.email.toLowerCase();
    this.saveUser();
  }

  saveUser() {
    if (this.utilisateur.id) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    const result = this.userSerice.createUser(this.utilisateur).subscribe(
      response => {
        if (response.body === null || !response.body.id) {
          this.notification.open('warning', `Une erreur est survenue lors de la création de l'utilisateur !`);
        } else {
          this.notification.open('success', `L'utilisateur #${this.utilisateur.email} a été créé avec succès !`);
          this.formUser.reset();
          this.utilisateur = new Utilisateur();
          this.goBack();
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la création de l'utilisateur !`;
        this.notification.open('danger', message);
      }
    );
  }

  updateUser() {
    const result = this.userSerice.updateUser(this.utilisateur).subscribe(
      response => {
        if (response.body === null || !response.body.id) {
          this.notification.open('warning', `Une erreur est survenue lors de la mise à jour de l'utilisateur !`);
        } else {
          this.notification.open('success', `L'utilisateur #${this.utilisateur.email} a été mis à jour avec succès !`);
          this.formUser.reset();
          this.utilisateur = new Utilisateur();
          this.goBack();
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la mise à jour de l'utilisateur !`;
        this.notification.open('danger', message);
      }
    );
  }

  goBack() {
    this._location.back();
  }

  onPhotoChange(event: any) {
  }
}
