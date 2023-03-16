import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../user.service";
import {ProfilService} from "../../profils/profil.service";
import {NotificationService} from "../../../common/services/notification.service";
import {Profil} from "../../../models/profil.model";
import {Utilisateur} from "../../../models/utilisateur.model";
import {Observable} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateUpdateUserComponent} from "../create-update-user/create-update-user.component";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {DetailUserComponent} from "../detail-user/detail-user.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Utilisateur[] = [];
  user: Utilisateur;
  enableShowFilter: boolean;
  profils$: Observable<Profil[]>;
  searchUser: Utilisateur;

  totalItems = 0;
  itemsPerPage = 10;
  maxSize = 10;
  page = 0;
  ngbPaginationPage = 1;

  formSearch = this.fb.group({
    nom: null,
    prenom: null,
    email: null,
    profilId: null,
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profilService: ProfilService,
    private notification: NotificationService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.enableShowFilter = false;
    this.profils$ = this.profilService.profils$;
    this.searchUser = new Utilisateur();
    this.user = new Utilisateur();
    this.getUsers();
  }

  getUsers() {
    const request = {
      page: this.page,
      size: this.itemsPerPage,
    };
    this.users = [];
    this.searchUser.typeUtilisateur = 'UTILISATEUR';
    const result = this.userService.getUsersByCriteria(this.searchUser, request).subscribe(
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
    this.searchUser.nom = this.formSearch.value.nom;
    this.searchUser.prenom = this.formSearch.value.prenom;
    this.searchUser.email = this.formSearch.value.email;
    this.searchUser.profil.id = this.formSearch.value.profilId;
    this.getUsers();
  }

  onChangeFilterStatus() {
    if (this.users.length > 0) {
      this.enableShowFilter = !this.enableShowFilter;
    }
  }

  async onShowUserDetail(u: Utilisateur) {
    const currentModal = await this.modal.open(DetailUserComponent, { size: "lg", backdrop: "static", centered: true});
    currentModal.componentInstance.user = u;
  }

  async openCreateUpdateModal(u: Utilisateur) {
    const currentModal = await this.modal.open(CreateUpdateUserComponent, { size: "lg", backdrop: "static", centered: true, });
    currentModal.componentInstance.utilisateur = u;
    currentModal.result.then(
      response => {
        if (response) {
          this.onSearchUser();
        }
      }
    );

  }

  async openConfirmModal(u: Utilisateur) {
    this.user = u;
    const currentModal = this.modal.open(ConfirmComponent, { size: 'lg', backdrop: 'static', centered: true });
    currentModal.componentInstance.message = `Voulez-vous supprimer l'utilisateur #${u.email} - ${u.nom + ' ' + u.prenom}  ?`;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.deleteUser(u);
        }
      }
    );
  }

  loadPage(pageNumber: number) {
    this.page = pageNumber - 1;
    this.getUsers();
  }


  onResetForm() {
    this.formSearch.reset();
    this.onSearchUser();
  }

  private deleteUser(u: Utilisateur) {
    this.userService.deleteUser(u.id).subscribe({
      next: () => {
        this.onSearchUser();
      },
      error: error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la suppression de l'utilisateur !`;
        this.notification.open('danger', message);
      }
    });
  }

  onResetPassword(u: Utilisateur) {
    const result = this.userService.requestPasswordReset(u.login).subscribe(
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
