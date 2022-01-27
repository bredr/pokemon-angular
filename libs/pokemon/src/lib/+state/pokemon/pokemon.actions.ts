import { createAction, props } from '@ngrx/store';
import { PokemonEntity } from './pokemon.models';

export const init = createAction('[Pokemon Page] Init');

export const GetSuggestions = createAction('[Pokemon/API] Get suggestions', props<{ search: string }>());
export const LoadSuggestionsSuccess = createAction('[Pokemon/API] Load suggestions success', props<{ pokemon: string[] }>());
export const LoadSuggestionsFailure = createAction('[Pokemon/API] Load suggestions failure', props<{ error: string }>());

export const GetPage = createAction('[Pokemon/API] Get page', props<{ search: string, limit: number, offset: number }>());

export const LoadPageSuccess = createAction('[Pokemon/API] Load page success', props<{ pokemon: PokemonEntity[] }>());
export const LoadPageFailure = createAction('[Pokemon/API] Load page failure', props<{ error: string }>());

export const AddFavourite = createAction('[Pokemon/Favourites] Add', props<{ pokemon: PokemonEntity }>());
export const RemoveFavourite = createAction('[Pokemon/Favourites] Remove', props<{ species: string }>());