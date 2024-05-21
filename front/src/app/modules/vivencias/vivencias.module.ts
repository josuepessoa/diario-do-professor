import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VivenciasComponent } from './vivencias.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageSlideMobileModule } from '../components/page-slide-mobile/page-slide-mobile.module';
import { VivenciasRoutingModule } from './vivencias-routing.module';

@NgModule({
  declarations: [
    VivenciasComponent
  ],
  imports: [
    CommonModule,
    VivenciasRoutingModule,
    PoModule,
    FormsModule,
    ReactiveFormsModule,
    PageSlideMobileModule
  ]
})
export class VivenciasModule { }
