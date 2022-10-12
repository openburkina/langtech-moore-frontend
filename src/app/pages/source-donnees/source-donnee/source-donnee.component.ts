import { Component, OnInit } from '@angular/core';
import {CreateUpdateSourceDonneeComponent} from "../create-update-source-donnee/create-update-source-donnee.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../common/services/notification.service";

@Component({
  selector: 'app-source-donnee',
  templateUrl: './source-donnee.component.html',
  styleUrls: ['./source-donnee.component.scss']
})
export class SourceDonneeComponent implements OnInit {
  listeCategories: any[] = [];

  constructor( private modalService: NgbModal,
               private notification: NotificationService,) { }

  ngOnInit(): void {
  }

  openModalCreate() {
    const modalRef = this.modalService.open(CreateUpdateSourceDonneeComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(
      msg => {
        if (msg == true) {
          this.notification.open('success', `L'opération a été effectuée avec succès !`);

        }
      }
    );
  }
}
