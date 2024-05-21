import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'turmas',
    loadChildren: () =>
      import('./modules/turmas/turmas.module').then(
        (m) => m.TurmasModule
      ),
  },
  {
    path: 'alunos',
    loadChildren: () =>
      import('./modules/alunos/alunos.module').then(
        (m) => m.AlunosModule
      ),
  },
  {
    path: 'anotacoes',
    loadChildren: () =>
      import('./modules/anotacoes/anotacoes.module').then(
        (m) => m.AnotacoesModule
      ),
  },
  {
    path: 'vivencias',
    loadChildren: () =>
      import('./modules/vivencias/vivencias.module').then(
        (m) => m.VivenciasModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
