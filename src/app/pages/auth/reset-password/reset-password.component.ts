import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {UserService} from "../../users/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {NotificationService} from "../../../common/services/notification.service";
import {LoginVM} from "../../../models/LoginVM";
import {KeyAndPasswod} from "../../../models/key-and-passwod.model";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  keyAndPasswod: KeyAndPasswod;

  formResetPwd = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private _location: Location,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.keyAndPasswod = new KeyAndPasswod();
    this.keyAndPasswod.key = this.route.snapshot.params.key;
  }

  onFinishResetPwd() {
    const password = this.formResetPwd.get('password').value;
    const confirmPassword = this.formResetPwd.get('confirmPassword').value;

    if (password !== confirmPassword) {
      this.notification.open('warning', `La confirmation du mot de passe est incorrecte.`);
    } else {
      this.keyAndPasswod.newPassword = password;
      const result = this.userService.finishPasswordReset(this.keyAndPasswod).subscribe(
        () => {
          result.unsubscribe();
          this.notification.open('success', `Félicitations! Votre mot de passe a été changé avec succès !`);
          this.onLogin();
        },
        error => {
          result.unsubscribe();
          const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors du changement du mot de passe !`;
          this.notification.open('danger', message);
        }
      );
    }
  }


  /**
   * Login After password change
   */
  onLogin() {
    this.router.navigate(['sign-in'], { relativeTo: this.route.parent });
  }
}
