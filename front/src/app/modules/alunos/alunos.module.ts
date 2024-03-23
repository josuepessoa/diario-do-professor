import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos.component';
import { PoModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [
    AlunosComponent
  ],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    PoModule,
  ]
})
export class AlunosModule { }
