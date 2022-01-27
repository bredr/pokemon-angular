import { PokemonEntity } from './pokemon.models';
import {
  PokemonPartialState,
  initialState,
} from './pokemon.reducer';
import * as PokemonSelectors from './pokemon.selectors';

describe('Pokemon Selectors', () => {
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


  let state: PokemonPartialState;

  beforeEach(() => {
    state = {
      pokemon: {
        ...initialState,
        loading: false,
        pokemon: [createPokemonEntity('AAA'),
        createPokemonEntity('BBB'),
        createPokemonEntity('CCC'),]
      }
    };
  });

  describe('Pokemon Selectors', () => {
    it('getPokemon() should return the list of Pokemon', () => {
      const results = PokemonSelectors.getPokemon(state);
      const selId = results[0].species;

      expect(results.length).toBe(3);
      expect(selId).toBe('AAA');
    });

  });
});
