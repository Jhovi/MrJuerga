import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUsuarioMasGastanComponent } from './top-usuario-mas-gastan.component';

describe('TopUsuarioMasGastanComponent', () => {
  let component: TopUsuarioMasGastanComponent;
  let fixture: ComponentFixture<TopUsuarioMasGastanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopUsuarioMasGastanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUsuarioMasGastanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
