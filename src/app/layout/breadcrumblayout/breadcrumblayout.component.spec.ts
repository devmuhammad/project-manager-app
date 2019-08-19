import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumblayoutComponent } from './breadcrumblayout.component';

describe('BreadcrumblayoutComponent', () => {
  let component: BreadcrumblayoutComponent;
  let fixture: ComponentFixture<BreadcrumblayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumblayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumblayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
