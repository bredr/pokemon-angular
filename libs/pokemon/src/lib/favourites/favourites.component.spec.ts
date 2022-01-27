import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from "@ngrx/store/testing"
import * as fromPokemon from '../+state/pokemon/pokemon.reducer';
import { FavouritesComponent } from './favourites.component';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouritesComponent],
      providers: [provideMockStore({ initialState: fromPokemon.initialState })]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
