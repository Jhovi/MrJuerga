import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPedidoComponent } from './adm-pedido.component';

describe('AdmPedidoComponent', () => {
  let component: AdmPedidoComponent;
  let fixture: ComponentFixture<AdmPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
