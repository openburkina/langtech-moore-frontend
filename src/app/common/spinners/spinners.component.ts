import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'ngx-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: ['./spinners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 0.4 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300),
      ]),
      transition(':leave',
        animate(200, style({ opacity: 0 }))),
    ]),
  ],
})
export class SpinnersComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
  }

}
