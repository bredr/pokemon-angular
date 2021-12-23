import { Component, Input, OnInit } from '@angular/core';
import { PokemonEntity } from '../+state/pokemon/pokemon.models';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store"
import { State } from "../+state/pokemon/pokemon.reducer"
import * as actions from "../+state/pokemon/pokemon.actions";
import * as selectors from "../+state/pokemon/pokemon.selectors";
import { catchError, exhaustMap, map } from 'rxjs/operators';

@Component({
  selector: 'pokemon-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  @Input() result!: PokemonEntity;

  isFavourite$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.isFavourite$ = store.select(selectors.getFavourites).pipe(
      map(x => x.some(({ species }) => species === this.result.species))
    );
  }

  styleURL(sprite: string) {
    return `url(${sprite})`
  }

  add() {
    this.store.dispatch(actions.AddFavourite({ pokemon: this.result }))
  }

  remove() {
    this.store.dispatch(actions.RemoveFavourite({ species: this.result.species }))
  }


}
