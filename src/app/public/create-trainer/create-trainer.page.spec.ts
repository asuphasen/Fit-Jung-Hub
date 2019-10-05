import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainerPage } from './create-trainer.page';

describe('CreateTrainerPage', () => {
  let component: CreateTrainerPage;
  let fixture: ComponentFixture<CreateTrainerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTrainerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTrainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
