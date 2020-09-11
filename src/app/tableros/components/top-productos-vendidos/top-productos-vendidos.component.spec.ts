import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProductosVendidosComponent } from './top-productos-vendidos.component';

describe('TopProductosVendidosComponent', () => {
  let component: TopProductosVendidosComponent;
  let fixture: ComponentFixture<TopProductosVendidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopProductosVendidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProductosVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
