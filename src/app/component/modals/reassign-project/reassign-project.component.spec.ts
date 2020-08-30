import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignProjectComponent } from './reassign-project.component';

describe('ReassignProjectComponent', () => {
  let component: ReassignProjectComponent;
  let fixture: ComponentFixture<ReassignProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReassignProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
