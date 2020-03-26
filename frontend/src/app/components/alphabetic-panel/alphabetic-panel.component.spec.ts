import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabeticPanelComponent } from './alphabetic-panel.component';

describe('AlphabeticPanelComponent', () => {
  let component: AlphabeticPanelComponent;
  let fixture: ComponentFixture<AlphabeticPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabeticPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabeticPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
