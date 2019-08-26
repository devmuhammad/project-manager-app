import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskTypeModalComponent } from './update-task-type-modal.component';

describe('UpdateTaskTypeModalComponent', () => {
  let component: UpdateTaskTypeModalComponent;
  let fixture: ComponentFixture<UpdateTaskTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTaskTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
