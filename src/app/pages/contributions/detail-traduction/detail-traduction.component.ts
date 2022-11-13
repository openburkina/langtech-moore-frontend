import { Component, OnInit } from '@angular/core';
import {Traduction} from "../../../models/traduction.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { saveAs } from 'file-saver';
import {auto} from "@popperjs/core";
import {ContributionService} from "../contribution.service";
import {NotificationService} from "../../../common/services/notification.service";

@Component({
  selector: 'app-detail-traduction',
  templateUrl: './detail-traduction.component.html',
  styleUrls: ['./detail-traduction.component.scss']
})
export class DetailTraductionComponent implements OnInit {
  traduction: Traduction;
  audio: string;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    // this.audio = `data:audio/mp4;base64,${this.traduction.contenuAudio}`;
    console.log(this.audio);
  }

  onCloseModal() {
    this.activeModal.close();
  }

  onValideTraduction(type: string) {

  }

  onDownloadFile() {
    const byteString: string = window.atob(this.traduction.contenuAudio);
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: this.traduction.contenuAudioContentType });

    saveAs(blob, this.formatImageName(`${this.traduction.id}_${this.traduction.libelle.substring(0, 5)}`));
  }

  formatImageName(name: string): string {
    name = name.toLocaleLowerCase();
    name = name.replace(' ', '_');
    return name;
  }
}
