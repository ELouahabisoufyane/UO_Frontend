import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGestionnaireComponent } from './page-gestionnaire.component';

describe('PageGestionnaireComponent', () => {
  let component: PageGestionnaireComponent;
  let fixture: ComponentFixture<PageGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
