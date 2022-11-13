import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {NotificationService} from "../../../common/services/notification.service";
import {Utilisateur} from "../../../models/utilisateur.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

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
    private activateModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    // this.getOneUser();
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


  onCloseModal() {
    this.activateModal.close();
  }
}
