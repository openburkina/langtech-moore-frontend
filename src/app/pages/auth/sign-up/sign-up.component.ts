import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  // On Signup link click
  onSignIn() {
    // this.router.navigate(['pages/home'], { relativeTo: this.route.parent });
    this.router.navigate(['pages/home']);
  }

  ngOnInit(): void {
  }

}
