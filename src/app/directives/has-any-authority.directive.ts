import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from "../pages/auth/services/account.service";

@Directive({
  selector: '[ngxHasAnyAuthority]',
})
export class HasAnyAuthorityDirective {
  private authorities: string[];

  constructor(
    private accountService: AccountService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set ngxHasAnyAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;
    this.updateView();
    this.accountService.getAuthenticationState().subscribe(identity => this.updateView());
  }

  private updateView(): void {
    const hasAnyAuthority = this.accountService.hasAnyAuthority(this.authorities);
    this.viewContainerRef.clear();
    if (hasAnyAuthority) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
