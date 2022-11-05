import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";
import {SourceDonnee} from "../../../models/sourceDonnee.model";
import {SourceService} from "../source.service";

@Component({
  selector: 'app-create-update-source-donnee',
  templateUrl: './create-update-source-donnee.component.html',
  styleUrls: ['./create-update-source-donnee.component.scss']
})
export class CreateUpdateSourceDonneeComponent implements OnInit {
  formSourceDonnee = this.fb.group({
    source: [],
    categId: [],
  });
  sourceDonnee: SourceDonnee = new SourceDonnee();
  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private sourceService: SourceService) { }

  ngOnInit(): void {
  }

  getSourceInfo() {
    console.warn("fichier",this.sourceDonnee.file);
    this.sourceService.createSourceDonnee(this.sourceDonnee).subscribe(data=>{
      if(data){
        console.warn("cool")
      }
    })

  }

  fermer() {
    this.activeModal.close();
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      const file: any = reader.result;
      const fileBase64: string[] = file.split('base64,');
      this.sourceDonnee.file = fileBase64[1];
      this.formSourceDonnee.patchValue({
        source: this.sourceDonnee.file,
      });
    };
  }
}
