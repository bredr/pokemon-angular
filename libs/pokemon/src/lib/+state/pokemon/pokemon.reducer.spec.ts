import { Action } from '@ngrx/store';

import * as PokemonActions from './pokemon.actions';
import { PokemonEntity } from './pokemon.models';
import { State, initialState, reducer } from './pokemon.reducer';

describe('Pokemon Reducer', () => {
  const createPokemonEntity = (species: string): PokemonEntity => ({
    species,
    sprite: "",
    height: 0,
    attack: 0,
    defense: 0,
    hp: 0,
    speed: 0,
    specialattack: 0,
    specialdefense: 0
  });

  describe('valid Pokemon actions', () => {
    it('loadPokemonSuccess should return the list of known Pokemon', () => {
      const pokemon = [
        createPokemonEntity("A"),
        createPokemonEntity('B'),
      ];
      const action = PokemonActions.LoadPageSuccess({ pokemon });

      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.pokemon.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
