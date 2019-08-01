import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityHistoryListComponent } from './city-history-list.component';

describe('CityHistoryListComponent', () => {
  let component: CityHistoryListComponent;
  let fixture: ComponentFixture<CityHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
