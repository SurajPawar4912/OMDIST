import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgspaymentComponent } from './agspayment.component';

describe('AgspaymentComponent', () => {
  let component: AgspaymentComponent;
  let fixture: ComponentFixture<AgspaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgspaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgspaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
