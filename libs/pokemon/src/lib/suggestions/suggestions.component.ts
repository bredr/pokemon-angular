import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store"
import { State } from "../+state/pokemon/pokemon.reducer"
import * as actions from "../+state/pokemon/pokemon.actions";
import * as selectors from "../+state/pokemon/pokemon.selectors";
import { debounceTime } from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'pokemon-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions$: Observable<string[]>;
  lastValue = "";

  constructor(private store: Store<State>) {
    this.filteredOptions$ = store.select(selectors.getSuggestions)
  }

  ngOnInit() {
    this.myControl.valueChanges.pipe(debounceTime(500)).subscribe((x) => {
      if (this.lastValue !== x) {
        this.updateSuggestions(x);
        this.lastValue = x;
      }
    })
  }

  updateSuggestions(search: string) {
    this.store.dispatch(actions.GetSuggestions({ search }));
  }

  getResults() {
    this.store.dispatch(actions.GetPage({ search: this.lastValue, limit: 10, offset: 0 }));
  }

}
