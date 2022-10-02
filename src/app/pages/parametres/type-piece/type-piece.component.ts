import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateUpdateTypePieceComponent} from "../create-update-type-piece/create-update-type-piece.component";
import {TypePiece} from "../../../models/typePiece.model";
import {SWAL_DELETE_TITLE, SWAL_MENTION_IRREVERSIBLE, SWAL_TEXT} from "../../../common/constante/liste.constants";
import {NotificationService} from "../../../common/services/notification.service";
import {Categorie} from "../../../models/categorie.model";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";

@Component({
  selector: 'app-type-piece',
  templateUrl: './type-piece.component.html',
  styleUrls: ['./type-piece.component.scss']
})
export class TypePieceComponent implements OnInit {
  type
  listeTypePieces = [{libelle: 'Synthese de donnee pluviometrie',description:'descriptiondu fichier'}];
  constructor(private modalService: NgbModal,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  openModalCreate(): void {
    const modalRef = this.modalService.open(CreateUpdateTypePieceComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(
      msg => {
        if (msg == true) {
          // console
        }
      },
      () => {}
    );
  }

  update(typePiece: TypePiece): void {
    console.warn('typePiece',typePiece);
    const modalRef = this.modalService.open(CreateUpdateTypePieceComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.typePiece = typePiece;
    modalRef.result.then(
      msg => {
        if (msg == true) {
          // console
        }
      },
      () => {}
    );
  }

  async openConfirmdelete(typePiece: TypePiece) {
    const currentModal = this.modalService.open(ConfirmComponent, { size: 'lg', backdrop: 'static', centered: true });
    currentModal.componentInstance.message = `Voulez-vous supprimer le type pièce #${typePiece.libelle} ?`;
    await currentModal.result.then(
      response => {
        if (response === true) {
          //  this.deleteGroupe(g);
        }
      }
    );
  }
}
