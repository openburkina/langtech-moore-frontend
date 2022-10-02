import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {NotificationService} from "../../../common/services/notification.service";
import {Utilisateur} from "../../../models/utilisateur.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  user: Utilisateur;

  constructor(
    private userService: UserService,
    private notification: NotificationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.user = new Utilisateur();
    this.user.id = Number(this.activeRoute.snapshot.params.userId);
    this.getOneUser();
  }

  getOneUser() {
    const result = this.userService.getOneUser(this.user.id).subscribe(
      response => {
        console.log(response.body);
        if (response.body === null) {
          this.notification.open('warning', `Aucune information trouvé pour cet utilisateur !`);
        } else {
          this.user = response.body;
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

  goBack() {
    this._location.back();
  }

  onEnableOrDisableUser() {
    this.user.statut = !this.user.statut;
    const result = this.userService.enableOrDisableUser(this.user).subscribe(
      response => {
        if (response.body === null) {
          const message = `Une erreur est survenue lors de ${ this.user.statut ? 'l\'activation ' : 'la desactivation'} de l'utilisateur.`;
          this.notification.open('danger', message);
        } else if (response.body.code !== '0') {
          this.notification.open('danger', response.body.msg);
        } else {
          this.notification.open('success', response.body.msg);
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de ${ this.user.statut ? 'l\'activation ' : 'la desactivation'} de l'utilisateur.`;
        this.notification.open('danger', message);
      }
    );
  }

  onDeleteUser() {
    const result = this.userService.deleteUser(this.user.id).subscribe(
      response => {
        if (response.body === null) {
          this.notification.open('danger', `Une erreur est survenue lors de la suppression du compte de l'utilisateur.`);
        } else if (response.body.code !== '0') {
          this.notification.open('danger', response.body.msg);
        } else {
          this.notification.open('success', response.body.msg);
          this.goBack();
        }
        result.unsubscribe();
      },
    error => {
      result.unsubscribe();
      const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la suppression du compte de l'utilisateur.`;
      this.notification.open('danger', message);
    }
    );
  }

  onUpdateUser() {
    // routerLink="/pages/users/create-update-user/null"
    this.router.navigate([`/pages/users/create-update-user/${this.user.id}`]);
  }

  resetPassword() {
    const result = this.userService.requestPasswordReset(this.user.email).subscribe(
      () => {
        result.unsubscribe();
        const message = `Le mot de passe a été réinitialisé avec succès !`;
        this.notification.open('success', message);
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survnue lors de la réinitialisation du mot de passe !`;
        this.notification.open('danger', message);
      }
    );
  }
}
