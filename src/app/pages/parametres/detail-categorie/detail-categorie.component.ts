import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";
import {Categorie} from "../../../models/categorie.model";
import {CategorieService} from "../categorie.service";
import {CreateUpdateCategorieComponent} from "../create-update-categorie/create-update-categorie.component";
import {NotificationService} from "../../../common/services/notification.service";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";

@Component({
  selector: 'app-detail-categorie',
  templateUrl: './detail-categorie.component.html',
  styleUrls: ['./detail-categorie.component.scss']
})
export class DetailCategorieComponent implements OnInit {
  formCategorie = this.fb.group({
    superCategorie: [],
    categId: [],
    typeCategorie: [],
    libelle: [null, Validators.required],
    description: [null, Validators.required]
  });
  categorie: Categorie = {};
  listeCategories: Categorie[] = [];
  listeSousCategories: Categorie[] = [];

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private categorieService: CategorieService,
              private modalService: NgbModal,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getSousCategories();
    this.getCategorie();
    this.createForm();
  }

  createForm() {
    if (this.categorie !== null) {
      this.formCategorie.patchValue({
        libelle: this.categorie.libelle,
        description: this.categorie.description,
        superCategorie: this.categorie.superCategorie,
        categId: this.categorie.superCategorie? this.categorie.superCategorie.id : null,
        typeCategorie: this.categorie.superCategorie? 2 : 1
      });
    } else {
      this.categorie = new Categorie();
    }
  }

  fermer() {
    this.activeModal.close(false);
  }

  getSousCategories(): void{
    this.categorieService.findBySuperCategorieId(this.categorie.id).subscribe(data=>{
      if(data.body){
        this.listeSousCategories = data.body;
      }
    })
  }
  getCategorie(): void{
    this.categorieService.getCategories().subscribe(data=>{
      if(data.body){
        this.listeCategories = data.body;
      }
    })
  }

  oenDetaiModal(categorie: Categorie) {
    const modalRef = this.modalService.open(DetailCategorieComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.categorie = categorie;
    modalRef.result.then(
      () => {
      },
      () => {}
    );
  }

  update(categorie: Categorie) {
    const modalRef = this.modalService.open(CreateUpdateCategorieComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.categorie = categorie;
    modalRef.result.then(
      msg => {
        if (msg == true) {
          this.notificationService.open('success', `L'opération a été effectuée avec succès !`);
          this.ngOnInit();
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

  private deleteCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe(data=>{
      if(data.body){
        if(data.body.code != -1){
          this.notificationService.open('success', data.body.msg);
          this.ngOnInit();
        }else{
          this.notificationService.open('danger', data.body.msg);
        }
      }
    });
  }
}
