import { Component, OnInit } from '@angular/core';
import {Categorie} from "../../../models/categorie.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateUpdateCategorieComponent} from "../create-update-categorie/create-update-categorie.component";
import {NotificationService} from "../../../common/services/notification.service";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {CategorieService} from "../categorie.service";
import {DetailCategorieComponent} from "../detail-categorie/detail-categorie.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  listeCategories: Categorie[] = [];

  constructor(private modalService: NgbModal,
              private notificationService: NotificationService,
              private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.getCategorie();
   // this.listeCategories = [{libelle: 'categorie  fichier',description:'descriptiondu fichier'}];
  }

  openModalCreate(): void {
    const modalRef = this.modalService.open(CreateUpdateCategorieComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(
      msg => {
        if (msg == true) {
          this.notificationService.open('success', `L'opération a été effectuée avec succès !`);
          this.getCategorie();
        }
      },
      () => {}
    );
  }

  async openConfirmdelete(categorie: Categorie) {
    const currentModal = this.modalService.open(ConfirmComponent, { size: 'lg', backdrop: 'static', centered: true });
    currentModal.componentInstance.message = `Voulez-vous supprimer la catégorie #${categorie.libelle} ?`;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.deleteCategorie(categorie.id);
        }
      }
    );
  }


  update(categorie: Categorie) {
    const modalRef = this.modalService.open(CreateUpdateCategorieComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.categorie = categorie;
    modalRef.result.then(
      msg => {
        if (msg == true) {
          this.notificationService.open('success', `L'opération a été effectuée avec succès !`);
        }
      },
      () => {}
    );
  }

  getCategorie(): void{
    this.categorieService.getCategories().subscribe(data=>{
      if(data.body){
        this.listeCategories = data.body;
      }
    })
  }

  private deleteCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe(data=>{
      if(data.body){
        if(data.body.code != -1){
          this.notificationService.open('success', data.body.msg);
          this.getCategorie();
        }else{
          this.notificationService.open('danger', data.body.msg);
        }
      }
    });
  }

  openModalDetail(categorie: Categorie) {
    const modalRef = this.modalService.open(DetailCategorieComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.categorie = categorie;
    modalRef.result.then(
      () => {
      },
      () => {}
    );
  }
}
