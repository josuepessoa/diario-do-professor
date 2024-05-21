import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VivenciasComponent } from './vivencias.component';

const routes: Routes = [
  {
    path: '',
    component: VivenciasComponent
  },
  {
    path: 'vivencias',
    component: VivenciasComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VivenciasRoutingModule { }
