import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {UserService} from "../../users/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {NotificationService} from "../../../common/services/notification.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formForgotPwd = this.fb.group({
    email: [null, [Validators.required]]
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private _location: Location,
    private notification: NotificationService,
  ) { }


  ngOnInit(): void {
  }

  onGoBack() {
    this._location.back();
  }

  onResetPwd() {
    const email = this.formForgotPwd.get('email').value;
    const result = this.userService.requestPasswordReset(email).subscribe(
      () => {
        result.unsubscribe();
        const message = `Un nouveau mot de passe a été envoyé a votre numéro de téléphone << ${email} >>. Veuillez consulter votre téléphone !`;
        this.notification.open('success', message);
        this.onGoBack();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survnue lors de la réinitialisation du mot de passe !`;
        this.notification.open('danger', message);
      }
    );
  }
}
