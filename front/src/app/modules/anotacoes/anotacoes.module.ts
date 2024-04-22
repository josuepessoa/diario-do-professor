import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnotacoesRoutingModule } from './anotacoes-routing.module';
import { AnotacoesComponent } from './anotacoes.component';
import { PageSlideMobileModule } from '../components/page-slide-mobile/page-slide-mobile.module';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AnotacoesComponent
  ],
  imports: [
    CommonModule,
    AnotacoesRoutingModule,
    PoModule,
    FormsModule,
    ReactiveFormsModule,
    PageSlideMobileModule
  ]
})
export class AnotacoesModule { }
