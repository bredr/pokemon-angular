import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountComponent } from './count.component';
import { provideMockStore } from "@ngrx/store/testing"
import * as fromPokemon from '../+state/pokemon/pokemon.reducer';

describe('CountComponent', () => {
  let component: CountComponent;
  let fixture: ComponentFixture<CountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountComponent],
      providers: [provideMockStore({ initialState: fromPokemon.initialState })]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
