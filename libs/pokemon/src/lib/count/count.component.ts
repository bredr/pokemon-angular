import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store"
import { State } from "../+state/pokemon/pokemon.reducer"
import * as selectors from "../+state/pokemon/pokemon.selectors";
import { map } from 'rxjs/operators';

@Component({
  selector: 'pokemon-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent {
  @Output() clicked = new EventEmitter<void>();

  count$: Observable<number>;

  constructor(private store: Store<State>) {
    this.count$ = store.select(selectors.getFavourites).pipe(map(x => x.length))
  }

  click() {
    this.clicked.emit();
  }

}
