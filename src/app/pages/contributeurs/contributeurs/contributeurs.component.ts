import { Component, OnInit } from '@angular/core';
import {ContributeurService} from "../contributeur.service";
import {Observable, of} from "rxjs";
import {Utilisateur} from "../../../models/utilisateur.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NotificationService} from "../../../common/services/notification.service";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contributeurs',
  templateUrl: './contributeurs.component.html',
  styleUrls: ['./contributeurs.component.scss']
})
export class ContributeursComponent implements OnInit {
  formSearch!: FormGroup;
  contributeurs$: Observable<Utilisateur[]> = new Observable<Utilisateur[]>();
  enableShowFilter: boolean;
  totalItems = 0;
  itemsPerPage = 10;
  maxSize = 20;
  page = 0;
  ngbPaginationPage = 1;
  contributeur: Utilisateur = new Utilisateur();
  contributeurs: Utilisateur[] = [];

  constructor(
    private contributeurService: ContributeurService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private modalService:NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initSearchForm();
    // this.contributeurs$ = this.contributeurService.contributeurs$;

    this.getContributeurs();
  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      nom: null,
      prenom: null,
      email: null,
      telephone: null,
    });
  }

  onResetSearchForm() {

  }

  onChangeFilterStatus() {
    this.enableShowFilter = !this.enableShowFilter;
  }

  onSearch() {
    this.contributeur.nom = this.formSearch.get('nom').value;
    this.contributeur.prenom = this.formSearch.get('prenom').value;
    this.contributeur.email = this.formSearch.get('email').value;
    this.contributeur.telephone = this.formSearch.get('telephone').value;
    this.getContributeurs();

  }

  getContributeurs() {
    const request = {
      page: this.page,
      size: this.itemsPerPage,
    };
    this.contributeurService.getContributeursWitCriteria(this.contributeur, request).subscribe({
      next: response => {
        if (response.body !== null) {
          this.totalItems = Number(response.headers.get('X-Total-Count'));
          this.contributeurs$ = of(response.body);
          this.contributeurs = response.body;
          console.warn("contributeurs",this.contributeurs);
        }
      },
      error: error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des contributeurs !`;
        this.notification.open('danger', message);
      }
    });
  }

  loadPage(pageNumber: number) {
    this.page = pageNumber - 1;
    this.getContributeurs();
  }

  async openConfirmdelete(contributeur: Utilisateur) {
    const currentModal = this.modalService.open(ConfirmComponent, { size: 'lg', backdrop: 'static', centered: true });
    currentModal.componentInstance.message = `Voulez-vous supprimer le contributeur #${contributeur.id} ?`;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.deleteContributeur(contributeur);
        }
      }
    );
  }

  private deleteContributeur(contributeur: Utilisateur) {
    /** A revoir supprimer le contributeur avec tous ses contributions */
    const result = this.contributeurService.deleteContributeur(contributeur.id).subscribe(
      () => {
        result.unsubscribe();
        this.notification.open('success', `Le contributeur a été supprimé avec succès !`);
        this.getContributeurs();
      },
      error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la suppression de la source !`;
        this.notification.open('danger', message);
        result.unsubscribe();
      }
    );
  }

  gotoDetail(u: Utilisateur) {
    console.warn("contributeur detail",u);
    this.router.navigate(['pages','contributeurs','detail',u.id]);
  }
}
