import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../common/services/notification.service";
import {UserService} from "../users/user.service";
import {PasswordChange} from "../../models/passwordChange.model";
import {AccountService} from "../auth/services/account.service";
import {Utilisateur} from "../../models/utilisateur.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: Utilisateur;
  formUser!: FormGroup;
  formPassword!: FormGroup;
  password: PasswordChange;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private userService: UserService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.password = new PasswordChange();
    this.user = this.accountService.getCurrentUserInfos();
    this.initFormGroup();
  }

  initFormGroup() {
    this.formPassword =  this.fb.group({
      currentPassword: [null, [
        Validators.required, Validators.minLength(4), Validators.maxLength(30)
      ]],
      newPassword: [null, [
        Validators.required, Validators.minLength(4), Validators.maxLength(30)
      ]],
      confirmPassword: [null, [
        Validators.required, Validators.minLength(4), Validators.maxLength(30)
      ]],
    });

    this.formUser = this.fb.group({
      nom: [this.user?.nom, Validators.required],
      prenom: [this.user?.prenom, Validators.required],
      email: [this.user?.email, Validators.required],
      telephone: [this.user?.telephone, Validators.required],
    });
  }

  onGetPassword() {
    const newPassword = this.formPassword.get('newPassword').value;
    const confirmPassword = this.formPassword.get('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      this.notification.open('warning',`La confirmation du mot de passe est incorrecte.`);
    } else {
      this.password.currentPassword = this.formPassword.get('currentPassword').value;
      this.password.newPassword = newPassword;
      this.onSavePassword();
    }
  }

  onSavePassword() {
    const result = this.userService.changePassword(this.password).subscribe(
      () => {
        result.unsubscribe();
        this.notification.open('success', `Félicitations! Votre mot de passe a été modifié avec succès.`);
        this.formPassword.reset();
        this.password = new PasswordChange();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la modification du mot de passe !`;
        this.notification.open('danger', message);
      }
    );
  }

  onGetUserInfos() {
    this.user.nom = this.formUser.value.nom;
    this.user.prenom = this.formUser.value.prenom;
    this.user.email = this.formUser.value.email;
    this.user.telephone = this.formUser.value.telephone;
    this.onUpdateProfil();
  }

  onUpdateProfil() {
    this.userService.onUpdateProfil(this.user).subscribe({
      next: response => {
        console.log(response.body);
        if (response.body && response.body.id) {
          this.notification.open('success', `Votre profil a été modifié avec succès !`);
          this.accountService.saveCurrentUserInfos(this.user);
        } else {
          this.notification.open('danger', `Une erreur est survenue lors de la modification du mot de passe !`);
        }
      },
      error: error => {
      const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la modification du mot de passe !`;
      this.notification.open('danger', message);
    }
    });
  }
}
