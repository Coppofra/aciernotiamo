import { Routes } from '@angular/router';
//importiamo i componenti
import { Pagina1 } from './pagina1/pagina1';
import { Pagina2 } from './pagina2/pagina2';
import { Pagina3 } from './pagina3/pagina3';
import { DettaglioStudente } from './dettaglio-studente/dettaglio-studente';

export const routes: Routes = [
  { path: '', redirectTo: 'pagina1', pathMatch: 'full' },
  { path: 'pagina1', component: Pagina1 },
  { path: 'pagina2', component: Pagina2 },
  // parametro prima della rotta generica
  { path: 'pagina3/:id', component: DettaglioStudente },
  { path: 'pagina3', component: Pagina3 },
];