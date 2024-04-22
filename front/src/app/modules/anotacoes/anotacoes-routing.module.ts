import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnotacoesComponent } from './anotacoes.component';

const routes: Routes = [
  {
    path: ':id',
    component: AnotacoesComponent
  },
  {
    path: 'anotacoes/:id',
    component: AnotacoesComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnotacoesRoutingModule { }
