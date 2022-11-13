import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Utilisateur} from "../../../models/utilisateur.model";
import {ContributeurService} from "../../contributeurs/contributeur.service";
import {NotificationService} from "../../../common/services/notification.service";

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  formSearch: FormGroup;
  contributeurs$: Observable<Utilisateur[]> = new Observable<Utilisateur[]>();

  constructor(
    private contributeurService: ContributeurService,
    private fb: FormBuilder,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.contributeurs$ = this.contributeurService.contributeurs$;
    this.initSearchForm();
  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      typeTraduction: [null, [Validators.required]],
    });
  }

  onResetSearchForm() {

  }

  onSearch() {

  }
}
