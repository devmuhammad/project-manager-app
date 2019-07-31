import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectTypeModalComponent } from './update-project-type-modal.component';

describe('UpdateProjectTypeModalComponent', () => {
  let component: UpdateProjectTypeModalComponent;
  let fixture: ComponentFixture<UpdateProjectTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProjectTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProjectTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
