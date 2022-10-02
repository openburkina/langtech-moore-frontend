import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../user.service";
import {ProfilService} from "../../profils/profil.service";
import {GroupeService} from "../../groupes/groupe.service";
import {NotificationService} from "../../../common/services/notification.service";
import {Groupe} from "../../../models/groupe.model";
import {Profil} from "../../../models/profil.model";
import {Utilisateur} from "../../../models/utilisateur.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  groupes: Groupe[] = [];
  profils: Profil[] = [];
  users: Utilisateur[] = [];
  enableShowFilter: boolean;

  formSize = this.fb.group({
    size: [null],
  });

  totalItems = 0;
  itemsPerPage = 12;
  maxSize = 12;
  page = 0;

  formSearch = this.fb.group({
    nom: null,
    prenom: null,
    email: null,
    fonction: null,
    specialite: null,
    profilId: null,
    groupeId: null,
    statut: null,
  });

  constructor(
    private fb: FormBuilder,
    private userSerice: UserService,
    private profilService: ProfilService,
    private groupeService: GroupeService,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.enableShowFilter = false;
    this.getUsers();
  }

  getUsers() {
    const request = {
      page: this.page,
      size: this.itemsPerPage,
    };
    const result = this.userSerice.getUsers(request).subscribe(
      response => {
        console.log(response.body);
        if (response.body === null || response.body.length === 0) {
          this.notification.open('warning', `Aucun utilisateur trouvé !`);
        } else {
          this.users = response.body;
          this.totalItems = Number(response.headers.get('X-Total-Count'));
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la recupération des utilisateurs !`;
        this.notification.open('danger', message);
      }
    );
  }

  onSearchUser() {

  }

  onChangeFilterStatus() {
    if (this.users.length > 0) {
      this.enableShowFilter = !this.enableShowFilter;
    }
  }
}
