import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsuarioComponent } from './search-usuario.component';

describe('SearchUsuarioComponent', () => {
  let component: SearchUsuarioComponent;
  let fixture: ComponentFixture<SearchUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
