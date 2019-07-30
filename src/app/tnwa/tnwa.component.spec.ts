import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnwaComponent } from './tnwa.component';

describe('TnwaComponent', () => {
  let component: TnwaComponent;
  let fixture: ComponentFixture<TnwaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnwaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
