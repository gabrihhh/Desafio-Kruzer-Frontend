import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoComercialComponent } from './fluxo-comercial.component';

describe('FluxoComercialComponent', () => {
  let component: FluxoComercialComponent;
  let fixture: ComponentFixture<FluxoComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxoComercialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
