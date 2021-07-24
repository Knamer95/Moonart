import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedServiceComponent } from './shared-service.component';

describe('SharedServiceComponent', () => {
  let component: SharedServiceComponent;
  let fixture: ComponentFixture<SharedServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
