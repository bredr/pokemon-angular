import { Component } from '@angular/core';
import { Store } from "@ngrx/store"
import { State } from "../+state/pokemon/pokemon.reducer"
import * as selectors from "../+state/pokemon/pokemon.selectors";
import { Observable } from 'rxjs';
import { PokemonEntity } from '../+state/pokemon/pokemon.models';

@Component({
  selector: 'pokemon-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {

  favourites$: Observable<PokemonEntity[]>

  constructor(private store: Store<State>) {
    this.favourites$ = store.select(selectors.getFavourites)
  }
}
