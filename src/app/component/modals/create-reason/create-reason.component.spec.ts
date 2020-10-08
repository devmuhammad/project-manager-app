import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReasonComponent } from './create-reason.component';

describe('CreateReasonComponent', () => {
  let component: CreateReasonComponent;
  let fixture: ComponentFixture<CreateReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
