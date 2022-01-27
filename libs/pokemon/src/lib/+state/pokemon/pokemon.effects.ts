import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import * as PokemonActions from './pokemon.actions';
import { SuggestionGQL, PageGQL, PageQuery } from '../../generated/generated';
import { PokemonEntity } from './pokemon.models';
import { routerNavigatedAction } from "@ngrx/router-store"
@Injectable()
export class PokemonEffects {
  suggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.GetSuggestions),
      exhaustMap(({ search }) => {
        if (search.length === 0) {
          return of(PokemonActions.LoadSuggestionsSuccess({ pokemon: [] }));
        }
        return this.suggestionsService.fetch({ search }).pipe(
          map(
            ({ data: { getFuzzyPokemon } }) =>
              PokemonActions.LoadSuggestionsSuccess({
                pokemon: getFuzzyPokemon.map(({ species }) => species),
              }),
            catchError((error) =>
              of(PokemonActions.LoadSuggestionsFailure({ error: `${error}` }))
            )
          )
        );
      })
    )
  );

  pageLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      exhaustMap(({ payload: { routerState: { root: { queryParams } } } }) => {
        if (!queryParams["q"]) {
          return of(PokemonActions.LoadPageSuccess({ pokemon: [] }));
        }
        return of(PokemonActions.GetPage({ search: queryParams["q"], limit: 10, offset: 0 }))
      })
    )
  );

  page$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.GetPage),
      exhaustMap(({ search, limit, offset }) => {
        if (search.length === 0) {
          return of(PokemonActions.LoadPageSuccess({ pokemon: [] }));
        }
        return this.pageService.fetch({ search, limit, offset }).pipe(
          map(
            ({ data }) =>
              PokemonActions.LoadPageSuccess({
                pokemon: mapEntity(data),
              }),
            catchError((error) =>
              of(PokemonActions.LoadSuggestionsFailure({ error: `${error}` }))
            )
          )
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly suggestionsService: SuggestionGQL,
    private readonly pageService: PageGQL
  ) { }
}

const mapEntity = ({ getFuzzyPokemon }: PageQuery): PokemonEntity[] =>
  getFuzzyPokemon.map(
    ({
      species,
      sprite,
      height,
      baseStats,
    }) => ({ species, sprite, height, ...baseStats })
  );
