import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskTypeModalComponent } from './create-task-type-modal.component';

describe('CreateTaskTypeModalComponent', () => {
  let component: CreateTaskTypeModalComponent;
  let fixture: ComponentFixture<CreateTaskTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
