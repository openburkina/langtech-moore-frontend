import { Component, OnInit } from '@angular/core';
import {SourceDonnee} from "../../../models/sourceDonnee.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";
import {SourceService} from "../source.service";

@Component({
  selector: 'app-update-source-donnee',
  templateUrl: './update-source-donnee.component.html',
  styleUrls: ['./update-source-donnee.component.scss']
})
export class UpdateSourceDonneeComponent implements OnInit {
  formSourceDonnee = this.fb.group({
    libelle: [null,Validators.required],
  });
  sourceDonnee: SourceDonnee = new SourceDonnee();
  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private sourceService: SourceService) { }

  ngOnInit(): void {
    this.createForm();
  }

  fermer() {
this.activeModal.close(false);
  }

  getSourceInfo() {
    this.sourceDonnee.libelle = this.formSourceDonnee.get('libelle').value;
    if(this.sourceDonnee.id){
      this.update();
    }else{
      this.create();
    }

  }

  createForm() {
    if (this.sourceDonnee &&this.sourceDonnee.id) {
      this.formSourceDonnee.patchValue({
        libelle: this.sourceDonnee.libelle,
      });
    } else {
      this.sourceDonnee = new SourceDonnee();
    }
  }

  private update() {
    this.sourceService.updateSourceDonnee(this.sourceDonnee).subscribe(data=>{
      if(data){
        this.activeModal.close(true);
      }
    })
  }


  private create() {
    alert("creation")
    this.sourceService.createSourceDonnee(this.sourceDonnee).subscribe(data=>{
      if(data){
        this.activeModal.close(true);
      }
    })
  }
}
