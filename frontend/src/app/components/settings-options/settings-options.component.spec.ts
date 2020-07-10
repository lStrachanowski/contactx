import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOptionsComponent } from './settings-options.component';

describe('SettingsOptionsComponent', () => {
  let component: SettingsOptionsComponent;
  let fixture: ComponentFixture<SettingsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
