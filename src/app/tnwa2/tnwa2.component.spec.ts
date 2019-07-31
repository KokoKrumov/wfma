import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tnwa2Component } from './tnwa2.component';

describe('Tnwa2Component', () => {
  let component: Tnwa2Component;
  let fixture: ComponentFixture<Tnwa2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tnwa2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tnwa2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
