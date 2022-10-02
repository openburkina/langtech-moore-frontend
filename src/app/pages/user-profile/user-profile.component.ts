import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NotificationService} from "../../common/services/notification.service";
import {UserService} from "../users/user.service";
import {PasswordChange} from "../../models/passwordChange.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  formPassword = this.fb.group({
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

  password: PasswordChange;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.password = new PasswordChange();
  }

  getPasswords() {
    const newPassword = this.formPassword.get('newPassword').value;
    const confirmPassword = this.formPassword.get('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      this.notification.open('warning',`La confirmation du mot de passe est incorrecte.`);
    } else {
      this.password.currentPassword = this.formPassword.get('currentPassword').value;
      this.password.newPassword = newPassword;
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
  }
}
