import { Component } from '@angular/core';
import { Pagina1 } from './pagina1/pagina1';
import { Pagina2 } from './pagina2/pagina2';
import { Pagina3 } from './pagina3/pagina3';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { SearchService } from './search.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [Pagina1, Pagina2, Pagina3, RouterOutlet, RouterLink, RouterLinkActive],
	templateUrl: './app.html',
	styleUrls: ['./app.css']
})
export class App {
  constructor(private search: SearchService) {}

  onSearch(term: string) {
    this.search.setTerm((term || '').trim());
  }
}