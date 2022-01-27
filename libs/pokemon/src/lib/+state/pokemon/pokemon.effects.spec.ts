import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { PageGQL, SuggestionGQL } from '../../generated/generated';
import * as PokemonActions from './pokemon.actions';
import { PokemonEffects } from './pokemon.effects';
describe('PokemonEffects', () => {
  let actions: Observable<Action>;
  let effects: PokemonEffects;
  let mockSuggestionGQL: { fetch: jest.FunctionLike };
  let mockPageGQL: { fetch: jest.FunctionLike };

  beforeEach(() => {
    mockSuggestionGQL = { fetch: jest.fn() };
    mockPageGQL = { fetch: jest.fn() };
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PokemonEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: SuggestionGQL, useValue: mockSuggestionGQL },
        { provide: PageGQL, useValue: mockPageGQL }
      ],
    });

    effects = TestBed.inject(PokemonEffects);
  });


  describe('page$', () => {

    it('empty search', () => {

      actions = hot('-a-|', { a: PokemonActions.GetPage({ search: "", limit: 10, offset: 0 }) });

      const expected = hot('-a-|', {
        a: PokemonActions.LoadPageSuccess({ pokemon: [] }),
      });

      expect(effects.page$).toBeObservable(expected);
    });
  });
});
