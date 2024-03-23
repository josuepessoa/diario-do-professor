import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageSlideMobileComponent } from './page-slide-mobile.component';


@NgModule({
  declarations: [PageSlideMobileComponent],
  exports: [PageSlideMobileComponent],
  imports: [CommonModule, FormsModule]
})
export class PageSlideMobileModule { }
