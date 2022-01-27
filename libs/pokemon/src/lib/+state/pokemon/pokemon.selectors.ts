import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POKEMON_FEATURE_KEY, State } from './pokemon.reducer';

// Lookup the 'Pokemon' feature state managed by NgRx
export const getPokemonState =
  createFeatureSelector<State>(POKEMON_FEATURE_KEY);

export const getSuggestions = createSelector(getPokemonState, (state: State) => state.suggestions)

export const getPokemonError = createSelector(
  getPokemonState,
  (state: State) => state.error
);

export const getPokemon = createSelector(getPokemonState, (state: State) => state.pokemon);
export const getPokemonLoading = createSelector(getPokemonState, (state: State) => state.loading);
export const getPagination = createSelector(getPokemonState, ({ limit, offset }: State) => ({ limit, offset }));
export const isLoading = createSelector(getPokemonState, (state: State) => state.loading)
export const hasResults = createSelector(getPokemonState, (state: State) => state.pokemon.length > 0)
export const getFavourites = createSelector(getPokemonState, (state: State) => state.favourite);
export const searchTerm = createSelector(getPokemonState, (state: State) => state.searchTerm)