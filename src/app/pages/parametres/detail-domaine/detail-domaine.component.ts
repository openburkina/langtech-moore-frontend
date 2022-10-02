import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Domaine} from "../../../models/domaine.model";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DomaineService} from "../domaine.service";
import {CreateUpdateDomaineComponent} from "../create-update-domaine/create-update-domaine.component";
import {NotificationService} from "../../../common/services/notification.service";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";

@Component({
  selector: 'app-detail-domaine',
  templateUrl: './detail-domaine.component.html',
  styleUrls: ['./detail-domaine.component.scss']
})
export class DetailDomaineComponent implements OnInit {
  formDomaine = this.fb.group({
    superDomaine: [],
    domaineId: [],
    typeDomaine: [],
    libelle: [null, Validators.required],
    description: [null, Validators.required]
  });
  domaine: Domaine = {};
  listeDomaines: Domaine[] = [];
  listeSousDomaines: Domaine[] = [];

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private domaineService: DomaineService,
              private modalService: NgbModal,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getSousDomaine();
    this.getDomaines();
    this.createForm();
  }
  createForm() {
    if (this.domaine !== null) {
      this.formDomaine.patchValue({
        libelle: this.domaine.libelle,
        description: this.domaine.description,
        superDomaine: this.domaine.superDomaine,
        domaineId: this.domaine.superDomaine? this.domaine.superDomaine.id : null,
        typeDomaine: this.domaine.superDomaine? 2 : 1
      });
    } else {
      this.domaine = new Domaine();
    }
  }

  fermer() {
    this.activeModal.close(false);
  }

  getSousDomaine(): void{
      this.domaineService.findBySuperDomaineId(this.domaine.id).subscribe(data=>{
        if(data.body){
          this.listeSousDomaines = data.body;
        }
      })
  }

  getDomaines(): void{
    this.domaineService.getDomaines().subscribe(data=>{
      if(data.body){
        this.listeDomaines = data.body;
      }
    })
  }

  oenDetaiModal(domaine: Domaine) {
    const modalRef = this.modalService.open(DetailDomaineComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.domaine = domaine;
    modalRef.result.then(
      () => {
      },
      () => {}
    );
  }

  update(domaine: Domaine) {
    const modalRef = this.modalService.open(CreateUpdateDomaineComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.domaine = domaine;
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

  async openConfirmdelete(domaine: Domaine) {
    const currentModal = this.modalService.open(ConfirmComponent, { size: 'lg', backdrop: 'static', centered: true });
    currentModal.componentInstance.message = `Voulez-vous supprimer le domaine #${domaine.libelle} ?`;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.deleteDomaine(domaine.id);
        }
      }
    );
  }

  private deleteDomaine(id: number): void {
    this.domaineService.deleteDomaine(id).subscribe(data=>{
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
