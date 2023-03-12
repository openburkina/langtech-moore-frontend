import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {ProfilService} from "../../profils/profil.service";
import {Profil} from "../../../models/profil.model";
import {NotificationService} from "../../../common/services/notification.service";
import {Utilisateur} from "../../../models/utilisateur.model";
import {Observable} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent implements OnInit {
  @Input()
  utilisateur: Utilisateur;
  profils$: Observable<Profil[]>;

  formUser!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userSerice: UserService,
    private profilService: ProfilService,
    private notification: NotificationService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.profils$ = this.profilService.profils$;
    this.createUserForm();
  }


  createUserForm() {
    this.formUser =  this.fb.group({
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      telephone: [null],
      profilId: [null, Validators.required],
    });

    if (this.utilisateur !== null) {
      this.formUser.patchValue({
        nom: this.utilisateur.nom,
        prenom: this.utilisateur.prenom,
        email: this.utilisateur.email,
        telephone: this.utilisateur.telephone,
        profilId: this.utilisateur?.profil?.id,
      });
      this.formUser.get('password').clearValidators();
      console.log(this.formUser);
    } else {
      this.utilisateur = new Utilisateur();
    }

  }

  getUserInfos() {
    this.utilisateur.nom = this.formUser.get('nom').value;
    this.utilisateur.prenom = this.formUser.get('prenom').value;
    this.utilisateur.telephone = this.formUser.get('telephone').value;
    this.utilisateur.email = this.formUser.get('email').value;
    this.utilisateur.email = this.utilisateur.email.toLowerCase();
    this.utilisateur.login = this.utilisateur.email.toLowerCase();
    this.utilisateur.profil.id = this.formUser.value.profilId;
    this.utilisateur.typeUtilisateur = 'UTILISATEUR';
    console.log(this.utilisateur);
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
    this.utilisateur.password = this.formUser.value.password;
    const result = this.userSerice.createUser(this.utilisateur).subscribe(
      response => {
        if (response.body === null || !response.body.id) {
          this.notification.open('warning', `Une erreur est survenue lors de la création de l'utilisateur !`);
        } else {
          this.notification.open('success', `L'utilisateur #${this.utilisateur.email} a été créé avec succès !`);
          this.formUser.reset();
          this.utilisateur = new Utilisateur();
          this.onCloseModal(true);
        }
        result.unsubscribe();
      },
      error => {
        console.log(error);
        result.unsubscribe();
        const message = error.error.title ? error.error.title : `Une erreur est survenue lors de la création de l'utilisateur !`;
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
          this.onCloseModal(true);
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

  onCloseModal(param: boolean) {
    this.activeModal.close(param);
  }
}
