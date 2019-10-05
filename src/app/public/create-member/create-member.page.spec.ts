import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemberPage } from './create-member.page';

describe('CreateMemberPage', () => {
  let component: CreateMemberPage;
  let fixture: ComponentFixture<CreateMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMemberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
