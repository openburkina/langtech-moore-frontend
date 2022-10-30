import { Component, OnInit } from '@angular/core';
import {ContributeurService} from "../contributeur.service";
import {Observable} from "rxjs";
import {Utilisateur} from "../../../models/utilisateur.model";

@Component({
  selector: 'app-contributeurs',
  templateUrl: './contributeurs.component.html',
  styleUrls: ['./contributeurs.component.scss']
})
export class ContributeursComponent implements OnInit {
  contributeurs$: Observable<Utilisateur[]> = new Observable<Utilisateur[]>();

  constructor(
    private contributeurService: ContributeurService,
  ) { }

  ngOnInit(): void {
    this.contributeurs$ = this.contributeurService.contributeurs$;
  }

}
