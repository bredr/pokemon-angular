import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PokemonActions from './pokemon.actions';
import { PokemonEntity } from './pokemon.models';

export const POKEMON_FEATURE_KEY = 'pokemon';

export interface State extends EntityState<PokemonEntity> {
  suggestions: string[];
  error?: string | null; // last known error (if any)
  pokemon: PokemonEntity[];
  limit: number;
  offset: number;
  loading: boolean;
}

export interface PokemonPartialState {
  readonly [POKEMON_FEATURE_KEY]: State;
}

export const pokemonAdapter: EntityAdapter<PokemonEntity> =
  createEntityAdapter<PokemonEntity>();

export const initialState: State = pokemonAdapter.getInitialState({
  // set initial required properties
  suggestions: [],
  pokemon: [],
  limit: 10,
  offset: 0,
  loading: false
});

const pokemonReducer = createReducer(
  initialState,
  on(PokemonActions.init, (state) => ({
    ...state,
    suggestions: [],
    error: null,
  })),
  on(PokemonActions.LoadSuggestionsSuccess, (state, { pokemon: suggestions }) =>
    ({ ...state, suggestions, pokemon: [] })
  ),
  on(PokemonActions.LoadSuggestionsFailure, (state, { error }) => ({
    ...state,
    pokemon: [],
    suggestions: [],
    error,
  })),
  on(PokemonActions.GetPage, (state, { limit, offset }) => ({ ...state, limit, offset, pokemon: [], loading: true })),
  on(PokemonActions.LoadPageSuccess, (state, { pokemon }) => ({ ...state, pokemon, loading: false })),
  on(PokemonActions.LoadPageFailure, (state, { error }) => ({
    ...state,
    pokemon: [],
    error,
    loading: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return pokemonReducer(state, action);
}
