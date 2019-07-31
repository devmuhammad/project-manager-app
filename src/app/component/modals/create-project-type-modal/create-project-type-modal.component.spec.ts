import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectTypeModalComponent } from './create-project-type-modal.component';

describe('CreateProjectTypeModalComponent', () => {
  let component: CreateProjectTypeModalComponent;
  let fixture: ComponentFixture<CreateProjectTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
