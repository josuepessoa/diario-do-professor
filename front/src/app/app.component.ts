import { Component, ViewChild } from '@angular/core';

import { PoMenuComponent, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(PoMenuComponent, { static: true }) 'menuPo': PoMenuComponent;

  readonly menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      link: '/home',
      icon: 'po-icon-home',
      shortLabel: 'Home',
    },
    {
      label: 'Turmas',
      link: '/turmas',
      icon: 'po-icon-grid',
      shortLabel: 'Turmas',
    },
    {
      label: 'Alunos',
      link: '/alunos',
      icon: 'po-icon po-icon-users',
      shortLabel: 'Alunos',
    },
    {
      label: 'Vivencias',
      link: '/vivencias',
      icon: 'po-icon po-icon-light',
      shortLabel: 'Vivencias',
    },
  ];

}
