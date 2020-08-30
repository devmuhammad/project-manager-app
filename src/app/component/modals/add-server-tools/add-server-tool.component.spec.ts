import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServerToolComponent } from './add-server-tool.component';

describe('AddServerToolComponent', () => {
  let component: AddServerToolComponent;
  let fixture: ComponentFixture<AddServerToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServerToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServerToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
