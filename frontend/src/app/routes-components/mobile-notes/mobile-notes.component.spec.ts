import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNotesComponent } from './mobile-notes.component';

describe('MobileNotesComponent', () => {
  let component: MobileNotesComponent;
  let fixture: ComponentFixture<MobileNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
