import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  date: Date;

  constructor(
    private _location: Location,
  ) { }

  goBack() {
    // window.history.back();
    this._location.back();
  }

  ngOnInit(): void {
    this.date = new Date();
  }

}
