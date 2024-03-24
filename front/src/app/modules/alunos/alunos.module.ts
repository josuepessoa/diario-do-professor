import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageSlideMobileModule } from '../components/page-slide-mobile/page-slide-mobile.module';


@NgModule({
  declarations: [
    AlunosComponent
  ],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    PoModule,
    FormsModule,
    ReactiveFormsModule,
    PageSlideMobileModule
  ]
})
export class AlunosModule { }
