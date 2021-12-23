import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPokemon from './+state/pokemon/pokemon.reducer';
import { PokemonEffects } from './+state/pokemon/pokemon.effects';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromPokemon.POKEMON_FEATURE_KEY,
      fromPokemon.reducer
    ),
    EffectsModule.forFeature([PokemonEffects]),
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    SuggestionsComponent,
    ResultsComponent
  ],
  exports: [
    SuggestionsComponent,
    ResultsComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ]
})
export class PokemonModule { }
