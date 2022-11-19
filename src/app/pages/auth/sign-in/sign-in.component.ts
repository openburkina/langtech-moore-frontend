import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {SpinnerService} from "../../../common/services/spinner.service";
import {LoginVM} from "../../../models/LoginVM";
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {NotificationService} from "../../../common/services/notification.service";
import {Location, LocationStrategy, PlatformLocation} from "@angular/common";
import {ParameterService} from "../../../common/services/parameter.service";
import {Utilisateur} from "../../../models/utilisateur.model";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginVM: LoginVM;
  enableShowPassword: boolean;

  formLogin = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    rememberMe: true,
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private notification: NotificationService,
    private _location: Location,
    private locationStrategy: LocationStrategy,
    private location: PlatformLocation,
    private parameter: ParameterService,
  ) { }

  ngOnInit(): void {
    this.enableShowPassword = false;
    this.loginVM = new LoginVM();
    this.location.onPopState(
      () => {}
    );
  }

  onLogin() {
    this.loginVM.username =  this.formLogin.get('username').value;
    this.loginVM.password =  this.formLogin.get('password').value;
    this.loginVM.rememberMe =  this.formLogin.get('rememberMe').value;
    const result = this.loginService.login(this.loginVM).subscribe(
      response => {
        result.unsubscribe();
        if (response) {
          this.onSuccessLogin(this.parameter.currentUser);
          // if (this.parameter.currentUser.typeUtilisateur !== 'UTILISATEUR') {
          //   this.notification.open('danger', `Désolé ! Vous n'êtes pas autorisés à acceder à l'application !`);
          // } else {
          //   this.onSuccessLogin(this.parameter.currentUser);
          // }
        } else {
          this.notification.open('danger', `Une erreur est survenue lors de la connexion !`);
        }
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la connexion !`;
        this.notification.open('danger', message);
      }
    );
  }

  private onSuccessLogin(currentUser: Utilisateur): void {
    if (currentUser.user.resetKey) {
      this.router.navigate(['auth', 'reset-password', currentUser?.user?.resetKey]);
    } else {
      this.notification.open('success', `Bienvenue ${currentUser?.user?.login} !`);
      this.router.navigate(['pages/home']);
    }
  }

  showPassword() {
    this.enableShowPassword = !this.enableShowPassword;
  }


  // On Forgotpassword link click
  onForgotpassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

  // On Signup link click
  onSignup() {
    // this.router.navigate(['pages/home'], { relativeTo: this.route.parent });
    this.router.navigate(['pages/home']);
    // this.spinner.loading();
  }
}
