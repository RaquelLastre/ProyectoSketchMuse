import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaImagenes } from './lista-imagenes';

describe('ListaImagenes', () => {
  let component: ListaImagenes;
  let fixture: ComponentFixture<ListaImagenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaImagenes],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaImagenes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
