import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerListPage } from './trainer-list.page';

describe('TrainerListPage', () => {
  let component: TrainerListPage;
  let fixture: ComponentFixture<TrainerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
