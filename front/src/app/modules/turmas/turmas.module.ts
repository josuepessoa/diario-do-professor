import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurmasRoutingModule } from './turmas-routing.module';
import { TurmasComponent } from './turmas.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageSlideMobileModule } from '../components/page-slide-mobile/page-slide-mobile.module';


@NgModule({
  declarations: [
    TurmasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TurmasRoutingModule,
    PoModule,
    PageSlideMobileModule
  ]
})
export class TurmasModule { }
