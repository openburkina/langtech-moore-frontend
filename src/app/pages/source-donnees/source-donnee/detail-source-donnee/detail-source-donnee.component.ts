import { Component, OnInit } from '@angular/core';
import {SourceDonnee} from "../../../../models/sourceDonnee.model";
import {Traduction} from "../../../../models/traduction.model";

@Component({
  selector: 'app-detail-source-donnee',
  templateUrl: './detail-source-donnee.component.html',
  styleUrls: ['./detail-source-donnee.component.scss']
})
export class DetailSourceDonneeComponent implements OnInit {
  sourceDonnee: SourceDonnee = new SourceDonnee();
  traductions: Traduction[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  fermer(): void {

  }

  oenDetaiModal(item: any) {

  }
}
