import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store"
import { State } from "../+state/pokemon/pokemon.reducer"
import * as actions from "../+state/pokemon/pokemon.actions";
import * as selectors from "../+state/pokemon/pokemon.selectors";
import { Observable } from 'rxjs';
import { PokemonEntity } from '../+state/pokemon/pokemon.models';

@Component({
  selector: 'pokemon-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  results$: Observable<PokemonEntity[]>
  loading$: Observable<boolean>

  constructor(private store: Store<State>) {
    this.results$ = store.select(selectors.getPokemon)
    this.loading$ = store.select(selectors.isLoading)
  }

}

