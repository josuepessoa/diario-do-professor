import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VivenciasComponent } from './vivencias.component';

describe('VivenciasComponent', () => {
  let component: VivenciasComponent;
  let fixture: ComponentFixture<VivenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VivenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VivenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
