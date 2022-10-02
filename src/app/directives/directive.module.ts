import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HasAnyAuthorityDirective} from './has-any-authority.directive';



@NgModule({
    declarations: [
        HasAnyAuthorityDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        HasAnyAuthorityDirective
    ]
})
export class DirectiveModule { }
