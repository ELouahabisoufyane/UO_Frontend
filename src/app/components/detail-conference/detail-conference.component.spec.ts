import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConferenceComponent } from './detail-conference.component';

describe('DetailConferenceComponent', () => {
  let component: DetailConferenceComponent;
  let fixture: ComponentFixture<DetailConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailConferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
