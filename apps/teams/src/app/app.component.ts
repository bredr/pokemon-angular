import { Component } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'pokemon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private router: Router) { }
  title = 'teams';

  toFavourites() {
    this.router.navigate(["/team"])
  }
}
