import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSlideMobileComponent } from './page-slide-mobile.component';

describe('PageSlideMobileComponent', () => {
  let component: PageSlideMobileComponent;
  let fixture: ComponentFixture<PageSlideMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSlideMobileComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageSlideMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
