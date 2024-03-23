import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputBoolean } from '@po-ui/ng-components';


@Component({
  selector: 'app-page-slide-mobile',
  templateUrl: './page-slide-mobile.component.html',
  styleUrls: ['./page-slide-mobile.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [animate('350ms', style({ opacity: 0 }))])
    ]),
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateY(150%)' }),
        animate('350ms ease-out', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [animate('350ms ease-out', style({ transform: 'translateY(150%)' }))])
    ]),
  ],
})
export class PageSlideMobileComponent implements OnInit {
  hidden = true;

  @Input('title') 'title': string;
  @Input('subtitle') 'subtitle'?: string;

  @Input('hide-close') @InputBoolean() 'hideClose'?: boolean = false;
  @Input('click-out') @InputBoolean() 'clickOut'?: boolean = false;

  @Output('close') closePageSlide: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    this.hidden = false;
  }

  close() {
    this.hidden = true;
    this.closePageSlide.emit();
  }

  onClickOut() {
    if (this.clickOut) {
      this.close();
    }
  }
}
